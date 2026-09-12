import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Appointment, Order, MedicalRecordFile, PetProduct, AppointmentStatus, OrderStatus } from './types';
import { INITIAL_APPOINTMENTS, INITIAL_ORDERS, INITIAL_MEDICAL_FILES, PET_PRODUCTS } from './mockData';

const STORAGE_KEYS = {
  APPOINTMENTS: 'vetcare_appointments_v1',
  ORDERS: 'vetcare_orders_v1',
  MEDICAL_FILES: 'vetcare_medical_files_v1',
  PRODUCTS: 'vetcare_products_v1',
  CONFIG: 'vetcare_supabase_config_v1',
};

// Default Supabase config or env variables
const defaultUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const defaultKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient;

  let url = defaultUrl;
  let key = defaultKey;

  if (typeof window !== 'undefined') {
    try {
      const storedConfig = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (storedConfig) {
        const parsed = JSON.parse(storedConfig);
        if (parsed.url && parsed.anonKey) {
          url = parsed.url;
          key = parsed.anonKey;
        }
      }
    } catch {
      // ignore
    }
  }

  if (url && key && url.startsWith('http')) {
    try {
      cachedClient = createClient(url, key);
      return cachedClient;
    } catch (err) {
      console.warn('Could not initialize Supabase client:', err);
    }
  }
  return null;
}

export function resetSupabaseClient(url: string, anonKey: string) {
  if (url && anonKey) {
    try {
      cachedClient = createClient(url, anonKey);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify({ url, anonKey, isConnected: true }));
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  } else {
    cachedClient = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.CONFIG);
    }
    return true;
  }
}

// Local Storage Initializers & Helpers
export function getStoredAppointments(): Appointment[] {
  if (typeof window === 'undefined') return INITIAL_APPOINTMENTS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_APPOINTMENTS;
  }
}

export function saveAppointment(appointment: Omit<Appointment, 'id' | 'code' | 'createdAt' | 'status'> & { isEmergency?: boolean }): Appointment {
  const all = getStoredAppointments();
  const code = `VC-${Math.floor(1000 + Math.random() * 9000)}`;
  const newApt: Appointment = {
    ...appointment,
    id: `apt-${Date.now()}`,
    code,
    status: 'Pendiente',
    isEmergency: appointment.isEmergency || false,
    createdAt: new Date().toLocaleString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  const updated = [newApt, ...all];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
  }

  // Attempt live Supabase sync if client is active
  const supabase = getSupabaseClient();
  if (supabase) {
    supabase
      .from('appointments')
      .insert([
        {
          code: newApt.code,
          pet_name: newApt.petName,
          pet_type: newApt.petType,
          pet_breed: newApt.petBreed,
          pet_age: newApt.petAge,
          pet_weight: newApt.petWeight,
          specialty: newApt.specialty,
          doctor_name: newApt.doctorName,
          appointment_date: newApt.date,
          time_slot: newApt.timeSlot,
          tutor_name: newApt.tutorName,
          tutor_phone: newApt.tutorPhone,
          tutor_email: newApt.tutorEmail,
          reason: newApt.reason,
          is_emergency: newApt.isEmergency,
          requires_pet_taxi: newApt.requiresPetTaxi,
          status: newApt.status,
        },
      ])
      .then((res) => {
        if (res.error) console.warn('Supabase sync notice:', res.error.message);
      });
  }

  return newApt;
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus): Appointment[] {
  const all = getStoredAppointments();
  const updated = all.map((apt) => (apt.id === id ? { ...apt, status } : apt));
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
  }
  return updated;
}

// Orders Management
export function getStoredOrders(): Order[] {
  if (typeof window === 'undefined') return INITIAL_ORDERS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveOrder(orderData: Omit<Order, 'id' | 'code' | 'createdAt' | 'status'>): Order {
  const all = getStoredOrders();
  const code = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
  const newOrder: Order = {
    ...orderData,
    id: `ord-${Date.now()}`,
    code,
    status: 'Preparando',
    createdAt: new Date().toLocaleString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  const updated = [newOrder, ...all];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  }

  // Live Supabase sync
  const supabase = getSupabaseClient();
  if (supabase) {
    supabase
      .from('orders')
      .insert([
        {
          code: newOrder.code,
          customer_name: newOrder.customerName,
          customer_phone: newOrder.customerPhone,
          customer_address: newOrder.customerAddress,
          subtotal: newOrder.subtotal,
          delivery_fee: newOrder.deliveryFee,
          total: newOrder.total,
          payment_method: newOrder.paymentMethod,
          status: newOrder.status,
          items_json: newOrder.items,
        },
      ])
      .then((res) => {
        if (res.error) console.warn('Supabase sync notice:', res.error.message);
      });
  }

  return newOrder;
}

export function updateOrderStatus(id: string, status: OrderStatus): Order[] {
  const all = getStoredOrders();
  const updated = all.map((o) => (o.id === id ? { ...o, status } : o));
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  }
  return updated;
}

// Medical Records & Supabase Storage simulation/live
export function getStoredMedicalFiles(): MedicalRecordFile[] {
  if (typeof window === 'undefined') return INITIAL_MEDICAL_FILES;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MEDICAL_FILES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.MEDICAL_FILES, JSON.stringify(INITIAL_MEDICAL_FILES));
      return INITIAL_MEDICAL_FILES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_MEDICAL_FILES;
  }
}

export async function uploadMedicalRecordFile(
  file: File,
  petName: string,
  tutorName: string,
  documentType: MedicalRecordFile['documentType'],
  notes: string
): Promise<MedicalRecordFile> {
  const bucketName = 'vetcare-clinical-records';
  let publicUrl = '';

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const filePath = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      const uploadRes = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (!uploadRes.error) {
        const { data: publicData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
        publicUrl = publicData.publicUrl;
      }
    } catch (e) {
      console.warn('Storage upload error, using local object url:', e);
    }
  }

  if (!publicUrl) {
    publicUrl = URL.createObjectURL(file);
  }

  const record: MedicalRecordFile = {
    id: `file-${Date.now()}`,
    petName,
    tutorName,
    documentType,
    fileName: file.name,
    fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    fileUrl: publicUrl,
    bucket: bucketName,
    rlsPolicy: 'auth.uid() = medical_staff_or_owner',
    notes,
    uploadedAt: new Date().toLocaleString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  const all = getStoredMedicalFiles();
  const updated = [record, ...all];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.MEDICAL_FILES, JSON.stringify(updated));
  }

  return record;
}

// Products
export function getStoredProducts(): PetProduct[] {
  if (typeof window === 'undefined') return PET_PRODUCTS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(PET_PRODUCTS));
      return PET_PRODUCTS;
    }
    return JSON.parse(data);
  } catch {
    return PET_PRODUCTS;
  }
}
