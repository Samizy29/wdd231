document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkmode-switch');
    const darkModeStylesheet = document.getElementById('darkmode-style');
    const html = document.documentElement;
    
    // Check for saved preference or system preference
    const savedMode = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Initialize dark mode
    if (savedMode === 'dark' || (!savedMode && systemPrefersDark)) {
        enableDarkMode();
    }
    
    // Toggle functionality
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });
    
    function enableDarkMode() {
        html.setAttribute('data-theme', 'dark');
        darkModeStylesheet.removeAttribute('disabled');
        darkModeToggle.checked = true;
        localStorage.setItem('darkMode', 'dark');
    }
    
    function disableDarkMode() {
        html.removeAttribute('data-theme');
        darkModeStylesheet.setAttribute('disabled', '');
        darkModeToggle.checked = false;
        localStorage.setItem('darkMode', 'light');
    }
    
    // Watch for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('darkMode')) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });
});