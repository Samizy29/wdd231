const toggleMenu = () => {
  const menu = document.querySelector('.nav-menu');
  menu.classList.toggle('active');
};

document.querySelector('.nav-toggle')?.addEventListener('click', toggleMenu);

// Set active link based on current page
document.querySelectorAll('.nav-menu a').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});