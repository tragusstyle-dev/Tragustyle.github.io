document.addEventListener('DOMContentLoaded', () => {
  fetch('products.json')
    .then(res => res.json())
    .then(products => {
      const carousel = document.getElementById('product-carousel');
      products.forEach(product => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
          <img src="images/${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.price} ₪</p>
          <a href="${product.paypalLink}" class="btn paypal-btn" target="_blank">PayPal</a>
          <a href="${product.stripeLink}" class="btn stripe-btn" target="_blank">Stripe</a>
        `;
        carousel.appendChild(item);
      });
    })
    .catch(err => console.error('שגיאה בטעינת מוצרים:', err));
});