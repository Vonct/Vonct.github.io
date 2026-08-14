import { profile } from "../content/profile.js";
import { projects } from "../content/projects.js";

const byId = (id) => document.getElementById(id);

function renderProfile() {
  byId("hero-name").textContent = profile.name;
  byId("hero-tagline").textContent = profile.tagline;
  byId("hero-intro").textContent = profile.intro;
  byId("profile-name").textContent = profile.name;
  byId("profile-location").textContent = profile.location;

  const focusList = byId("profile-focuses");
  focusList.innerHTML = profile.focuses.map((item) => `<span>${item}</span>`).join("");

  const links = byId("profile-links");
  links.innerHTML = profile.links
    .map((item) => `<a href="${item.href}" ${item.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>${item.label}</a>`)
    .join("");
}

function renderProjects() {
  const grid = byId("project-grid");
  if (!projects.length) {
    grid.innerHTML = '<p class="empty-state">还没有项目数据。</p>';
    return;
  }

  grid.innerHTML = projects
    .map(
      (project) => `
        <a class="project-card ${project.featured ? "is-featured" : ""} ${project.theme ? `theme-${project.theme}` : ""} ${project.cardVisual ? "has-card-visual" : ""}" href="./project.html?slug=${encodeURIComponent(project.slug)}">
          ${project.cover || project.cardVisual ? `
            <figure class="project-card-media">
              <img src="${project.cover || project.cardVisual.src}" alt="${project.cardVisual?.alt || `${project.name} 项目界面`}" loading="lazy" />
            </figure>
          ` : ""}
          <div class="project-card-body">
            <div class="project-card-top">
              <span class="project-card-index">${String(projects.indexOf(project) + 1).padStart(2, "0")}</span>
              <span class="project-card-meta">${project.year}</span>
            </div>
            <h3>${project.name}</h3>
            <p class="project-card-summary">${project.summary}</p>
            <div class="project-card-footer">
              <span>${project.type.split(" / ")[0]}</span>
              <span class="arrow-link">View project <i aria-hidden="true">↗</i></span>
            </div>
          </div>
        </a>
      `,
    )
    .join("");
}

renderProfile();
renderProjects();

if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll(".project-card, .about-section").forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 },
  );
  document.querySelectorAll(".project-card, .about-section").forEach((item) => observer.observe(item));
}
