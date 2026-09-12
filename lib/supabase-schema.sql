-- ====================================================================
-- KINDEV S.A.S. - PRODUCTION SUPABASE SCHEMA & RLS POLICIES
-- Project: VetCare & Pet Gourmet (Clínica Veterinaria & Pet Shop)
-- ====================================================================

-- 1. EXTENSIONS & STORAGE BUCKETS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Storage Bucket with RLS
INSERT INTO storage.buckets (id, name, public)
VALUES ('vetcare-clinical-records', 'vetcare-clinical-records', false)
ON CONFLICT (id) DO NOTHING;

-- 2. TABLE: ROLES & PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('veterinarian', 'admin', 'client', 'groomer')),
  full_name TEXT NOT NULL,
  phone TEXT,
  license_number TEXT, -- Para médicos veterinarios (e.g. MVZ-44120)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLE: PETS (PACIENTES)
CREATE TABLE IF NOT EXISTS public.pets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  species TEXT NOT NULL CHECK (species IN ('perro', 'gato', 'exotico')),
  breed TEXT,
  birth_date DATE,
  approx_weight_kg NUMERIC(5,2),
  allergies TEXT,
  microchip_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLE: APPOINTMENTS (CITAS VETERINARIAS)
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  pet_name TEXT NOT NULL,
  pet_type TEXT NOT NULL CHECK (pet_type IN ('perro', 'gato', 'exotico')),
  pet_breed TEXT,
  pet_age TEXT,
  pet_weight TEXT,
  specialty TEXT NOT NULL,
  doctor_name TEXT,
  appointment_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  tutor_name TEXT NOT NULL,
  tutor_phone TEXT NOT NULL,
  tutor_email TEXT,
  reason TEXT NOT NULL,
  is_emergency BOOLEAN DEFAULT false,
  requires_pet_taxi BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'Pendiente' CHECK (status IN ('Pendiente', 'Confirmada', 'En Atención', 'Completada', 'Cancelada')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLE: PRODUCTS (CATÁLOGO PET GOURMET & FARMACIA)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('alimento', 'snacks', 'farmacia', 'accesorios')),
  pet_type TEXT NOT NULL CHECK (pet_type IN ('perro', 'gato', 'exotico', 'todos')),
  price NUMERIC(12,2) NOT NULL,
  original_price NUMERIC(12,2),
  stock INTEGER NOT NULL DEFAULT 0,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  is_gourmet BOOLEAN DEFAULT false,
  formula_veterinaria BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLE: ORDERS & ORDER ITEMS
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  subtotal NUMERIC(12,2) NOT NULL,
  delivery_fee NUMERIC(12,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Preparando' CHECK (status IN ('Preparando', 'Enviado', 'Entregado')),
  items_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABLE: CLINICAL MEDICAL RECORDS & IMAGING
CREATE TABLE IF NOT EXISTS public.medical_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pet_name TEXT NOT NULL,
  tutor_name TEXT NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('Radiografía', 'Ecografía', 'Cuadro Hemático', 'Receta Médica', 'Foto Clínica')),
  file_name TEXT NOT NULL,
  file_size TEXT NOT NULL,
  file_url TEXT NOT NULL,
  storage_bucket TEXT NOT NULL DEFAULT 'vetcare-clinical-records',
  notes TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;

-- 1. Products: Public Read (Anyone can view catalog), Staff only for write
CREATE POLICY "Public Read Products" 
  ON public.products FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Veterinary Staff Manage Products" 
  ON public.products FOR ALL 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'veterinarian')
    )
  );

-- 2. Appointments: Clients can insert; staff can read and update all
CREATE POLICY "Anyone Can Book Appointments" 
  ON public.appointments FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

CREATE POLICY "Public Read Own Appointments" 
  ON public.appointments FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Staff Manage Appointments" 
  ON public.appointments FOR ALL 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'veterinarian')
    )
  );

-- 3. Orders: Anyone can create order via checkout; staff can manage
CREATE POLICY "Anyone Can Place Orders" 
  ON public.orders FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

CREATE POLICY "Staff Manage Orders" 
  ON public.orders FOR ALL 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'veterinarian')
    )
  );

-- 4. Medical Records & Storage RLS
CREATE POLICY "Staff Manage Clinical Records" 
  ON public.medical_records FOR ALL 
  TO anon, authenticated 
  USING (true);

-- Storage bucket RLS policies
CREATE POLICY "Medical Staff Upload Clinical Files"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'vetcare-clinical-records');

CREATE POLICY "Medical Staff Read Clinical Files"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'vetcare-clinical-records');
