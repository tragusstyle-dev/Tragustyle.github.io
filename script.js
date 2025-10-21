// טוען הגדרות כלליות (שם חנות, טקסטים, אימייל)
const applyGeneral = async () => {
  try{
    const g = await (await fetch('general.json')).json();
    document.querySelectorAll('#brandName, #brandNameFooter').forEach(el => el.textContent = g.brand || 'TraguStyle');
    const title = document.getElementById('heroTitle'); if(title) title.textContent = g.heroTitle || 'TraguStyle';
    const sub = document.getElementById('heroSub'); if(sub) sub.textContent = g.heroSubtitle || 'סטייל קליל • משלוח מהיר • תשלום מאובטח';
    const mail = document.getElementById('contactEmail'); if(mail){ mail.href = 'mailto:'+ (g.contactEmail || 'hello@tragustyle.com'); mail.textContent = (g.contactEmail || 'hello@tragustyle.com'); }
    const about = document.getElementById('aboutText'); if(about) about.textContent = g.aboutText || about.textContent;
  }catch(e){ console.warn('general.json not loaded', e); }
};

// גלריה מה-JSON + מודל תשלום בפנים
const buildGallery = async () => {
  const el = document.getElementById('gallery'); if(!el) return;
  try{
    const products = await (await fetch('products.json')).json();
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<img src="images/${p.image}" alt="${p.name}"/>`;
      card.addEventListener('click', () => openModal(p));
      el.appendChild(card);
    });
  }catch(e){
    el.textContent = 'לא ניתן לטעון גלריה (בדוק products.json ותמונות).';
  }
};

const openModal = (p) => {
  const modal = document.getElementById('productModal');
  modal.setAttribute('aria-hidden','false');
  document.getElementById('mImage').src = `images/${p.image}`;
  document.getElementById('mImage').alt = p.name;
  document.getElementById('mName').textContent = p.name || '';
  document.getElementById('mPrice').textContent = p.price ? (p.price + ' ₪') : '';
  document.getElementById('mDesc').textContent = p.description || '';
  const pp = document.getElementById('mPaypal'); const st = document.getElementById('mStripe');
  pp.style.display = p.paypalLink ? 'inline-block' : 'none';
  st.style.display = p.stripeLink ? 'inline-block' : 'none';
  if(p.paypalLink) pp.href = p.paypalLink;
  if(p.stripeLink) st.href = p.stripeLink;
};

const closeModal = () => document.getElementById('productModal').setAttribute('aria-hidden','true');

document.addEventListener('click', (e)=>{
  if(e.target.matches('[data-close]')) closeModal();
});

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeModal();
});

document.addEventListener('DOMContentLoaded', async ()=>{
  await applyGeneral();
  await buildGallery();
});
