window.addEventListener('DOMContentLoaded', () => {
    const heroText = document.querySelector('.Blockcontent');
    const heroImg = document.querySelector('.hero-image');

    if(heroText) heroText.classList.add('animate-hero-text');
    if(heroImg) heroImg.classList.add('animate-hero-img');
});

const observerOptions = {
    threshold: 0.15 
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('cardWhat')) {
                entry.target.classList.add('animate-faq');
            }
            
            if (entry.target.classList.contains('accordion')) {
                entry.target.querySelectorAll('.accordion-item').forEach(item => {
                    item.classList.add('animate-lego');
                });
            }
            
            if (entry.target.classList.contains('cardPriceSite')) {
                entry.target.classList.add('animate-tariffs');
            }

            if (entry.target.classList.contains('rdr')) {
                entry.target.classList.add('animate-stats');
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.cardWhat, .accordion, .cardPriceSite, .rdr').forEach(el => {
    scrollObserver.observe(el);
});