document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".logo-slider");
    const track = document.querySelector(".slide-track");
    let isDragging = false;
    let startX;
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

    // Gestion du glissement manuel
    slider.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        stopAutoScroll(); // Pause l'auto-scroll
    });

    slider.addEventListener("mouseup", () => {
        isDragging = false; // Arrête le glissement
        startAutoScroll(); // Reprend l'auto-scroll
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDragging) return; // Ne défile que si le bouton est enfoncé
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Ajustez la sensibilité
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener("mouseleave", () => {
        isDragging = false; // Assure que le glissement s'arrête si on quitte le slider
        startAutoScroll(); // Reprend l'auto-scroll
    });

    // Duplication dynamique des logos pour l'effet infini
    const partners = document.querySelectorAll(".partners-container");
    partners.forEach((partner) => {
        const clone = partner.cloneNode(true);
        track.appendChild(clone);
    });

    // Démarrer l'auto-scroll au chargement
    startAutoScroll();
});
