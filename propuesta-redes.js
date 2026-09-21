const tabs = [...document.querySelectorAll(".platform-tab")];
const panels = [...document.querySelectorAll(".platform-panel")];

const selectPlatform = (platform) => {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.platform === platform;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  panels.forEach((panel) => {
    const isActive = panel.dataset.panel === platform;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
};

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectPlatform(tab.dataset.platform));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    selectPlatform(tabs[nextIndex].dataset.platform);
  });
});
