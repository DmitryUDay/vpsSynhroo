document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('sasServiceModal');
    const rows = document.querySelectorAll('.sas-info-row');
    const closeBtn = document.querySelector('.sas-close');

    // Функция для красивого закрытия окна
    function closeModal() {
        modal.classList.remove('active');
        
        // Ждем 400 миллисекунд (время нашей анимации в CSS), пока окно сожмется,
        // и только потом полностью убираем его из видимости
        setTimeout(() => {
            // Проверяем, что за это время юзер не передумал и снова не открыл окно
            if (!modal.classList.contains('active')) {
                modal.style.display = "none";
            }
        }, 400); // 400мс — должно совпадать с временем animation в CSS (0.4s)
    }

    rows.forEach(row => {
        row.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const desc = this.getAttribute('data-desc');
            const img = this.getAttribute('data-img');
            const plans = this.getAttribute('data-plans').split(',');

            document.getElementById('sasModalTitle').innerText = title;
            document.getElementById('sasModalDesc').innerText = desc;
            document.getElementById('sasModalImg').src = img;

            // Сначала включаем display, чтобы браузер подготовил элемент к рендерингу
            modal.style.display = "block";
            
            // Микротаймаут или просто добавление класса, чтобы браузер успел 
            // просчитать смену display и запустил CSS-анимацию расширения
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });

    // Юзаем нашу функцию плавного закрытия везде
    closeBtn.onclick = () => closeModal();
    
    window.onclick = (event) => {
        if (event.target == modal) {
            closeModal();
        }
    }
});