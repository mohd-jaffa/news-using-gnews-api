const apiKey = 'ff7e75897edfafaff5b078ebdd0c4515';

document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    if (query) {
        fetchNews(query);
    }
});

window.onload = () => {
    fetchLatestNews();
};

async function fetchLatestNews() {
    try {
        const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=us&apikey=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Failed to fetch latest news:', error);
        document.getElementById('newsContainer').innerHTML = `<p>Error loading latest news. Please try again later.</p>`;
    }
}

async function fetchNews(query) {
    try {
        const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&country=us&apikey=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Failed to fetch news:', error);
        document.getElementById('newsContainer').innerHTML = `<p>Error loading news. Please try again later.</p>`;
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';

    if (articles.length === 0) {
        newsContainer.innerHTML = `<p>No news articles found for this query.</p>`;
        return;
    }

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'col-md-4 mb-4 d-flex';
        newsItem.innerHTML = `
            <div class="card flex-fill">
                <img src="${article.image}" class="card-img-top" alt="${article.title}">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description}</p>
                    <a href="${article.url}" target="_blank" class="btn btn-primary">Read more</a>
                </div>
            </div>
        `;
        newsContainer.appendChild(newsItem);
    });
}
