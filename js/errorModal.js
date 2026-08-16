document.addEventListener('DOMContentLoaded', function() {
    const nfLinks = document.querySelectorAll('a[id="NF"]');
    nfLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            if (this.classList.contains('clicked')) {
                showModal();
                return;
            }

            this.classList.add('clicked');

            this.style.animation = 'none';
            void this.offsetWidth;
            this.style.animation = 'nfRedden 0.4s ease forwards';

            setTimeout(() => {
                showModal();
            }, 200);
        });
    });
});

function showModal() {
    const modal = document.getElementById('nfModal');
    modal.style.display = 'flex';

    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('nfModal');
    modal.style.display = 'none';
}