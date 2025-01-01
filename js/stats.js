document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.number');
    
    // Vitesses personnalisées pour chaque compteur
    const speeds = {
        'slow-count': 100, // Vitesse lente
        'fast-count': 40  // Vitesse rapide pour la dernière section
    };

    const observerOptions = {
        root: null, // Par rapport à la fenêtre d'affichage
        threshold: 0.5 // Au moins 50% visible pour déclencher
    };

    const startCounter = (counter) => {
        const className = counter.classList.contains('fast-count') ? 'fast-count' : 'slow-count';
        const speed = speeds[className];

        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, className === 'fast-count' ? 30 : 60); // Délai ajusté
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                counter.innerText = '0'; // Réinitialise le compteur
                startCounter(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
});
