let isOpen = false;

function openContactSphere() {
    if (isOpen) return;

    const modal = document.getElementById('contactSphere');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    isOpen = true;
}

function closeContactSphere() {
    if (!isOpen) return;
    const modal = document.getElementById('contactSphere');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    isOpen = false;
}


document.getElementById('clClosee').addEventListener('click', function() {
    closeContactSphere();
});


document.addEventListener('DOMContentLoaded', function() {

  document.querySelector('.connectTrigger').addEventListener('click', function(e) {
    e.preventDefault();
    openContactSphere();
  });


  document.querySelector('.crystalOverlay').addEventListener('click', closeContactSphere);


  document.querySelector('.aquaDialog').addEventListener('click', function(e) {
    e.stopPropagation();
  });


  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) {
      closeContactSphere();
    }
  });

  document.querySelectorAll('.rippleOption:not(.rippleDisabled)').forEach(link => {
    link.addEventListener('click', function() {
      if (this.href && !this.href.includes('#')) {
        setTimeout(closeContactSphere, 100);
      }
    });
  });
});

function lambdaOpen(){
    closeModal();
    openContactSphere();
    return false;
}