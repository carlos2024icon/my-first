function searchMovies() {
    const searchInput = document.getElementById('searchInput').value;

    // Substitua 'sua_chave_api' pela sua chave de API
    const apiKey = '3f4d2f4e';
    const apiUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=3f4d2f4e`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const movies = data.results; // Supondo que sua API retorna um objeto com uma lista de resultados na chave 'results'

            const moviesContainer = document.getElementById('moviesContainer');
            moviesContainer.innerHTML = '';

            movies.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                    <h2>${movie.Title} (${movie.Year})</h2>
                    <div class="movie-details">
                        <p>Type: ${movie.Type}</p>
                        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.png'}" alt="${movie.Title} poster">
                    </div>
                `;
                moviesContainer.appendChild(movieElement);
            });

            const totalPages = Math.ceil(movies.length / 3);
            const paginationContainer = document.getElementById('pagination');
            paginationContainer.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                button.onclick = () => showPage(i);
                paginationContainer.appendChild(button);
            }

            showPage(1);
        })
        .catch(error => {
            console.error('Erro ao buscar filmes:', error);
        });
}
