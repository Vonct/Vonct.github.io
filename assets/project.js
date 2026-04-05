import { projects } from "../content/projects.js";

const root = document.getElementById("project-page");
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
const project = projects.find((item) => item.slug === slug);

if (!project) {
  document.title = "Project Not Found | Vonct";
  root.innerHTML = `
    <p class="project-nav"><a href="./index.html">Back to projects</a></p>
    <section class="project-section">
      <h3>Project not found</h3>
      <p>没有找到对应的项目数据，请返回首页重新选择。</p>
    </section>
  `;
} else {
  document.title = `${project.name} | Vonct`;
  root.innerHTML = `
    <p class="project-nav"><a href="./index.html#projects">Back to projects</a></p>
    <section class="project-hero">
      <span class="eyebrow">${project.type}</span>
      <h1>${project.name}</h1>
      <p class="project-lede">${project.summary}</p>
    </section>

    <div class="project-layout">
      <div class="project-main">
        <section class="project-meta">
          <div class="project-meta-grid">
            <div>
              <span class="detail-label">Year</span>
              <strong>${project.year}</strong>
            </div>
            <div>
              <span class="detail-label">Status</span>
              <strong>${project.status}</strong>
            </div>
            <div>
              <span class="detail-label">Role</span>
              <strong>${project.role}</strong>
            </div>
            <div>
              <span class="detail-label">Duration</span>
              <strong>${project.duration}</strong>
            </div>
          </div>
        </section>

        ${project.sections
          .map(
            (section) => `
              <section class="project-section">
                <h4>${section.title}</h4>
                <p>${section.body}</p>
              </section>
            `,
          )
          .join("")}
      </div>

      <aside class="project-side">
        <section class="project-sidecard">
          <span class="detail-label">Highlights</span>
          <ul>
            ${project.highlights.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </section>

        <section class="project-sidecard">
          <span class="detail-label">Stack</span>
          <ul>
            ${project.stack.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </section>

        <section class="project-sidecard">
          <span class="detail-label">Links</span>
          <div class="project-links">
            ${project.repo ? `<a class="project-link" href="${project.repo}" target="_blank" rel="noreferrer">Repository</a>` : ""}
            ${project.demo ? `<a class="project-link" href="${project.demo}" target="_blank" rel="noreferrer">Demo</a>` : ""}
          </div>
        </section>
      </aside>
    </div>
  `;
}
