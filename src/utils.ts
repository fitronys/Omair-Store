import { Product, CartItem, CheckoutForm } from "./types";

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getProductPrice(product: Product, size: string, variant?: string): number {
  if (!product.optionPrices) return product.price;
  const key = variant ? `${size}-${variant}` : size;
  return product.optionPrices[key] ?? product.optionPrices[size] ?? product.price;
}

export function generateWhatsAppLink(
  cartItems: CartItem[],
  buyerInfo: CheckoutForm,
  waNumber: string
): string {
  // Clean phone number (remove +, spaces, dashes, etc.)
  const cleanNumber = waNumber.replace(/[^0-9]/g, "");

  const total = cartItems.reduce((acc, item) => acc + item.priceAtSelection * item.quantity, 0);

  let message = `*Halo Admin Omair Store!* 🛍️\n`;
  message += `Saya ingin memesan produk fashion dengan detail sebagai berikut:\n\n`;
  message += `*--- DAFTAR PESANAN ---*\n`;

  cartItems.forEach((item, index) => {
    message += `${index + 1}. *${item.product.name}*\n`;
    if (item.selectedVariant) {
      message += `   - Varian: _${item.selectedVariant}_\n`;
    }
    message += `   - Ukuran: _${item.selectedSize}_\n`;
    message += `   - Jumlah: ${item.quantity}x\n`;
    message += `   - Subtotal: ${formatIDR(item.priceAtSelection * item.quantity)}\n\n`;
  });

  message += `*----------------------------------*\n`;
  message += `*TOTAL HARUS DIBAYAR:* *${formatIDR(total)}*\n\n`;

  message += `*--- DATA PEMBELI ---*\n`;
  message += `👤 *Nama:* ${buyerInfo.name}\n`;
  message += `📍 *Alamat:* ${buyerInfo.address}\n`;
  message += `🏫 *Sekolah:* ${buyerInfo.school}\n`;
  message += `📚 *Kelas:* ${buyerInfo.class}\n\n`;

  message += `Mohon segera diproses pesanan saya ya Admin. Terima kasih banyak! 🙏✨`;

  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}
