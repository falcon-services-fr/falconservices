// Fonction pour vérifier si un élément est dans le viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight && rect.bottom >= 0
    );
}

// Ajouter la classe visible lorsque l'élément entre dans le viewport
function handleScroll() {
    const elements = document.querySelectorAll('.advanced-fade-in');
    elements.forEach(el => {
        if (isInViewport(el)) {
            el.classList.add('visible');
        }
    });
}



// Écoute des événements de scroll et de chargement
document.addEventListener('scroll', handleScroll);
document.addEventListener('DOMContentLoaded', handleScroll);
