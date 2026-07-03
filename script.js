const typingElement = document.getElementById('typing');
const yearElement = document.getElementById('year');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');
const loadingScreen = document.querySelector('.loading-screen');

const words = ['fast, scalable products.', 'beautiful user experiences.', 'modern MERN solutions.'];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    typingElement.textContent = currentWord.slice(0, ++charIndex);
    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeLoop, 1100);
      return;
    }
  } else {
    typingElement.textContent = currentWord.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeLoop, deleting ? 55 : 90);
}

const projectGrid = document.getElementById('projectGrid');

window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 700);
  typeLoop();
  loadProjectData();
});

yearElement.textContent = new Date().getFullYear();

async function loadProjectData() {
  try {
    const response = await fetch('http://localhost:4000/api/projects');
    if (!response.ok) throw new Error('Backend unavailable');
    const data = await response.json();
    if (data.projects?.length) {
      projectGrid.innerHTML = data.projects
        .map(
          (project) => `
            <article class="project-card reveal">
              <div class="project-visual" style="background: ${project.color};"></div>
              <div class="project-body">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tag-row">
                  ${project.tech.map((tag) => `<span>${tag}</span>`).join('')}
                </div>
                <div class="card-actions">
                  <a href="${project.github}" class="text-link" target="_blank" rel="noreferrer">GitHub</a>
                  <a href="${project.demo}" class="text-link" target="_blank" rel="noreferrer">Live Demo</a>
                  <a href="${project.caseStudy}" class="text-link" target="_blank" rel="noreferrer">Case Study</a>
                </div>
              </div>
            </article>
          `
        )
        .join('');
    }
  } catch (error) {
    console.debug('Backend project API not available:', error.message);
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = 'Thanks for reaching out. I will be in touch soon.';
  contactForm.reset();
});
