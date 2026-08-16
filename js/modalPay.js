document.addEventListener('DOMContentLoaded', () => {
    const payModal = document.getElementById('deployPayment');
    const payTrigger = document.getElementById('deployTrigger');
    const closeBtn = document.getElementById('closeDeploy');
    const cancelBtn = document.getElementById('cancelDeploy');

    if(payTrigger) {
        payTrigger.onclick = (e) => {
            e.preventDefault();
            payModal.style.display = 'flex';
        };
    }

    const closePayModal = () => { payModal.style.display = 'none'; };

    if(closeBtn) closeBtn.onclick = closePayModal;
    if(cancelBtn) cancelBtn.onclick = closePayModal;

    window.addEventListener('click', (e) => {
        if (e.target === payModal) closePayModal();
    });
});