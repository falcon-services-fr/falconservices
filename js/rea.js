document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.left-image').classList.add('animate-in');
                entry.target.querySelector('.right-image').classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.3
    });

    const section = document.querySelector('.realisation-header');
    observer.observe(section);
});