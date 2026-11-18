document.addEventListener("DOMContentLoaded", () => {
  loadPortfolioData();
});

async function loadPortfolioData() {
  try {
    const response = await fetch("data/portfolio.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    renderProfile(data.profile);
    renderExperience(data.experience);
    renderSkills(data.skills);
    renderProjects(data.projects);
    renderCertificates(data.certificates);
  } catch (error) {
    console.error("Failed to load portfolio data:", error);
  }
}

function renderProfile(profile) {
  document.getElementById("nav-name").textContent = profile.name;
  document.getElementById("profile-name").textContent = profile.name;
  document.getElementById("profile-role").textContent = profile.role;
  document.getElementById("profile-bio").textContent = profile.bio;
  document.getElementById("profile-about").textContent = profile.about;
  document.getElementById("footer-name").textContent = profile.name;
  document.getElementById("year").textContent = new Date().getFullYear();

  const socialContainer = document.getElementById("social-links");
  let linksHTML = "";

  if (profile.github) {
    linksHTML += `<a href="${profile.github}" target="_blank" rel="noopener noreferrer">GitHub</a>`;
  }
  if (profile.linkedin) {
    linksHTML += `<a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>`;
  }
  if (profile.telegram) {
    linksHTML += `<a href="${profile.telegram}" target="_blank" rel="noopener noreferrer">Telegram</a>`;
  }
  if (profile.email) {
    linksHTML += `<a href="mailto:${profile.email}">Email</a>`;
  }
  if (profile.phone) {
    const cleanPhone = profile.phone.replace(/\s+/g, "");
    linksHTML += `<a href="tel:${cleanPhone}">${profile.phone}</a>`;
  }

  socialContainer.innerHTML = linksHTML;
}

function renderExperience(experienceList) {
  const container = document.getElementById("experience-list");
  container.innerHTML = "";

  if (!experienceList || experienceList.length === 0) return;

  experienceList.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${item.role}</h3>
      <p class="subtitle">${item.organization} &bull; ${item.period}</p>
      <p>${item.description}</p>
    `;
    container.appendChild(card);
  });
}

function renderSkills(skills) {
  const container = document.getElementById("skills-container");
  container.innerHTML = "";

  skills.forEach((group) => {
    const groupDiv = document.createElement("div");
    groupDiv.className = "skill-group";

    const itemsHtml = group.items
      .map((item) => `<span class="skill-pill">${item}</span>`)
      .join("");

    groupDiv.innerHTML = `
      <h3>${group.category}</h3>
      <div class="skill-list">${itemsHtml}</div>
    `;
    container.appendChild(groupDiv);
  });
}

function renderProjects(projects) {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";

  projects.forEach((project) => {
    const techTags = project.techStack
      .map((tech) => `<span class="tag">${tech}</span>`)
      .join("");

    const liveLink = project.liveUrl
      ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
      : "";

    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tags">${techTags}</div>
      <div class="card-links">
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">Source Code</a>
        ${liveLink}
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderCertificates(certificates) {
  const grid = document.getElementById("certificates-grid");
  grid.innerHTML = "";

  if (!certificates || certificates.length === 0) {
    grid.innerHTML = `<p class="empty-state">Currently pursuing industry certifications. Check back soon!</p>`;
    return;
  }

  certificates.forEach((cert) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${cert.title}</h3>
      <p>${cert.issuer} &bull; ${cert.date}</p>
      <a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer">Verify Credential</a>
    `;
    grid.appendChild(card);
  });
}