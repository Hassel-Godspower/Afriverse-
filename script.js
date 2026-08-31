
/* =========================================================
   AFRIVERSE — GLOBAL INTERACTIONS
   ========================================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => [
    ...document.querySelectorAll(selector)
];

/* =========================================================
   MOBILE SIDEBAR / TOP MENU
   ========================================================= */

const menuButton =
    document.getElementById("menu");

const sidebar =
    document.getElementById("sidebar");


if (menuButton && sidebar) {


    /* -----------------------------------------------------
       OPEN / CLOSE MENU
    ----------------------------------------------------- */

    menuButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            const isOpen =
                sidebar.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );


    /* -----------------------------------------------------
       PREVENT OUTSIDE CLICK WHEN TOUCHING SIDEBAR
       ----------------------------------------------------- */

    sidebar.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

        }
    );


    /* -----------------------------------------------------
       CLOSE WHEN CLICKING OUTSIDE
       ----------------------------------------------------- */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !sidebar.classList.contains("open")
            ) {

                return;

            }


            if (
                sidebar.contains(event.target) ||
                event.target === menuButton
            ) {

                return;

            }


            sidebar.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );


    /* -----------------------------------------------------
       ESCAPE KEY
       ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !== "Escape"
            ) {

                return;

            }


            if (
                !sidebar.classList.contains("open")
            ) {

                return;

            }


            sidebar.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );

}

/* =========================================================
   THEME TOGGLE
   ========================================================= */

$("#theme")?.addEventListener("click", () => {

    document.body.classList.toggle("light");

    localStorage.setItem(
        "av-theme",
        document.body.classList.contains("light")
            ? "light"
            : "dark"
    );

});


/* Restore saved theme */

if (
    localStorage.getItem("av-theme") === "light"
) {

    document.body.classList.add("light");

}


/* =========================================================
   GLOBAL SEARCH
   ========================================================= */

$("#search")?.addEventListener("keydown", (event) => {

    if (
        event.key === "Enter" &&
        event.target.value.trim()
    ) {

        const query = event.target.value.trim();

        window.location.href =
            "explore.html?q=" +
            encodeURIComponent(query);

    }

});


/* =========================================================
   AFRIVERSE CHAT — MVP
   ========================================================= */

const chatForm = $("#chatForm");

const chatInput = $("#chatInput");

const chat = $("#chat");


if (chatForm && chatInput && chat) {

    chatForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const text =
                chatInput.value.trim();

            if (!text) return;


            /* -----------------------------------------
               USER MESSAGE
            ----------------------------------------- */

            chat.insertAdjacentHTML(
                "beforeend",

                `
                <div class="msg user">

                    <div class="bubble">
                        ${escapeHTML(text)}
                    </div>

                </div>
                `
            );


            /* Clear input */

            chatInput.value = "";


            /* -----------------------------------------
               MVP AI RESPONSE
            ----------------------------------------- */

            setTimeout(() => {

                chat.insertAdjacentHTML(
                    "beforeend",

                    `
                    <div class="msg">

                        <div class="bubble">

                            <b>AfriVerse</b>

                            <br><br>

                            For this MVP, I would ground
                            the answer in regional context,
                            provenance and validation status.

                            <br><br>

                            The production version will
                            connect this interface to the
                            Knowledge Engine and a secure
                            AI API.

                        </div>

                    </div>
                    `
                );

                /* Keep latest message visible */

                chat.scrollTop =
                    chat.scrollHeight;

            }, 450);

        }
    );

}


/* =========================================================
   HTML ESCAPE UTILITY
   ========================================================= */

function escapeHTML(value) {

    return value.replace(
        /[&<>"']/g,

        (character) => {

            const entities = {

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            };

            return entities[character];

        }
    );

}


/* =========================================================
   BASIC MVP MODAL
   ========================================================= */

$$("[data-modal]").forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                $("#modal")?.classList.add(
                    "show"
                );

            }
        );

    }
);


$("#close")?.addEventListener(
    "click",
    () => {

        $("#modal")?.classList.remove(
            "show"
        );

    }
);


/* =========================================================
   CONTRIBUTION FORM — MVP
   ========================================================= */

$("#contribute")?.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        localStorage.setItem(
            "av-last-contribution",
            new Date().toISOString()
        );


        $("#modal")?.classList.remove(
            "show"
        );


        alert(
            "Contribution saved in the MVP queue."
        );

    }
);


