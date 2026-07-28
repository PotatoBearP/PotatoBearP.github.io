document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".nav");
  const links = document.querySelector(".nav-links");

  // Normalize legacy static pages to the same two-item navigation as the homepage.
  if (header && nav && links) {
    const allLinks = [...links.querySelectorAll("a")];
    if (!document.body.classList.contains("home-page")) {
      allLinks.forEach((link, index) => {
        if (index === 0) {
          link.textContent = "Bio";
          link.href = "/#bio";
        } else if (index === 1) {
          link.textContent = "Papers";
          link.href = "/#papers";
        } else if (index === 2) {
          link.textContent = "Reports";
          link.href = "/#technical-reports";
        } else {
          link.remove();
        }
      });

      const menuButton = document.createElement("button");
      menuButton.className = "menu-button icon-button";
      menuButton.type = "button";
      menuButton.setAttribute("aria-label", "Open menu");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
      nav.insertBefore(menuButton, links);

      const actions = document.createElement("div");
      actions.className = "nav-actions";
      actions.innerHTML = `
        <button class="icon-button search-button" type="button" aria-label="Search">
          <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>
        </button>
        <button class="icon-button theme-button" type="button" aria-label="Change color theme">
          <svg class="sun-icon" width="19" height="19" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></svg>
          <svg class="moon-icon" width="19" height="19" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.1A8 8 0 0 1 8.9 4 8 8 0 1 0 20 15.1Z"/></svg>
        </button>`;
      nav.append(actions);
    }
  }

  const menuButton = document.querySelector(".menu-button");
  menuButton?.addEventListener("click", () => {
    const open = links?.classList.toggle("open") ?? false;
    menuButton.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });
  links?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    links.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }));

  document.querySelector(".theme-button")?.addEventListener("click", () => {
    const systemDark = matchMedia("(prefers-color-scheme: dark)").matches;
    const currentDark = root.dataset.theme === "dark" || (root.dataset.theme === "system" && systemDark);
    const next = currentDark ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
  });

  const pages = [
    ["Bio", "/#bio"],
    ["Papers", "/#papers"],
    ["Explore Model Kinship For Merging Large Language Models", "/publication/modelkinship/"],
    ["Technical Reports", "/#technical-reports"],
    ["AgentOmnia: Scaling Agentic Models for Full-Scenario Applications", "/technical-report/agentomnia/"],
    ["Projects", "/#projects"],
    ["Model Kinship", "https://github.com/zjunlp/ModelKinship"],
    ["Subspace Merge", "https://github.com/PotatoBearP/Local_Merge"],
    ["Experience", "/experience/"]
  ];
  let dialog = document.querySelector(".search-dialog");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.className = "search-dialog";
    dialog.innerHTML = `<form method="dialog" class="search-box">
      <button class="search-close icon-button" value="close" aria-label="Close search">×</button>
      <label for="site-search">Search</label>
      <input id="site-search" type="search" autocomplete="off" placeholder="Search this site…">
      <div class="search-results" aria-live="polite"></div>
    </form>`;
    document.body.append(dialog);
  }
  const input = dialog.querySelector("input");
  const results = dialog.querySelector(".search-results");
  const renderResults = () => {
    const query = input.value.trim().toLowerCase();
    const matches = pages.filter(([title]) => !query || title.toLowerCase().includes(query));
    results.replaceChildren(...matches.map(([title, href]) => {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = title;
      return link;
    }));
  };
  document.querySelector(".search-button")?.addEventListener("click", () => {
    renderResults();
    dialog.showModal();
    input.focus();
  });
  input.addEventListener("input", renderResults);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});
