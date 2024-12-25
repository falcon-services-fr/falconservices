document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.number');
    const speed = 200; // Plus c'est bas, plus c'est lent

    const observerOptions = {
        root: null, // Par rapport à la fenêtre d'affichage
        threshold: 0.5 // Au moins 50% visible pour déclencher
    };

    const startCounter = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 120);
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