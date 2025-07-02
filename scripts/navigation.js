// Get the button and nav list
const menuButton = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

// Toggle menu visibility and icon
menuButton.addEventListener('click', () => {
  navLinks.classList.toggle('open');

  // Toggle icon and accessibility label
  if (navLinks.classList.contains('open')) {
    menuButton.innerHTML = '&#10006;'; // ✖ close
    menuButton.setAttribute('aria-label', 'Close Navigation');
  } else {
    menuButton.innerHTML = '&#9776;'; // ☰ hamburger
    menuButton.setAttribute('aria-label', 'Open Navigation');
  }
});
