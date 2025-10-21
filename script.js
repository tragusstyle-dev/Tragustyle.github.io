// גלילה חלקה בין חלקים בתפריט
document.addEventListener('click', (e)=>{
  const a = e.target.closest('a.nav-link');
  if(!a) return;
  const id = a.getAttribute('href');
  if(id && id.startsWith('#')){
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
  }
});

// טעינת מוצרים דינמית
document.addEventListener('DOMContentLoaded', () => {
  fetch('products.json')
    .then(res => res.json())
    .then(products => {
      const carousel = document.getElementById('product-carousel');
      products.forEach(p => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
          <img src="images/${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>${p.price} ₪</p>
          <a href="${p.paypalLink}" class="btn paypal-btn" target="_blank" rel="noopener">PayPal</a>
          <a href="${p.stripeLink}" class="btn stripe-btn" target="_blank" rel="noopener">Stripe</a>
        `;
        carousel.appendChild(item);
      });
    })
    .catch(err => {
      console.error('שגיאה בטעינת מוצרים:', err);
      const msg = document.createElement('div');
      msg.style.color = '#b00020';
      msg.style.textAlign = 'center';
      msg.style.padding = '8px';
      msg.textContent = 'לא ניתן לטעון מוצרים כרגע (בדקו products.json ונתיבי תמונות).';
      document.querySelector('#catalog .container').appendChild(msg);
    });
});
