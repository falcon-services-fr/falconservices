document.addEventListener('DOMContentLoaded', () => {
    const typewriter = document.querySelector('.cd-words-wrapper.typewriter');
    const textArray = typewriter.getAttribute('data-text').split(',');
    const colors = [
        '#white'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let colorIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textArray[textIndex];
        const currentColor = colors[colorIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        // Met à jour le texte affiché
        typewriter.textContent = currentText.substring(0, charIndex);
        typewriter.style.color = currentColor;

        // Ajoute le curseur juste après le texte
        typewriter.innerHTML += `<span class="cursor">|</span>`;

        // Vérifie si le mot est fini d'écrire ou d'effacer
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true; // Commence à effacer
            setTimeout(type, 1000); // Pause avant effacement
            return;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false; // Passe au mot suivant
            textIndex = (textIndex + 1) % textArray.length;
            colorIndex = (colorIndex + 1) % colors.length;
        }

        // Relance la fonction avec un délai adapté
        setTimeout(type, isDeleting ? 100 : 200);
    }

    type();
});
