'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { WhatsAppOfficialIcon } from '@/components/WhatsAppOfficialIcon';
import confetti from 'canvas-confetti';
import { CartItem } from '@/lib/types';
import { formatUSD, buildWhatsAppUrl, VETCARE_PHONE } from '@/lib/utils';
import { saveOrder } from '@/lib/supabaseClient';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD_USD = 45;

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [isCompleted, setIsCompleted] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD_USD || items.length === 0;
  const deliveryFee = isFreeShipping ? 0 : 3.5;
  const total = subtotal + deliveryFee;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD_USD) * 100));

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let itemsList = items
      .map((it) => `• ${it.quantity}x ${it.product.name} (${formatUSD(it.product.price * it.quantity)})`)
      .join('\n');

    const message = `Hola Kindev / VetCare Gourmet! 🐾 Deseo realizar el siguiente pedido:

${itemsList}

💰 Subtotal: ${formatUSD(subtotal)}
🚚 Envíos / Domicilio: ${deliveryFee === 0 ? '¡GRATIS!' : formatUSD(deliveryFee)}
💵 TOTAL: ${formatUSD(total)}

👤 Cliente: ${customerName || 'No especificado'}
📱 WhatsApp: ${customerPhone || 'Por este chat'}
📍 Dirección en Quito / Ecuador: ${customerAddress || 'Por confirmar con asesor'}`;

    saveOrder({
      customerName: customerName || 'Cliente WhatsApp',
      customerPhone: customerPhone || 'Sin registrar',
      customerAddress: customerAddress || 'Entrega a convenir',
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: 'WhatsApp Checkout',
    });

    onClearCart();
    window.open(`https://wa.me/${VETCARE_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between h-[100dvh] max-h-[100dvh]">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1A6B38]" />
              <h3 className="text-base font-extrabold text-slate-900">Carrito de Compras</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#0D3D20] text-xs font-bold font-mono">
                {items.reduce((acc, it) => acc + it.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping Progress */}
          <div className="px-6 py-3 bg-emerald-50/60 border-b border-emerald-100 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <Truck className="w-3.5 h-3.5 text-emerald-700" />
                {isFreeShipping ? '¡Felicidades! Tienes Envío Gratis' : `Faltan ${formatUSD(FREE_SHIPPING_THRESHOLD_USD - subtotal)} para Envío Gratis`}
              </span>
              <span className="font-bold text-emerald-800">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-emerald-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#1A6B38] rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">Tu carrito está vacío</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Agrega alimentos de prescripción, farmacia o snacks naturales desde nuestra boutique.
                </p>
              </div>
            ) : (
              items.map((it) => (
                <div 
                  key={it.product.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3"
                >
                  <div className="relative w-14 h-14 rounded-xl bg-white p-1 shrink-0 overflow-hidden border border-slate-100">
                    <Image
                      src={it.product.image}
                      alt={it.product.name}
                      fill
                      className="object-contain p-1"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 truncate">{it.product.name}</h5>
                    <span className="text-[11px] text-slate-500 block">{it.product.brand}</span>
                    <span className="text-xs font-extrabold text-[#1A6B38] block mt-0.5">
                      {formatUSD(it.product.price * it.quantity)}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveItem(it.product.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(it.product.id, -1)}
                        className="w-5 h-5 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{it.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(it.product.id, 1)}
                        className="w-5 h-5 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Form */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-white space-y-4 pb-safe">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Tu Nombre Completo"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  placeholder="Dirección de Envío"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{formatUSD(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío a Domicilio:</span>
                  <span className="font-semibold text-emerald-700">
                    {deliveryFee === 0 ? 'Gratis' : formatUSD(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total a Pagar:</span>
                  <span className="text-[#1A6B38] font-sans">{formatUSD(total)}</span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                <WhatsAppOfficialIcon className="w-4 h-4 shrink-0" />
                <span>Finalizar Pedido vía WhatsApp</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
