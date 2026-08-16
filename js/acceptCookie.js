function acceptPrivacy() {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1); // Срок 1 год согласно политике
    localStorage.setItem('kodarium_consent', 'true');
    localStorage.setItem('kodarium_consent_expiry', expiryDate.getTime());
    document.getElementById('privacy-banner').style.display = 'none';
}

window.onload = function() {
    const consent = localStorage.getItem('kodarium_consent');
    const expiry = localStorage.getItem('kodarium_consent_expiry');
    const now = new Date().getTime();

    if (!consent || (expiry && now > parseInt(expiry))) {
        document.getElementById('privacy-banner').style.display = 'block';
    }
};