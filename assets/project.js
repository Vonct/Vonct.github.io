import { projects } from "../content/projects.js";

const root = document.getElementById("project-page");
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
const project = projects.find((item) => item.slug === slug);

function renderInline(text) {
  return text
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let paragraph = [];
  let listItems = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push(`<ul>${listItems.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`);
    listItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      flushParagraph();
      flushList();
      const [, alt, src] = imageMatch;
      blocks.push(
        `<figure class="project-figure"><img src="${src}" alt="${alt}" loading="lazy" />${alt ? `<figcaption>${alt}</figcaption>` : ""}</figure>`,
      );
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = Math.min(headingMatch[1].length + 1, 4);
      blocks.push(`<h${level}>${renderInline(headingMatch[2])}</h${level}>`);
      continue;
    }

    const listMatch = trimmed.match(/^-\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      listItems.push(listMatch[1]);
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return blocks.join("");
}

async function loadDetailHtml(detailMd) {
  if (!detailMd) return "";
  try {
    const response = await fetch(detailMd);
    if (!response.ok) return "";
    const markdown = await response.text();
    return markdownToHtml(markdown);
  } catch {
    return "";
  }
}

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
  if (project.theme) {
    root.classList.add(`theme-${project.theme}`);
  }
  loadDetailHtml(project.detailMd).then((detailHtml) => {
    const showcase = project.gallery?.length
      ? `
        <section class="project-showcase" aria-label="${project.name} 界面展示">
          ${project.gallery.map((item, index) => `
            <figure class="project-showcase-item item-${index + 1}">
              <div class="showcase-label"><span>${item.label}</span><i></i></div>
              <img src="${item.src}" alt="${item.alt}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} />
              <figcaption>${item.caption}</figcaption>
            </figure>
          `).join("")}
        </section>
      `
      : "";
    const metrics = project.metrics?.length
      ? `
        <div class="project-proofline">
          ${project.metrics.map((item) => `
            <div><strong>${item.value}</strong><span>${item.label}</span></div>
          `).join("")}
        </div>
      `
      : "";
    root.innerHTML = `
      <p class="project-nav"><a href="./index.html#projects">Back to projects</a></p>
      <section class="project-hero">
        <span class="eyebrow">${project.type}</span>
        <h1>${project.nameHtml || project.name}</h1>
        <p class="project-lede">${project.summary}</p>
        ${metrics}
      </section>

      ${showcase}

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

          <section class="project-section project-markdown">
            ${detailHtml || "<p>暂无项目详情。</p>"}
          </section>
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
  });
}
