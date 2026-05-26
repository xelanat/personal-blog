interface PostCard extends HTMLElement {
  dataset: {
    title: string;
    tags: string;
    excerpt: string;
  };
}

function init(): void {
  const searchInput = document.getElementById("search") as HTMLInputElement | null;
  const tagFilterBtns = document.querySelectorAll<HTMLButtonElement>(".tag-filter-btn");
  const cards = Array.from(document.querySelectorAll<PostCard>(".post-card"));
  const noResults = document.getElementById("no-results") as HTMLElement | null;

  let activeTag = "";
  let query = "";

  const urlTag = new URLSearchParams(window.location.search).get("tag") ?? "";
  if (urlTag) {
    activeTag = urlTag;
    tagFilterBtns.forEach((btn) => {
      if (btn.dataset.tag === urlTag) btn.classList.add("active");
    });
  }

  function applyFilters(): void {
    const q = query.toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const title = (card.dataset.title ?? "").toLowerCase();
      const excerpt = (card.dataset.excerpt ?? "").toLowerCase();
      const tags = (card.dataset.tags ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const matchesSearch =
        !q || title.includes(q) || excerpt.includes(q) || tags.some((t) => t.toLowerCase().includes(q));
      const matchesTag = !activeTag || tags.includes(activeTag);

      const show = matchesSearch && matchesTag;
      card.classList.toggle("hidden", !show);
      if (show) visible++;
    });

    noResults?.classList.toggle("hidden", visible > 0);
  }

  searchInput?.addEventListener("input", (e) => {
    query = (e.target as HTMLInputElement).value;
    applyFilters();
  });

  tagFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tag = btn.dataset.tag ?? "";
      activeTag = activeTag === tag ? "" : tag;

      tagFilterBtns.forEach((b) => b.classList.remove("active"));
      if (activeTag) btn.classList.add("active");

      const url = new URL(window.location.href);
      activeTag ? url.searchParams.set("tag", activeTag) : url.searchParams.delete("tag");
      window.history.replaceState({}, "", url);

      applyFilters();
    });
  });

  applyFilters();
}

document.addEventListener("DOMContentLoaded", init);
