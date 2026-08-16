function openWizard() {
    document.getElementById('wizardModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeWizard() {
    document.getElementById('wizardModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    let modal = document.getElementById('wizardModal');
    if (event.target == modal) {
        closeWizard();
    }
}