// Путь к твоему файлу JSON
const JSON_URL = 'blog.json';

// 1. Функция-шаблонизатор для генерации HTML одной карточки
function createCardHtml(article) {
    // Формируем ссылку на mrBuilder. Передаем ID статьи как query-параметр.
    // Если на бэке нужен другой формат (например, mrbuilder/html/${article.id}), просто перепиши эту строку.
    const mrBuilderLink = `mrBuilder.html?id=${article.id}`;

    return `
        <div class="cardPloditor">
            <img src="${article.preview}" alt="${article.title}">
            <div class="contentBlock">
                <div class="headContent">
                    <b><p class="sitee">${article.category}</p></b>
                    <p>${article.date}</p>
                </div>
                <div class="marganec"></div>
                <h2>${article.title}</h2>
                <div class="marganec"></div>
                <p class="opiskanie">${article.miniOpiska}</p>
                <div class="marganecDopDop"></div>
                <div class="footerContent">
                    <div class="iconAndContent">
                        <img src="mamka/icons/timeReadBlog.webp" alt="">
                        <p>${article.timeRead}</p>
                    </div>
                    <a href="${mrBuilderLink}">Читать статью -></a>
                </div>
            </div>
        </div>
    `;
}

// 2. Асинхронная функция для загрузки данных и их рендеринга
async function initBlog() {
    const container = document.getElementById('cards-container');
    if (!container) return;

    try {
        // Стучимся к файлу JSON
        const response = await fetch(JSON_URL);
        
        // Если файл не нашелся или сервер выдал ошибку — выходим
        if (!response.ok) {
            throw new Error(`Не удалось загрузить JSON. Статус: ${response.status}`);
        }

        // Парсим полученные данные в массив объектов
        const blogData = await response.json();

        // Проверяем, что нам пришел массив и он не пустой
        if (Array.isArray(blogData) && blogData.length > 0) {
            // Генерируем массив строк HTML и склеиваем их в один кусок
            const allCardsHtml = blogData.map(article => createCardHtml(article)).join('');
            
            // Закидываем готовый HTML в контейнер на странице
            container.innerHTML = allCardsHtml;
        } else {
            container.innerHTML = '<p>Статей пока нет, но они скоро появятся!</p>';
        }

    } catch (error) {
        // Если что-то пошло не так (нет сети, ошибка в JSON), пишем в консоль, чтобы не гадать
        console.error('Ошибка плодитора карточек:', error);
        container.innerHTML = '<p>Не удалось загрузить блог. Попробуйте позже.</p>';
    }
}

// Запускаем всю магию после загрузки страницы
document.addEventListener('DOMContentLoaded', initBlog);