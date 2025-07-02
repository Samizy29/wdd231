// Course array for Web & Computer Programming certificate
const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, completed: true },
  { code: "WDD 231", name: "Front-end Web Dev I", credits: 3, completed: false },
  { code: "CSE 121b", name: "JavaScript Language", credits: 3, completed: false }
];

// Function to render course cards based on filter
function renderCourses(filter = 'all') {
  const container = document.getElementById("courseCards");
  const totalCreditsEl = document.getElementById("totalCredits");

  container.innerHTML = ""; // Clear previous output

  // Filter logic
  let filtered = courses;
  if (filter === 'wdd') filtered = courses.filter(c => c.code.includes("WDD"));
  else if (filter === 'cse') filtered = courses.filter(c => c.code.includes("CSE"));

  // Calculate total credits using reduce
  let totalCredits = filtered.reduce((sum, c) => sum + c.credits, 0);
  totalCreditsEl.textContent = `Total credits: ${totalCredits}`;

  // Create and display cards
  filtered.forEach(course => {
    const card = document.createElement("div");
    card.className = course.completed ? "card completed" : "card";
    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>${course.credits} Credits</p>
    `;
    container.appendChild(card);
  });
}

// Button click event listeners
document.getElementById("allBtn").addEventListener("click", () => renderCourses("all"));
document.getElementById("wddBtn").addEventListener("click", () => renderCourses("wdd"));
document.getElementById("cseBtn").addEventListener("click", () => renderCourses("cse"));

// Initial render on page load
window.addEventListener("load", () => renderCourses());
