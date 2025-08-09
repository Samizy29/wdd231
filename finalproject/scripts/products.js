import { renderProducts } from './main.js';

const showModal = (product) => {
  document.getElementById('modal-title').textContent = product.name;
  document.getElementById('modal-price').textContent = `$${product.price}`;
  document.getElementById('modal-image').src = product.image;
  document.getElementById('modal-image').alt = product.name;
  document.getElementById('modal-description').textContent = product.description;
  document.getElementById('product-modal').classList.add('active');
  
  document.getElementById('add-favorite').onclick = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(product.id)) {
      favorites.push(product.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Added to favorites!');
    }
  };
};

document.querySelector('.close').onclick = () => {
  document.getElementById('product-modal').classList.remove('active');
};

window.showModal = showModal;

try {
  const response = await fetch('data/products.json');
  const products = await response.json();
  renderProducts(products);
} catch (error) {
  console.error('Error loading products:', error);
  document.querySelector('.product-grid').innerHTML = 
    '<p>Error loading products. Please try again later.</p>';
}