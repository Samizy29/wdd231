// Get references to the menu button and navigation list
const menuButton = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

// Toggle navigation menu open/close on click
menuButton.addEventListener('click', () => {
  navLinks.classList.toggle('open');

  // Change icon and aria label based on state
  if (navLinks.classList.contains('open')) {
    menuButton.innerHTML = '&#10006;'; // ✖ close icon
    menuButton.setAttribute('aria-label', 'Close Navigation');
  } else {
    menuButton.innerHTML = '&#9776;'; // ☰ hamburger icon
    menuButton.setAttribute('aria-label', 'Open Navigation');
  }
});