/* =========================================================
   AFRIVERSE PAGE INTERACTIONS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           REVEAL ON SCROLL
           ================================================= */

        const revealItems =
            document.querySelectorAll(
                ".reveal"
            );


        if ("IntersectionObserver" in window) {

            const revealObserver =
                new IntersectionObserver(
                    (entries) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "visible"
                                    );


                                    revealObserver.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.12
                    }
                );


            revealItems.forEach(
                (item) => {

                    revealObserver.observe(
                        item
                    );

                }
            );

        } else {

            /* Fallback for older browsers */

            revealItems.forEach(
                (item) => {

                    item.classList.add(
                        "visible"
                    );

                }
            );

        }


        /* =================================================
           PITCH / DEMO MODALS
           ================================================= */

        const modalButtons =
            document.querySelectorAll(
                "[data-modal]"
            );


        const modals =
            document.querySelectorAll(
                ".modal"
            );


        /* -----------------------------------------
           CLOSE MODAL FUNCTION
        ----------------------------------------- */

        const closeModal = (modal) => {

            if (!modal) return;


            modal.classList.remove(
                "open"
            );


            modal.setAttribute(
                "aria-hidden",
                "true"
            );


            /* Stop video playback */

            const video =
                modal.querySelector(
                    "video"
                );


            if (video) {

                video.pause();

                video.currentTime = 0;

            }

        };


        /* -----------------------------------------
           OPEN MODAL
        ----------------------------------------- */

        modalButtons.forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        const modalID =
                            button.dataset.modal;


                        const modal =
                            document.getElementById(
                                modalID
                            );


                        if (!modal) return;


                        modal.classList.add(
                            "open"
                        );


                        modal.setAttribute(
                            "aria-hidden",
                            "false"
                        );

                    }
                );

            }
        );


        /* -----------------------------------------
           CLOSE BUTTON + OVERLAY
        ----------------------------------------- */

        modals.forEach(
            (modal) => {

                const closeButton =
                    modal.querySelector(
                        ".modal-close"
                    );


                const overlay =
                    modal.querySelector(
                        ".modal-overlay"
                    );


                if (closeButton) {

                    closeButton.addEventListener(
                        "click",
                        () => {

                            closeModal(
                                modal
                            );

                        }
                    );

                }


                if (overlay) {

                    overlay.addEventListener(
                        "click",
                        () => {

                            closeModal(
                                modal
                            );

                        }
                    );

                }

            }
        );


        /* =================================================
           ESCAPE KEY — CLOSE ALL MODALS
           ================================================= */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape"
                ) {

                    modals.forEach(
                        (modal) => {

                            closeModal(
                                modal
                            );

                        }
                    );

                }

            }
        );

/* =========================================================
   AFRIVERSE HERO — SUBTLE DEPTH
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".hero");
    const background = document.querySelector(".hero-background");

    if (!hero || !background) {
        return;
    }


    /*
     * Do not run the effect on touch devices.
     */

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }


    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    /*
     * Mouse position.
     */

    hero.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                hero.getBoundingClientRect();


            const x =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width;


            const y =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height;


            /*
             * Extremely small movement.
             *
             * The pyramid should NOT
             * visibly float around.
             */

            targetX =
                (x - 0.5) * -10;


            targetY =
                (y - 0.5) * -6;

        }
    );


    /*
     * Smooth interpolation.
     */

    function animateHeroDepth() {

        currentX +=
            (
                targetX -
                currentX
            ) * 0.035;


        currentY +=
            (
                targetY -
                currentY
            ) * 0.035;


        background.style.setProperty(
            "--hero-x",
            `${currentX}px`
        );


        background.style.setProperty(
            "--hero-y",
            `${currentY}px`
        );


        requestAnimationFrame(
            animateHeroDepth
        );

    }


    animateHeroDepth();


    /*
     * Return to center when mouse leaves.
     */

    hero.addEventListener(
        "mouseleave",
        () => {

            targetX = 0;
            targetY = 0;

        }
    );

});

/* =========================================================
   AFRIVERSE KNOWLEDGE FLYWHEEL
   Rotating orbit + static center
========================================================= */

const flywheelOrbit =
    document.querySelector(".flywheel-orbit");


if (flywheelOrbit) {

    let rotation = 0;

    let lastTime =
        performance.now();


    /*
     * Rotation speed.
     *
     * Increase this value for faster movement.
     * Decrease it for a slower, more cinematic effect.
     */

    const rotationSpeed = 0.018;


    function animateFlywheel(currentTime) {

        const delta =
            currentTime - lastTime;


        lastTime =
            currentTime;


        rotation +=
            delta * rotationSpeed;


        flywheelOrbit.style.setProperty(
            "--fly-rotation",
            `${rotation}deg`
        );


        requestAnimationFrame(
            animateFlywheel
        );

    }


    requestAnimationFrame(
        animateFlywheel
    );

}


        /* =================================================
           ACTIVE SIDEBAR NAVIGATION
           ================================================= */

        const currentPage =
            window.location.pathname
                .split("/")
                .pop() || "index.html";


        document
            .querySelectorAll(
                ".side a"
            )
            .forEach(
                (link) => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        href === currentPage ||
                        (
                            currentPage === "" &&
                            href === "index.html"
                        )
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                }
            );


        /* =================================================
           SMOOTH INTERNAL NAVIGATION
           ================================================= */

        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(
                (link) => {

                    link.addEventListener(
                        "click",
                        (event) => {

                            const targetID =
                                link.getAttribute(
                                    "href"
                                );


                            if (
                                targetID === "#" ||
                                targetID.length < 2
                            ) {

                                return;

                            }


                            const target =
                                document.querySelector(
                                    targetID
                                );


                            if (!target) {

                                return;

                            }


                            event.preventDefault();


                            target.scrollIntoView(
                                {
                                    behavior: "smooth",
                                    block: "start"
                                }
                            );

                        }
                    );

                }
            );

    }
);

