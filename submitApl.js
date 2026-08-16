// Управление основной модалкой
function openLeadModal() {
    const modal = document.getElementById('sasLeadModalOverlay');
    if (!modal) return;
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('sas-lead-active');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeLeadModal() {
    const modal = document.getElementById('sasLeadModalOverlay');
    if (!modal) return;
    modal.classList.remove('sas-lead-active');
    setTimeout(() => {
        modal.style.display = 'none';
        const statusModal = document.getElementById('sasStatusModalOverlay');
        if (!statusModal || !statusModal.classList.contains('sas-lead-active')) {
            document.body.style.overflow = '';
        }
    }, 300);
}

// Управление модалкой статуса (Успех / Ошибка / Сеть)
function openStatusModal(type, title, desc) {
    const modal = document.getElementById('sasStatusModalOverlay');
    if (!modal) {
        alert(`${title}\n${desc}`);
        return;
    }

    const iconSuccess = document.getElementById('statusIconSuccess');
    const iconError = document.getElementById('statusIconError');
    const iconNetwork = document.getElementById('statusIconNetwork');
    const titleEl = document.getElementById('statusTitle');
    const descEl = document.getElementById('statusDesc');

    if (iconSuccess) iconSuccess.style.display = 'none';
    if (iconError) iconError.style.display = 'none';
    if (iconNetwork) iconNetwork.style.display = 'none';

    if (type === 'success' && iconSuccess) iconSuccess.style.display = 'block';
    if (type === 'error' && iconError) iconError.style.display = 'block';
    if (type === 'network' && iconNetwork) iconNetwork.style.display = 'block';

    if (titleEl) titleEl.innerText = title;
    if (descEl) descEl.innerText = desc;

    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('sas-lead-active');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeStatusModal() {
    const modal = document.getElementById('sasStatusModalOverlay');
    if (!modal) return;
    modal.classList.remove('sas-lead-active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Закрытие по клику на оверлей и ESC
window.addEventListener('click', function(e) {
    const leadModal = document.getElementById('sasLeadModalOverlay');
    const statusModal = document.getElementById('sasStatusModalOverlay');
    if (e.target === leadModal) closeLeadModal();
    if (e.target === statusModal) closeStatusModal();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLeadModal();
        closeStatusModal();
    }
});

// Отправка формы
function initForm() {
    const form = document.getElementById('sasLeadForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Блокируем стандартную отправку

        const submitBtn = document.getElementById('sasLeadSubmitBtn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
        }

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);

        // Добавляем системные метки для нашего Flask API
        object.idSites = "disite_studio"; // Идентификатор твоего сайта
        object.access_key = "direct_web_form";

        fetch('https://api.kodariumlabs.space/lead', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(object)
        })
        .then(async (response) => {
            const data = await response.json().catch(() => ({}));
            closeLeadModal();

            setTimeout(() => {
                if (response.ok && data.status === 'ok') {
                    form.reset();
                    openStatusModal(
                        'success', 
                        'Заявка успешно отправлена!', 
                        'Спасибо! Мы свяжемся с вами в ближайшее время.'
                    );
                } else {
                    openStatusModal(
                        'error', 
                        'Ошибка отправки', 
                        data.message || 'Не удалось отправить форму. Попробуйте позже.'
                    );
                }
            }, 300);
        })
        .catch(() => {
            closeLeadModal();
            setTimeout(() => {
                openStatusModal(
                    'network', 
                    'Сбой сети', 
                    'Проверьте подключение к интернету и повторите попытку.'
                );
            }, 300);
        })
        .finally(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
} else {
    initForm();
}