
// Ждем, пока прогрузится DOM, чтобы ничего не отвалилось
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Парсим URL и достаем ID статьи (например, из ?id=about-css)
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    // Если в урле вообще нет никакого id, сразу шлем нахер на 404
    if (!articleId) {
        console.error('ID статьи отсутствует в URL');
        window.location.href = "404.html";
        return;
    }

    // 2. Стучимся к твоему JSON-файлу
    // Если blog.json лежит в другой папке относительно mrBuilder.html, поправь путь (например, 'blog/blog.json')
    fetch("blog.json")
        .then(res => {
            if (!res.ok) {
                throw new Error(`Ошибка загрузки JSON: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            // Ищем статью, у которой id совпадает с тем, что мы достали из урла
            const app = data.find(a => a.id === articleId);

            // Если статья с таким ID не нашлась в базе
            if (!app) {
                window.location.href = "404.html";
                return;
            }

            // --- МАГИЯ РАСПАКОВКИ НАЧИНАЕТСЯ ТУТ ---
            console.log('Статья успешно найдена и распакована:', app);
            
            // Вот тут у тебя в переменной `app` лежит весь объект статьи.
            // Можешь вызывать свои функции билдера и пихать туда данные.
            // Например:
            // initBuilderWithData(app);
            if (app) {
                document.getElementById("category").textContent = `[${app.category}]`;
                document.getElementById("ZaglavText").textContent = app.title;
                document.getElementById("zaglav2").textContent = app.title;
                document.getElementById("timee").textContent = app.date;
                document.getElementById("datee").textContent = app.time;
                document.getElementById("timeUpdate").textContent = `${app.date} ${app.time}`;
                document.getElementById("contentishe").textContent = app.content;
                document.getElementById("nameCreator").textContent = app.author;
                document.getElementById("viewer").textContent = app.viewsFake;
                document.getElementById("minuteReader").textContent = app.timeRead;
                document.getElementById("bannerGlav").src = app.preview;



                const articleContainer = document.getElementById('contentishe');
    
                if (articleContainer) {
                    // 1. Прогоняем текст из JSON через наш парсер картинок
                    const formattedHtml = parseContentWithImages(app.content);
                    
                    // 2. Вставляем готовый HTML (текст вместе с созданными картинками) в контейнер
                    articleContainer.innerHTML = formattedHtml;
                }








                
                // document.getElementById("contents").textContent = `ABartaj || ${app.name}`; //
                // document.getElementById("IconApp").src = app.icon;//
                // document.getElementById("raiting").style.display = 'block';//
                // document.getElementById("selfDeveloop").href = app.siteDeveloper;//

                // if (app.updateText && app.updateText.trim() !== "") {
                //     updatesElement.textContent = app.updateText;
                //     mwsBlock.style.display = "block";
                // } else {
                //     mwsBlock.style.display = "none";
                // }



            }







            
        })
        .catch(err => {
            console.error('Что-то пошло по пизде при инициализации билдера:', err);
            // Если упала сеть или JSON битый, тоже можно увести на 404 или показать ошибку
            window.location.href = "404.html";
        });
});



// Функция, которая превращает [ссылки] в реальные теги <img>
function parseContentWithImages(text) {
    if (!text) return '';

    // Регулярка ищет всё, что находится внутри квадратных скобок [ ]
    // и заканчивается на расширения картинок (webp, png, jpg, jpeg)
    const regex = /\[([^\]]+\.(?:webp|png|jpg|jpeg))\]/gi;

    // Метод replace находит совпадение и заменяет его на нужный HTML
    // match — это вся строка целиком (например, "[mamka/inner-img1.webp]")
    // url — это только то, что попало в круглые скобки (например, "mamka/inner-img1.webp")
    return text.replace(regex, (match, url) => {
        return `<img src="${url}" class="imgDopping" alt="Иллюстрация">`;
    });
}