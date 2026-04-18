document.addEventListener("DOMContentLoaded", () => {
  console.log("sidebar-toggle.js loaded");

  const root = document.documentElement; // <html>
  const body = document.body;

  // Sync body with html (html was set early via metadata-hook)
  if (root.classList.contains("sidebar-collapsed")) {
    body.classList.add("sidebar-collapsed");
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("#sidebar-trigger");

    if (!trigger) return;

    console.log("sidebar trigger clicked");

    event.preventDefault();
    event.stopPropagation();

    // Toggle BOTH html and body
    root.classList.toggle("sidebar-collapsed");
    body.classList.toggle("sidebar-collapsed");

    const isCollapsed = root.classList.contains("sidebar-collapsed");
    console.log("sidebar-collapsed:", isCollapsed);

    localStorage.setItem(
      "sidebar-collapsed",
      isCollapsed ? "true" : "false"
    );
  });
});