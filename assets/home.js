import { profile } from "../content/profile.js";
import { projects } from "../content/projects.js";

const byId = (id) => document.getElementById(id);

function renderProfile() {
  byId("hero-name").textContent = profile.name;
  byId("hero-tagline").textContent = profile.tagline;
  byId("hero-intro").textContent = profile.intro;
  byId("profile-name").textContent = profile.name;
  byId("profile-title").textContent = profile.title;
  byId("profile-location").textContent = profile.location;
  byId("profile-email").textContent = profile.email;

  const focusList = byId("profile-focuses");
  focusList.innerHTML = profile.focuses.map((item) => `<li>${item}</li>`).join("");

  const links = byId("profile-links");
  links.innerHTML = profile.links
    .filter((item) => item.label.toLowerCase() !== "email")
    .map((item) => `<a class="link-pill" href="${item.href}" target="_blank" rel="noreferrer">${item.label}</a>`)
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
        <a class="project-card ${project.featured ? "is-featured" : ""} ${project.theme ? `theme-${project.theme}` : ""}" href="./project.html?slug=${encodeURIComponent(project.slug)}">
          ${project.cover ? `
            <figure class="project-card-media">
              <img src="${project.cover}" alt="${project.name} 项目界面" loading="${project.featured ? "eager" : "lazy"}" />
              <figcaption><span>Featured system</span><b>Open case study ↗</b></figcaption>
            </figure>
          ` : ""}
          <div class="project-card-body">
            <div class="project-card-top">
              <span class="project-card-meta">${project.type}</span>
              <span class="project-card-meta">${project.year}</span>
            </div>
            <h3>${project.name}</h3>
            <p class="project-card-summary">${project.summary}</p>
            <div class="project-card-tags">
              ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
            <div class="project-card-footer">
              <span>${project.status}</span>
              <span class="arrow-link">Open</span>
            </div>
          </div>
        </a>
      `,
    )
    .join("");
}

renderProfile();
renderProjects();
