
const sendWhatsAppOrders = () => {
  const mobileWidth = window.innerWidth;
  const data = localStorage.getItem("myCart")
  const dataParsed = JSON.parse(data) || [];
  const text = `Hola, quisiera una cotización de los siguientes productos:\n\n${dataParsed.map(order => `➡️ ${order.title} (${order.quantity} ${order.quantity === 1 ? 'unidad' : 'unidades'})\n`).join('')}`;
  const textEncode = encodeURI(text);
  const isMobile = mobileWidth < 768;
  const url = `https://api.whatsapp.com/send?phone=51940147037&text=${textEncode}`;
  window.open(url, isMobile ? '_self' : '_blank');
}

const sendWhatsAppOrder = (product) => {
  const mobileWidth = window.innerWidth;
  const text = `Hola, quisiera una cotización de los siguientes productos:\n\n➡️ ${product.title}`;
  const textEncode = encodeURI(text);
  const isMobile = mobileWidth < 768;
  const url = `https://api.whatsapp.com/send?phone=51940147037&text=${textEncode}`;
  window.open(url, isMobile ? '_self' : '_blank');
}


export {
  sendWhatsAppOrders,
  sendWhatsAppOrder
};