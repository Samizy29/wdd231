const courses = [
  { code: 'WDD231', name: 'Front-end Development I', credits: 3, completed: true },
  { code: 'WDD130', name: 'Web Fundamentals', credits: 3, completed: true },
  { code: 'CSE110', name: 'Programming Principles', credits: 2, completed: false },
  { code: 'CSE210', name: 'Programming with Classes', credits: 4, completed: false },
  { code: 'WDD330', name: 'Front-end Development II', credits: 3, completed: false }
];

const coursesContainer = document.getElementById('courses');
const creditTotalEl = document.getElementById('creditTotal');

function displayCourses(courseList) {
  coursesContainer.innerHTML = '';
  let totalCredits = 0;

  courseList.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    if (course.completed) card.classList.add('completed');
    card.innerHTML = `<strong>${course.code}</strong>: ${course.name} (${course.credits} credits)`;
    coursesContainer.appendChild(card);
    totalCredits += course.credits;
  });

  creditTotalEl.textContent = totalCredits;
}

function filterCourses(type) {
  if (type === 'wdd') displayCourses(courses.filter(c => c.code.includes('WDD')));
  else if (type === 'cse') displayCourses(courses.filter(c => c.code.includes('CSE')));
  else displayCourses(courses);
}

document.getElementById('all').addEventListener('click', () => filterCourses('all'));
document.getElementById('wdd').addEventListener('click', () => filterCourses('wdd'));
document.getElementById('cse').addEventListener('click', () => filterCourses('cse'));

// Initial display
filterCourses('all');
