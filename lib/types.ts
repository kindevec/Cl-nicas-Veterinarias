export type PetType = 'perro' | 'gato' | 'exotico';

export type ProductCategory = 'todos' | 'alimento' | 'snacks' | 'farmacia' | 'accesorios';

export type ServiceCategory = 
  | 'Urgencias 24/7'
  | 'Consulta Médica Especializada'
  | 'Cirugía de Alta Complejidad'
  | 'Vacunación & Desparasitación'
  | 'Grooming & Spa Dermatológico'
  | 'Diagnóstico & UCI';

export interface VeterinaryService {
  id: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  priceEstimate: number;
  duration: string;
  badge?: string;
  doctorInCharge: string;
  doctorSpecialty: string;
  iconName: string;
  available247: boolean;
  image?: string;
}

export interface PetProduct {
  id: string;
  name: string;
  brand: string;
  category: 'alimento' | 'snacks' | 'farmacia' | 'accesorios';
  petType: 'perro' | 'gato' | 'exotico' | 'todos';
  price: number;
  originalPrice?: number;
  stock: number;
  image: string;
  badge?: string;
  description: string;
  isGourmet: boolean;
  formulaVeterinaria: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: PetProduct;
  quantity: number;
}

export type AppointmentStatus = 'Pendiente' | 'Confirmada' | 'En Atención' | 'Completada' | 'Cancelada';

export interface Appointment {
  id: string;
  code: string;
  petName: string;
  petType: PetType;
  petBreed?: string;
  petAge?: string;
  petWeight?: string;
  specialty: string;
  doctorName?: string;
  date: string;
  timeSlot: string;
  tutorName: string;
  tutorPhone: string;
  tutorEmail?: string;
  reason: string;
  isEmergency: boolean;
  requiresPetTaxi?: boolean;
  status: AppointmentStatus;
  createdAt: string;
}

export type OrderStatus = 'Preparando' | 'Enviado' | 'Entregado';

export interface Order {
  id: string;
  code: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'WhatsApp Checkout' | 'Tarjeta en Clínica' | 'Transferencia Bancaria';
  status: OrderStatus;
  createdAt: string;
}

export interface MedicalRecordFile {
  id: string;
  petName: string;
  tutorName: string;
  documentType: 'Radiografía' | 'Ecografía' | 'Cuadro Hemático' | 'Receta Médica' | 'Foto Clínica';
  fileName: string;
  fileSize: string;
  fileUrl: string;
  bucket: 'vetcare-clinical-records';
  rlsPolicy: 'auth.uid() = medical_staff_or_owner';
  notes: string;
  uploadedAt: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
}
