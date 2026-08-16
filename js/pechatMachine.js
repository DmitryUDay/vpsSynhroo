document.addEventListener('DOMContentLoaded', function() {
    const textTarget = document.querySelector('#matildochka .typing-text');
    const cursorTarget = document.querySelector('#matildochka .typing-cursor');
    
    const phrases = [
        "продают лучше",
        "привлекают клиентов",
        "приносят прибыль",
        "увеличивают продажи",
        "работают эффективно",
        "вызывают доверие",
        "выделяют бизнес",
        "дают результат",
        "приводят заявки",
        "растят бизнес",
        "работают круглосуточно",
        "усиливают бренд",
        "окупают вложения",
        "решают задачи",
        "привлекают внимание",
        "конвертируют трафик",
        "впечатляют клиентов",
        "двигают вперёд",
        "работают стабильно",
        "помогают зарабатывать"
    ];

    let phraseIndex = 0; 
    let charIndex = 0;   
    let isDeleting = false; 

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        // Как только пошло движение букв — убираем анимацию, курсор просто горит линией
        if (cursorTarget) {
            cursorTarget.classList.remove('active-pause');
        }

        if (isDeleting) {
            textTarget.innerText = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textTarget.innerText = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = 100; 

        if (isDeleting) {
            typingSpeed = 50; 
        }

        let hitPause = false;

        // Слово полностью готово
        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Пауза 2 секунды
            isDeleting = true;  
            hitPause = true;    
        } 
        // Слово полностью стёрто
        else if (isDeleting && charIndex === 0) {
            isDeleting = false; 
            phraseIndex = (phraseIndex + 1) % phrases.length; 
            typingSpeed = 100; // Пауза полсекунды перед новым словом
            hitPause = true;    
        }

        // Встали на паузу — врубаем анимацию сжатия/разжатия!
        if (hitPause && cursorTarget) {
            cursorTarget.classList.add('active-pause');
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (textTarget && phrases.length > 0) {
        typeEffect();
    }
});