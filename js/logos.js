document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".logo-slider");
    const track = document.querySelector(".slide-track");
    const partners = Array.from(document.querySelectorAll(".partners-container"));
  
    // Cloner les logos pour créer un effet de boucle
    partners.forEach((partner) => {
      const clone = partner.cloneNode(true);
      track.appendChild(clone);
    });
    partners.forEach((partner) => {
      const clone = partner.cloneNode(true);
      track.insertBefore(clone, track.firstChild);
    });
  
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;
  
    // Fonction pour réinitialiser le défilement si on atteint les extrémités
    function resetScroll() {
      const scrollMax = track.scrollWidth / 3; // La largeur totale divisée par 3 (clonage x2)
      if (slider.scrollLeft >= scrollMax * 2) {
        slider.scrollLeft -= scrollMax;
      } else if (slider.scrollLeft <= scrollMax) {
        slider.scrollLeft += scrollMax;
      }
    }
  
    // Gestion du drag avec la souris
    slider.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.style.cursor = "grabbing"; // Visuel pour indiquer que l'utilisateur peut glisser
    });
  
    slider.addEventListener("mouseleave", () => {
      isDragging = false;
      slider.style.cursor = "grab";
    });
  
    slider.addEventListener("mouseup", () => {
      isDragging = false;
      slider.style.cursor = "grab";
    });
  
    slider.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX); // Distance parcourue par le curseur
      slider.scrollLeft = scrollLeft - walk;
      resetScroll();
    });
  
    // Gestion du drag sur mobile
    slider.addEventListener("touchstart", (e) => {
      isDragging = true;
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
  
    slider.addEventListener("touchend", () => {
      isDragging = false;
    });
  
    slider.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX);
      slider.scrollLeft = scrollLeft - walk;
      resetScroll();
    });
  
    // Détecter les extrémités pour un défilement infini
    slider.addEventListener("scroll", resetScroll);
  
    // Initialiser le scroll au centre pour un démarrage fluide
    const initialScroll = track.scrollWidth / 3;
    slider.scrollLeft = initialScroll;
  });
  