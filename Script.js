
document.addEventListener("DOMContentLoaded", () => {
  // Scroll reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Add reveal animation to major cards
  document
    .querySelectorAll(
      ".feature-mockup, .agent-card, .timeline-item, .arch-node"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(22px)";
      el.style.transition = "opacity .75s ease, transform .75s ease";
      observer.observe(el);
    });

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.08 }
  );

  document
    .querySelectorAll(
      ".feature-mockup, .agent-card, .timeline-item, .arch-node"
    )
    .forEach((el) => cardObserver.observe(el));

  // Gentle mouse parallax for the hero computational structure
  const hero = document.querySelector(".hero");
  const tech = document.querySelector(".hero-tech");

  if (hero && tech && window.matchMedia("(pointer:fine)").matches) {
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      tech.style.transform = `translate(${x * 12}px, ${y * 12}px) rotate(${ x * 2 }deg)`;
    });

    hero.addEventListener("mouseleave", () => {
      tech.style.transform = "";
    });
  }

  // Replace broken mockup images with the built-in HTML fallback.
  document.querySelectorAll(".phone-screen img").forEach((img) => {
    img.addEventListener("error", () => {
      img.style.display = "none";
      img.parentElement.classList.add("placeholder-screen");
    });
  });

  // Small dynamic year marker if later needed.
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  );
});
