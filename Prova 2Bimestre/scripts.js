document.addEventListener('DOMContentLoaded', (event) => {
    const params = new URLSearchParams(window.location.search);
    const searchInput = document.getElementById('search-input');
    const filterTypeInput = document.getElementById('filter-type');
    const filterQuantitySelect = document.getElementById('filter-quantity');
    const filterFromInput = document.getElementById('filter-from');
    const filterToInput = document.getElementById('filter-to');
    const filterCount = document.getElementById('filter-count');

    if (params.has('search')) {
        searchInput.value = params.get('search');
    }
    if (params.has('type')) {
        filterTypeInput.value = params.get('type');
    }
    if (params.has('quantity')) {
        filterQuantitySelect.value = params.get('quantity');
    }
    if (params.has('from')) {
        filterFromInput.value = params.get('from');
    }
    if (params.has('to')) {
        filterToInput.value = params.get('to');
    }

    let count = 0;
    params.forEach((value, key) => {
        if (key !== 'search' && key !== 'page') {
            count++;
        }
    });
    filterCount.textContent = count;

    fetchNews(params);
});

function toggleModal() {
    const modal = document.getElementById('filter-modal');
    if (modal.open) {
        modal.close();
    } else {
        modal.showModal();
    }
}

function applyFilters() {
    const params = new URLSearchParams(window.location.search);
    const form = document.getElementById('filter-form');
    const formData = new FormData(form);

    formData.forEach((value, key) => {
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
    });

    window.location.search = params.toString();
}

async function fetchNews(params) {
    const baseUrl = 'http://servicodados.ibge.gov.br/api/v3/noticias';
    params.set('qtd', params.get('quantity') || 10);

    const url = `${baseUrl}?${params.toString()}`;
    console.log('Fetching news from URL:', url); // Log da URL

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched news data:', data); // Log dos dados recebidos
        displayNews(data.items);
        displayPagination(data.totalPages, parseInt(params.get('page')) || 1);
    } catch (error) {
        console.error('Erro ao buscar notícias:', error);
    }
}

function displayNews(news) {
    const newsContainer = document.getElementById('news-list');
    newsContainer.innerHTML = '';

    if (!news || news.length === 0) {
        newsContainer.innerHTML = '<p>Nenhuma notícia encontrada.</p>';
        return;
    }

    news.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('news-item');

        const title = document.createElement('h2');
        title.textContent = item.titulo;

        const summary = document.createElement('p');
        summary.textContent = item.introducao;

        const editorias = document.createElement('p');
        editorias.textContent = `Editorias: ${item.editorias.split('|').map(editoria => `#${editoria}`).join(', ')}`;

        const dateInfo = document.createElement('p');
        dateInfo.textContent = item.data_publicacao ? formatTimeAgo(item.data_publicacao) : 'Data não disponível';

        const content = document.createElement('div');
        content.classList.add('news-item-content');
        content.appendChild(title);
        content.appendChild(summary);
        content.appendChild(editorias);
        content.appendChild(dateInfo);

        if (item.imagens) {
            const images = JSON.parse(item.imagens);
            const imgURL = `https://agenciadenoticias.ibge.gov.br/${images.image_intro}`;
            const img = document.createElement('img');
            img.src = imgURL;
            listItem.appendChild(img);
        }

        listItem.appendChild(content);

        const readMoreButton = document.createElement('button');
        readMoreButton.textContent = 'Leia Mais';
        readMoreButton.onclick = () => {
            window.open(`https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/${item.id}.html`, '_blank');
        };
        content.appendChild(readMoreButton);

        newsContainer.appendChild(listItem);
    });
}

function displayPagination(totalPages, currentPage) {
    const pagination = document.getElementById('pagination');
    if (!pagination) {
        console.error('Elemento de paginação não encontrado.');
        return;
    }

    pagination.innerHTML = '';

    currentPage = parseInt(currentPage, 10);
    totalPages = parseInt(totalPages, 10);

    if (isNaN(totalPages) || totalPages <= 1) {
        return;
    }

    const maxButtons = 10;
    const half = Math.floor(maxButtons / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
        start = 1;
        end = Math.min(maxButtons, totalPages);
    } else if (end > totalPages) {
        end = totalPages;
        start = Math.max(1, totalPages - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            const params = new URLSearchParams(window.location.search);
            params.set('page', i);
            window.location.search = params.toString();
        };

        if (i === currentPage) {
            li.classList.add('active');
        }

        li.appendChild(button);
        pagination.appendChild(li);
    }
}

function formatTimeAgo(publishedDateStr) {
    if (!publishedDateStr) {
        return 'Data de publicação não disponível';
    }

    const [datePart, timePart] = publishedDateStr.split(' ');
    if (!datePart || !timePart) {
        return 'Data de publicação não disponível';
    }

    const [day, month, year] = datePart.split('/').map(part => parseInt(part, 10));
    const [hour, minute, second] = timePart.split(':').map(part => parseInt(part, 10));

    const publishedDate = new Date(year, month - 1, day, hour, minute, second);
    const currentDate = new Date();
    const timeDiff = currentDate - publishedDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (isNaN(daysDiff)) {
        return 'Data de publicação inválida';
    }

    if (daysDiff === 0) {
        return 'Publicado hoje';
    } else if (daysDiff === 1) {
        return 'Publicado ontem';
    } else {
        return `Publicado há ${daysDiff} dias`;
    }
}