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
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '@/lib/types';
import { formatCOP, buildWhatsAppUrl, VETCARE_PHONE } from '@/lib/utils';
import { saveOrder } from '@/lib/supabaseClient';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 150000;

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
  const deliveryFee = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 12000;
  const total = subtotal + deliveryFee;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let itemsList = items
      .map((it) => `• ${it.quantity}x ${it.product.name} (${formatCOP(it.product.price * it.quantity)})`)
      .join('\n');

    const message = `Hola VetCare & Pet Gourmet! 🐾 Deseo realizar el siguiente pedido:

${itemsList}

💰 Subtotal: ${formatCOP(subtotal)}
🚚 Domicilio: ${deliveryFee === 0 ? '¡GRATIS!' : formatCOP(deliveryFee)}
💵 TOTAL: ${formatCOP(total)}

👤 Cliente: ${customerName || 'No especificado'}
📱 Teléfono: ${customerPhone || 'Por este chat'}
📍 Dirección: ${customerAddress || 'Por confirmar con asesor'}`;

    // Also persist in database
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

  const handleDirectOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Por favor completa nombre, teléfono y dirección para la entrega.');
      return;
    }

    setIsSubmitting(true);
    const newOrder = saveOrder({
      customerName,
      customerPhone,
      customerAddress,
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: 'Transferencia Bancaria',
    });

    setIsSubmitting(false);
    setIsCompleted(newOrder.code);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-950 border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">Carrito Pet Gourmet</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                {items.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </div>
            <button
              type="button"
              id="cart-drawer-close"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Screen after direct checkout */}
          {isCompleted ? (
            <div className="p-8 text-center flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">¡Pedido Registrado con Éxito!</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
                Tu orden ha sido registrada en el sistema con el código:
              </p>
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-emerald-500/40 font-mono font-bold text-emerald-400 text-sm">
                {isCompleted}
              </div>
              <p className="text-[11px] text-slate-400">
                Nuestro equipo de farmacia veterinaria está preparando los productos. Te contactaremos vía WhatsApp para confirmar el despacho express.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsCompleted(null);
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all"
              >
                Cerrar y Continuar
              </button>
            </div>
          ) : (
            <>
              {/* Free Shipping Progress Meter */}
              <div className="px-5 py-3 bg-slate-900/60 border-b border-white/5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                    <Truck className="w-3.5 h-3.5 text-amber-400" />
                    {subtotal >= FREE_SHIPPING_THRESHOLD
                      ? '¡Felicidades! Tienes Domicilio Gratis'
                      : `Faltan ${formatCOP(FREE_SHIPPING_THRESHOLD - subtotal)} para Domicilio Gratis`}
                  </span>
                  <span className="text-[11px] text-amber-400 font-bold">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 text-slate-400 space-y-3">
                    <ShoppingBag className="w-12 h-12 mx-auto text-slate-600 stroke-[1.5]" />
                    <p className="text-sm">Tu carrito está vacío</p>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      Explora nuestras dietas clínicas medicadas, suplementos y snacks gourmet para tu mascota.
                    </p>
                  </div>
                ) : (
                  items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5"
                    >
                      {/* Product Image */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-semibold text-white truncate">{product.name}</h4>
                          <span className="text-[11px] text-slate-400">{product.brand}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs font-bold text-amber-400">
                            {formatCOP(product.price * quantity)}
                          </span>

                          <div className="flex items-center gap-1 bg-slate-950 rounded-lg border border-white/10 p-0.5">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, -1)}
                              className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs px-2 font-mono text-white">{quantity}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, 1)}
                              className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(product.id)}
                            className="text-slate-500 hover:text-rose-400 p-1"
                            title="Eliminar producto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* Delivery details if items exist */}
                {items.length > 0 && (
                  <form onSubmit={handleDirectOrder} className="pt-4 border-t border-white/10 space-y-3">
                    <span className="text-xs font-semibold text-slate-300 block">
                      Datos de Despacho &amp; Facturación:
                    </span>
                    <input
                      type="text"
                      placeholder="Nombre del Tutor o Receptor *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-amber-400/50"
                    />
                    <input
                      type="tel"
                      placeholder="Teléfono / WhatsApp *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-amber-400/50"
                    />
                    <input
                      type="text"
                      placeholder="Dirección completa y ciudad *"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-amber-400/50"
                    />
                  </form>
                )}
              </div>

              {/* Footer Summary & Checkout Actions */}
              {items.length > 0 && (
                <div className="p-5 border-t border-white/10 bg-slate-950/80 space-y-3">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal:</span>
                      <span className="text-white font-medium">{formatCOP(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Domicilio Express:</span>
                      <span className={deliveryFee === 0 ? 'text-emerald-400 font-semibold' : 'text-white'}>
                        {deliveryFee === 0 ? 'GRATIS' : formatCOP(deliveryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/5">
                      <span>Total a Pagar:</span>
                      <span className="text-amber-400 text-base">{formatCOP(total)}</span>
                    </div>
                  </div>

                  {/* Checkout Actions */}
                  <div className="space-y-2 pt-1">
                    {/* WhatsApp Checkout Direct Button */}
                    <button
                      type="button"
                      id="cart-checkout-whatsapp"
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Comprar por WhatsApp (Asesor Clínico)</span>
                    </button>

                    {/* Direct Register Order Button */}
                    <button
                      type="button"
                      id="cart-checkout-direct"
                      onClick={handleDirectOrder}
                      disabled={isSubmitting}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-white/15 flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
                    >
                      <span>{isSubmitting ? 'Procesando...' : 'Confirmar Pedido en Sistema'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Despachos garantizados con cadena de frío para biológicos</span>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
