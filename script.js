
/* =========================================================
   AFRIVERSE
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       REVEAL ANIMATIONS
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }

        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================================
       MODALS
    ====================================================== */

    const modalTriggers =
        document.querySelectorAll(
            "[data-modal]"
        );

    const modals =
        document.querySelectorAll(".modal");

    const modalCloseButtons =
        document.querySelectorAll(".modal-close");

    const modalOverlays =
        document.querySelectorAll(".modal-overlay");


    function openModal(id) {

        const modal =
            document.getElementById(id);

        if (!modal) return;

        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    }


    function closeModal(modal) {

        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

        const video =
            modal.querySelector("video");

        if (video) {

            video.pause();

        }

    }


    modalTriggers.forEach((trigger) => {

        trigger.addEventListener(
            "click",
            () => {

                const modalId =
                    trigger.dataset.modal;

                openModal(modalId);

            }
        );

    });


    modalCloseButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const modal =
                    button.closest(".modal");

                closeModal(modal);

            }
        );

    });


    modalOverlays.forEach((overlay) => {

        overlay.addEventListener(
            "click",
            () => {

                const modal =
                    overlay.closest(".modal");

                closeModal(modal);

            }
        );

    });


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                modals.forEach((modal) => {

                    if (
                        modal.classList.contains(
                            "active"
                        )
                    ) {

                        closeModal(modal);

                    }

                });

            }

        }
    );


    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((anchor) => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       HERO CHIP PARALLAX
    ====================================================== */

    const heroChip =
        document.querySelector(
            ".hero-chip"
        );


    const heroNetwork =
        document.querySelector(
            ".hero-network"
        );


    if (
        heroChip &&
        heroNetwork
    ) {

        window.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (
                        event.clientX /
                        window.innerWidth
                    ) - 0.5;

                const y =
                    (
                        event.clientY /
                        window.innerHeight
                    ) - 0.5;


                heroChip.style.transform =
                    `
                    translate(
                        calc(-50% + ${x * 15}px),
                        calc(-50% + ${y * 15}px)
                    )
                    rotateX(${55 - y * 4}deg)
                    rotateZ(${45 + x * 4}deg)
                    `;


                heroNetwork.style.transform =
                    `
                    translateY(-50%)
                    translate(
                        ${x * 8}px,
                        ${y * 8}px
                    )
                    `;

            }
        );

    }


    /* =====================================================
       WAVEFORM INTERACTION
    ====================================================== */

    const voiceButton =
        document.querySelector(
            ".voice-button"
        );

    const stopButton =
        document.querySelector(
            ".stop-button"
        );


    if (voiceButton) {

        voiceButton.addEventListener(
            "click",
            () => {

                alert(
                    "Voice contribution prototype: microphone recording would begin here."
                );

            }
        );

    }


    if (stopButton) {

        stopButton.addEventListener(
            "click",
            () => {

                alert(
                    "Recording stopped. In the production MVP, the audio would proceed to review."
                );

            }
        );

    }


    /* =====================================================
       ARCHITECTURE HOVER
    ====================================================== */

    const architectureLayers =
        document.querySelectorAll(
            ".architecture-layer"
        );


    architectureLayers.forEach(
        (layer) => {

            layer.addEventListener(
                "mouseenter",
                () => {

                    architectureLayers.forEach(
                        (other) => {

                            other.classList.remove(
                                "active"
                            );

                        }
                    );

                    layer.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    /* =====================================================
       FLYWHEEL ROTATION
    ====================================================== */

    const flywheel =
        document.querySelector(
            ".flywheel-ring"
        );


    if (flywheel) {

        let rotation = 0;

        let lastTime = null;


        function animateFlywheel(time) {

            if (!lastTime) {
                lastTime = time;
            }

            const delta =
                time - lastTime;

            lastTime = time;

            rotation +=
                delta * 0.0025;

            flywheel.style.transform =
                `rotate(${rotation}deg)`;

            requestAnimationFrame(
                animateFlywheel
            );

        }


        requestAnimationFrame(
            animateFlywheel
        );

    }


    /* =====================================================
       COUNTER SYSTEM
    ====================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    function animateCounter(element) {

        const target =
            Number(
                element.dataset.counter
            );

        let current = 0;

        const duration =
            1400;

        const start =
            performance.now();


        function update(time) {

            const progress =
                Math.min(
                    (time - start) /
                    duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            current =
                Math.floor(
                    eased * target
                );


            element.textContent =
                current.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            }

        }


        requestAnimationFrame(
            update
        );

    }


    const counterObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );

                            counterObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            }
        );


    counters.forEach(
        (counter) => {

            counterObserver.observe(
                counter
            );

        }
    );


    /* =====================================================
       APP HORIZONTAL DRAG
    ====================================================== */

    const phoneShowcase =
        document.querySelector(
            ".phone-showcase"
        );


    if (phoneShowcase) {

        let isDown = false;

        let startX;

        let scrollLeft;


        phoneShowcase.addEventListener(
            "mousedown",
            (event) => {

                isDown = true;

                phoneShowcase.style.cursor =
                    "grabbing";

                startX =
                    event.pageX -
                    phoneShowcase.offsetLeft;

                scrollLeft =
                    phoneShowcase.scrollLeft;

            }
        );


        phoneShowcase.addEventListener(
            "mouseleave",
            () => {

                isDown = false;

                phoneShowcase.style.cursor =
                    "";

            }
        );


        phoneShowcase.addEventListener(
            "mouseup",
            () => {

                isDown = false;

                phoneShowcase.style.cursor =
                    "";

            }
        );


        phoneShowcase.addEventListener(
            "mousemove",
            (event) => {

                if (!isDown) {
                    return;
                }

                event.preventDefault();

                const x =
                    event.pageX -
                    phoneShowcase.offsetLeft;

                const walk =
                    (x - startX) * 1.5;

                phoneShowcase.scrollLeft =
                    scrollLeft - walk;

            }
        );

    }


    /* =====================================================
       ACTIVE SECTION DETECTION
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            document.body
                                .dataset.section =
                                entry.target.id;

                        }

                    }
                );

            },

            {
                threshold: 0.3
            }

        );


    sections.forEach(
        (section) => {

            sectionObserver.observe(
                section
            );

        }
    );


    /* =====================================================
       REDUCE MOTION SUPPORT
    ====================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        prefersReducedMotion.matches
    ) {

        document
            .querySelectorAll(
                "*"
            )
            .forEach(
                (element) => {

                    element.style.animationDuration =
                        "0.001ms";

                    element.style.animationIterationCount =
                        "1";

                    element.style.scrollBehavior =
                        "auto";

                }
            );

    }


});


  
