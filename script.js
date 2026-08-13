// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Pull allowlisted repos from GitHub (edit projects.json to change what shows here)
const GITHUB_USERNAME = 'akhiltalati101';

async function loadRepos() {
  const grid = document.getElementById('repo-grid');
  const status = document.getElementById('repo-status');

  try {
    const listRes = await fetch('projects.json');
    if (!listRes.ok) throw new Error(`Could not load projects.json (${listRes.status})`);
    const allowlist = await listRes.json();

    if (!allowlist.length) {
      status.textContent = 'No projects listed yet — add repo names to projects.json.';
      return;
    }

    const results = await Promise.all(
      allowlist.map(async (repoName) => {
        const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`);
        return res.ok ? res.json() : null;
      })
    );

    const visible = results.filter(Boolean);

    if (!visible.length) {
      status.textContent = 'Could not find any of the listed repos — check projects.json.';
      return;
    }

    grid.innerHTML = visible
      .map(
        (repo) => `
      <article class="repo-card">
        <h3><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h3>
        <p>${repo.description ? escapeHtml(repo.description) : 'No description provided.'}</p>
        <div class="repo-meta">
          ${repo.language ? `<span>${repo.language}</span>` : ''}
          <span>★ ${repo.stargazers_count}</span>
        </div>
      </article>
    `
      )
      .join('');
  } catch (err) {
    status.textContent = 'Could not load repositories right now — visit GitHub directly.';
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

loadRepos();
