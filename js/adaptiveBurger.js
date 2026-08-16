const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

burger.onclick = () => {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
};

overlay.onclick = () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
};