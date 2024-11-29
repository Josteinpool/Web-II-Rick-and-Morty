const content = document.getElementById('content');

async function loadCategory(category) {
    const url = `https://rickandmortyapi.com/api/${category}`;
    content.innerHTML = `
        <div class="d-flex justify-content-center my-4">
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        content.innerHTML = `
            <div class="row">
                ${data.results.map(item => generateCard(item, category)).join('')}
            </div>`;
    } catch (error) {
        console.error('Error fetching data:', error);
        content.innerHTML = `<p class="text-danger text-center">Failed to load ${category}. Please try again later.</p>`;
    }
}

function generateCard(item, category) {
    if (category === 'character') {
        return `
            <div class="col-md-4 mb-4">
                <div class="card bg-dark text-light border border-success">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                    </div>
                </div>
            </div>`;
    } else if (category === 'location') {
        return `
            <div class="col-md-4 mb-4">
                <div class="card bg-dark text-light border border-success">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">Tipo: ${item.type}</p>
                        <p class="card-text">Dimension: ${item.dimension}</p>
                    </div>
                </div>
            </div>`;
    } else if (category === 'episode') {
        return `
            <div class="col-md-4 mb-4">
                <div class="card bg-dark text-light border border-success">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">Episodio: ${item.episode}</p>
                        <p class="card-text">Fecha de publicación: ${item.air_date}</p>
                    </div>
                </div>
            </div>`;
    }
}
