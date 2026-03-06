// Utility functions to encode/decode cart data for URL sharing

export const encodeCartData = (cartItems, cartTotal) => {
  const cartData = {
    items: cartItems.map(item => ({
      id: item.id,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      thumbnail: item.thumbnail
    })),
    total: cartTotal,
    timestamp: new Date().toISOString()
  };
  
  // Convert to Base64 to make URL safe
  return btoa(JSON.stringify(cartData));
};

export const decodeCartData = (encodedData) => {
  try {
    return JSON.parse(atob(encodedData));
  } catch (error) {
    console.error('Error decoding cart data:', error);
    return null;
  }
};

export const generateShareableLink = (baseUrl, encodedCartData,name,email) => {
  return `${window.location.origin}${baseUrl}#/order-summary?data=${encodedCartData}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
};

export const formatCartForWhatsapp = (cartItems, cartTotal, shareableLink,formData) => {
  let itemsList = cartItems.map(item => 
    `• ${item.description}\n  Qty: ${item.quantity} × ₹${item.price} = ₹${(item.quantity * item.price).toFixed(2)}`
  ).join('\n\n');
  
  return `Name : ${formData.name}\n Email : ${formData.email}\n*🛒 Order Summary*\n\n${itemsList}\n\n━━━━━━━━━━━━━━\n*Total: ₹${cartTotal.toFixed(2)}*\n\n📋 View Full Order:\n${shareableLink}`;
};
