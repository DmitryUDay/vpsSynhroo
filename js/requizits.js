    // ============================================================
// Модальное окно реквизитов (полная копия стиля sas-модалки)
// ============================================================
(function() {
    const modal = document.getElementById('rekvizityModal');
    const closeBtn = document.getElementById('rekvizityClose');

    // Функция плавного закрытия
    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        setTimeout(() => {
            if (!modal.classList.contains('active')) {
                modal.style.display = "none";
            }
        }, 400);
    }

    // Функция открытия (вызывайте из любого места)
    window.openRekvizityModal = function() {
        if (!modal) return;
        modal.style.display = "block";
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    };

    // Закрытие по крестику
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    // Закрытие по клику на оверлей
    if (modal) {
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        };
    }

    // Закрытие по кнопке внутри модалки
    const innerButton = modal ? modal.querySelector('button') : null;
    if (innerButton) {
        innerButton.onclick = closeModal;
    }

    // Делаем функцию доступной глобально
    window.closeRekvizityModal = closeModal;

})();