// Dynamically display current year in footer
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Dynamically display last modified date of the document
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
