const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
$("#menu")?.addEventListener("click", () =>
  $(".side").classList.toggle("open")
);
$("#theme")?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "av-theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
});
if (localStorage.getItem("av-theme") === "light")
  document.body.classList.add("light");
$("#search")?.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.value.trim())
    location.href = "explore.html?q=" + encodeURIComponent(e.target.value);
});
const form = $("#chatForm"),
  input = $("#chatInput"),
  chat = $("#chat");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let t = input.value.trim();
    if (!t) return;
    chat.insertAdjacentHTML(
      "beforeend",
      `<div class="msg user"><div class="bubble">${esc(t)}</div></div>`
    );
    input.value = "";
    setTimeout(
      () =>
        chat.insertAdjacentHTML(
          "beforeend",
          '<div class="msg"><div class="bubble"><b>AfriVerse</b><br>For this MVP, I would ground the answer in regional context, provenance and validation status. The production version will connect this interface to the Knowledge Engine and a secure AI API.</div></div>'
        ),
      450
    );
  });
}
function esc(s) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[
        c
      ])
  );
}
$$("[data-modal]").forEach(
  (b) => (b.onclick = () => $("#modal").classList.add("show"))
);
$("#close")?.addEventListener("click", () =>
  $("#modal").classList.remove("show")
);
$("#contribute")?.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("av-last-contribution", new Date().toISOString());
  $("#modal").classList.remove("show");
  alert("Contribution saved in the MVP queue.");
});





/* =========================================================   AFRIVERSE INTERACTIONS========================================================= */document.addEventListener("DOMContentLoaded", () => {    /* =====================================================       REVEAL ON SCROLL    ===================================================== */    const revealItems = document.querySelectorAll(".reveal");    const revealObserver = new IntersectionObserver(        (entries) => {            entries.forEach((entry) => {                if (entry.isIntersecting) {                    entry.target.classList.add("visible");                    revealObserver.unobserve(entry.target);                }            });        },        {            threshold: 0.12        }    );    revealItems.forEach((item) => {        revealObserver.observe(item);    });    /* =====================================================       MODALS    ===================================================== */    const modalButtons =        document.querySelectorAll("[data-modal]");    const modals =        document.querySelectorAll(".modal");    const closeModal = (modal) => {        if (!modal) return;        modal.classList.remove("open");        modal.setAttribute(            "aria-hidden",            "true"        );        const video =            modal.querySelector("video");        if (video) {            video.pause();        }    };    modalButtons.forEach((button) => {        button.addEventListener("click", () => {            const modalID =                button.dataset.modal;            const modal =                document.getElementById(modalID);            if (!modal) return;            modal.classList.add("open");            modal.setAttribute(                "aria-hidden",                "false"            );        });    });    modals.forEach((modal) => {        const close =            modal.querySelector(".modal-close");        const overlay =            modal.querySelector(".modal-overlay");        if (close) {            close.addEventListener(                "click",                () => closeModal(modal)            );        }        if (overlay) {            overlay.addEventListener(                "click",                () => closeModal(modal)            );        }    });    document.addEventListener(        "keydown",        (event) => {            if (event.key === "Escape") {                modals.forEach(                    (modal) => closeModal(modal)                );            }        }    );    /* =====================================================       FLYWHEEL MICRO ANIMATION    ===================================================== */    const flywheel =        document.querySelector(".flywheel-ring");    if (flywheel) {        let rotation = 0;        let lastTime = performance.now();        const animateFlywheel = (time) => {            const delta =                time - lastTime;            lastTime = time;            rotation += delta * 0.002;            flywheel.style.setProperty(                "--fly-rotation",                `${rotation}deg`            );            requestAnimationFrame(                animateFlywheel            );        };        /*         * Deliberately very subtle.         * The actual nodes do not rotate;         * the ring receives a slow atmospheric motion.         */        requestAnimationFrame(            animateFlywheel        );    }    /* =====================================================       ACTIVE NAVIGATION    ===================================================== */    const currentPage =        window.location.pathname.split("/").pop()        || "index.html";    document        .querySelectorAll(".side a")        .forEach((link) => {            const href =                link.getAttribute("href");            if (                href === currentPage ||                (                    currentPage === "" &&                    href === "index.html"                )            ) {                link.classList.add("active");            }        });    /* =====================================================       SMOOTH INTERNAL LINKS    ===================================================== */    document        .querySelectorAll('a[href^="#"]')        .forEach((link) => {            link.addEventListener(                "click",                (event) => {                    const targetID =                        link.getAttribute("href");                    if (                        targetID === "#" ||                        targetID.length < 2                    ) {                        return;                    }                    const target =                        document.querySelector(                            targetID                        );                    if (!target) return;                    event.preventDefault();                    target.scrollIntoView({                        behavior: "smooth",                        block: "start"                    });                }            );        });});
