export default function redirectButton() {
  const header = document.querySelector("header");
  const stickyBtn = document.querySelector(".btn-sticky");

  const stickyButton = (entries) => {
    const [entry] = entries;
    !entry.isIntersecting
      ? (stickyBtn.style.display = "block")
      : (stickyBtn.style.display = "none");
  };

  const headerobserver = new IntersectionObserver(stickyButton, {
    root: null,
    threshold: 0,
  });
  headerobserver.observe(header);
}
