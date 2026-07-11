import React, { useState } from "react";
import { CartItem, CheckoutForm } from "../types";
import { formatIDR, generateWhatsAppLink } from "../utils";
import { X, Trash2, ArrowLeft, Send, ShoppingBag, Settings, HelpCircle, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [formData, setFormData] = useState<CheckoutForm>({
    name: "",
    address: "",
    school: "",
    class: "",
  });
  
  // Custom target WhatsApp number setup
  const [waNumber, setWaNumber] = useState<string>("+6289689822111");
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.priceAtSelection * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNextStep = () => {
    if (cartItems.length === 0) return;
    setStep("checkout");
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = "Nama wajib diisi";
    if (!formData.address.trim()) errors.address = "Alamat wajib diisi";
    if (!formData.school.trim()) errors.school = "Nama Sekolah wajib diisi";
    if (!formData.class.trim()) errors.class = "Kelas wajib diisi";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate WhatsApp checkout link and open it in a new window/tab
    const waLink = generateWhatsAppLink(cartItems, formData, waNumber);
    window.open(waLink, "_blank");

    // Optional: Clear cart after redirection
    // onClearCart();
    // setStep("cart");
    // onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
        />

        {/* Sliding Panel */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white flex flex-col shadow-2xl border-l border-gray-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                {step === "checkout" && (
                  <button
                    onClick={() => setStep("cart")}
                    className="p-2 rounded-none hover:bg-slate-200 text-slate-500 hover:text-black border border-slate-200 bg-white transition-colors mr-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <h2 className="text-sm font-display font-extrabold text-slate-900 uppercase tracking-wider">
                  {step === "cart" ? "Koleksi Keranjang" : "Formulir Pemesan"}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-none hover:bg-slate-200 text-slate-500 hover:text-black border border-slate-200 bg-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {step === "cart" ? (
                /* STEP 1: CART LIST */
                cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-none flex items-center justify-center text-slate-500 mb-4">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Keranjang Kosong</h3>
                    <p className="text-[11px] text-slate-400 mt-2 max-w-xs leading-relaxed">
                      Telusuri katalog produk kami dan tambahkan pakaian sekolah favorit Anda ke daftar belanja sekarang!
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 px-5 py-3 bg-slate-900 text-white rounded-none text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors"
                    >
                      Mulai Belanja
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 border border-slate-200 rounded-none bg-white transition-colors hover:border-blue-600"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-20 rounded-none overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-tight line-clamp-1">
                              {item.product.name}
                            </h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.selectedVariant && (
                                <span className="text-[9px] bg-slate-100 text-slate-800 border border-slate-200 px-2 py-0.5 rounded-none font-extrabold uppercase tracking-widest inline-block">
                                  Varian: {item.selectedVariant}
                                </span>
                              )}
                              <span className="text-[9px] bg-slate-100 text-slate-800 border border-slate-200 px-2 py-0.5 rounded-none font-extrabold uppercase tracking-widest inline-block">
                                Ukuran: {item.selectedSize}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-bold text-slate-800 font-mono">
                              {formatIDR(item.priceAtSelection)}
                            </span>

                            {/* Quantity Controls */}
                            <div className="flex items-center border border-slate-900 rounded-none bg-white overflow-hidden">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="px-2 py-0.5 hover:bg-slate-100 text-slate-800 font-bold text-xs"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-bold text-slate-900 bg-slate-50 border-x border-slate-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="px-2 py-0.5 hover:bg-slate-100 text-slate-800 font-bold text-xs"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-600 p-1 self-start transition-colors"
                          aria-label="Hapus item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    <div className="pt-4">
                      <button
                        onClick={onClearCart}
                        className="text-[10px] font-bold uppercase tracking-wider text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Kosongkan Keranjang Belanja
                      </button>
                    </div>
                  </div>
                )
              ) : (
                /* STEP 2: CHECKOUT FORM */
                <form id="checkout-form" onSubmit={handleSubmitCheckout} className="space-y-4">
                  {/* Info Box */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-none flex gap-3 items-start">
                    <GraduationCap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Verifikasi Pesanan</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                        Isi data identitas sekolah dan alamat lengkap untuk pengiriman katalog fashion sekolah otomatis.
                      </p>
                    </div>
                  </div>

                  {/* Input Nama */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Budi Santoso"
                      className={`w-full px-3 py-2 bg-white border text-sm outline-none focus:border-blue-600 rounded-none transition-colors ${
                        formErrors.name ? "border-red-500" : "border-slate-200"
                      }`}
                    />
                    {formErrors.name && (
                      <span className="text-xs text-red-500 mt-0.5 font-semibold">{formErrors.name}</span>
                    )}
                  </div>

                  {/* Input Alamat */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Alamat Pengiriman Lengkap
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Jl. Merdeka No. 45"
                      className={`w-full px-3 py-2 bg-white border text-sm outline-none focus:border-blue-600 rounded-none transition-colors ${
                        formErrors.address ? "border-red-500" : "border-slate-200"
                      }`}
                    />
                    {formErrors.address && (
                      <span className="text-xs text-red-500 mt-0.5 font-semibold">{formErrors.address}</span>
                    )}
                  </div>

                  {/* Input Sekolah */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Sekolah / Universitas
                    </label>
                    <input
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      placeholder="SMA Negeri 1"
                      className={`w-full px-3 py-2 bg-white border text-sm outline-none focus:border-blue-600 rounded-none transition-colors ${
                        formErrors.school ? "border-red-500" : "border-slate-200"
                      }`}
                    />
                    {formErrors.school && (
                      <span className="text-xs text-red-500 mt-0.5 font-semibold">{formErrors.school}</span>
                    )}
                  </div>

                  {/* Input Kelas */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Kelas / Angkatan
                    </label>
                    <input
                      type="text"
                      name="class"
                      value={formData.class}
                      onChange={handleInputChange}
                      placeholder="XII MIPA 2"
                      className={`w-full px-3 py-2 bg-white border text-sm outline-none focus:border-blue-600 rounded-none transition-colors ${
                        formErrors.class ? "border-red-500" : "border-slate-200"
                      }`}
                    />
                    {formErrors.class && (
                      <span className="text-xs text-red-500 mt-0.5 font-semibold">{formErrors.class}</span>
                    )}
                  </div>

                  {/* Collapsible WhatsApp Config for ultimate flexibility */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowSettings(!showSettings)}
                      className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 hover:text-slate-800 flex items-center gap-1 transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      {showSettings ? "Sembunyikan Pengaturan WA" : "Atur Nomor WhatsApp Admin"}
                    </button>
                    {showSettings && (
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-none mt-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">
                            Nomor WhatsApp Admin Toko
                          </label>
                          <span className="text-[8px] bg-slate-200 text-slate-600 px-1.5 py-0.5 font-bold uppercase tracking-wider">Read Only</span>
                        </div>
                        <input
                          type="text"
                          value={waNumber}
                          readOnly
                          placeholder="+6289689822111"
                          className="w-full px-3 py-1.5 rounded-none border border-slate-200 text-xs bg-slate-100 text-slate-500 cursor-not-allowed outline-none font-mono"
                        />
                        <span className="text-[9px] text-slate-400 leading-normal block">
                          Nomor WhatsApp admin sudah dikonfigurasi secara permanen untuk menerima pesanan Anda.
                        </span>
                      </div>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Footer Summary & Action */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Total Belanja</span>
                  <span className="text-lg font-black text-slate-900 font-mono">{formatIDR(total)}</span>
                </div>

                {step === "cart" ? (
                  <button
                    onClick={handleNextStep}
                    className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-xs rounded-none flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm"
                  >
                    <span>Lanjut ke Checkout</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="checkout-form"
                    className="w-full py-4 bg-[#25D366] hover:brightness-95 text-white font-bold uppercase tracking-widest text-xs rounded-none flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Order ke WhatsApp</span>
                  </button>
                )}

                <div className="text-center">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
                    <HelpCircle className="w-3 h-3 text-slate-300" />
                    Pembayaran akan dipandu admin via chat WhatsApp
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
