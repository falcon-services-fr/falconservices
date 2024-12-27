document.addEventListener("DOMContentLoaded", () => {
    const slideTrack = document.querySelector(".slide-track");
    const partners = document.querySelectorAll(".partners-container");

    // Clone the partners to make the scroll seamless
    partners.forEach((partner) => {
        const clone = partner.cloneNode(true);
        slideTrack.appendChild(clone);
    });
});
