document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".logo-slider");
    const track = document.querySelector(".slide-track");
    let isDragging = false;
    let startX, startTouchX;
    let scrollLeft;
    let autoScrollInterval;

    // Fonction pour le défilement automatique
    function autoScroll() {
        track.scrollLeft += 1; // Ajustez la vitesse
        if (track.scrollLeft >= track.scrollWidth - track.clientWidth) {
            track.scrollLeft = 0; // Réinitialisation à la position de départ
        }
    }

    // Démarrer l'auto-scroll
    function startAutoScroll() {
        if (!autoScrollInterval) {
            autoScrollInterval = setInterval(autoScroll, 20); // Ajustez la vitesse ici
        }
    }

    // Arrêter l'auto-scroll
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }

    // Début d'interaction (souris ou tactile)
    function startDragging(e) {
        isDragging = true;
        stopAutoScroll(); // Pause l'auto-scroll

        if (e.type === "mousedown") {
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        } else if (e.type === "touchstart") {
            startTouchX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        }
    }

    // Mouvement (souris ou tactile)
    function drag(e) {
        if (!isDragging) return;

        let x;
        if (e.type === "mousemove") {
            x = e.pageX - slider.offsetLeft;
        } else if (e.type === "touchmove") {
            x = e.touches[0].pageX - slider.offsetLeft;
        }

        const walk = (x - (startX || startTouchX)) * 2; // Ajustez la sensibilité
        slider.scrollLeft = scrollLeft - walk;
    }

    // Fin d'interaction (souris ou tactile)
    function stopDragging() {
        isDragging = false;
        startAutoScroll(); // Reprend l'auto-scroll
    }

    // Événements pour souris
    slider.addEventListener("mousedown", startDragging);
    slider.addEventListener("mousemove", drag);
    slider.addEventListener("mouseup", stopDragging);
    slider.addEventListener("mouseleave", stopDragging);

    // Événements pour tactile
    slider.addEventListener("touchstart", startDragging);
    slider.addEventListener("touchmove", drag);
    slider.addEventListener("touchend", stopDragging);

    // Duplication dynamique des logos pour l'effet infini
    const partners = document.querySelectorAll(".partners-container");
    partners.forEach((partner) => {
        const clone = partner.cloneNode(true);
        track.appendChild(clone);
    });

    // Démarrer l'auto-scroll au chargement
    startAutoScroll();
});



