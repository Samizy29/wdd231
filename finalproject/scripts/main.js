export const renderProducts = (products) => {
  const container = document.querySelector('.product-grid');
  
  if (!container) return;
  
  container.innerHTML = products.map(product => `
    <div class="product-card" onclick="showModal(${JSON.stringify(product).replace(/"/g, "'")})">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <small>${product.category}</small>
    </div>
  `).join('');
};