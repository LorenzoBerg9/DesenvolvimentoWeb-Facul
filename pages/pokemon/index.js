function changePageTitle(title) {
    document.title = title;
}

function generateInfoSection(sprites, pokemonName) {
    const h2 = document.createElement('h2');
    h2.id = "info-pokemon-label";
    h2.textContent = `Informações sobre ${pokemonName}`;

    const img = document.querySelector('img');
    img.src = sprites[0];
    img.alt = `Imagem do pokemon ${pokemonName}`;

    const section = document.querySelector('#info-pokemon');
    section.innerHTML = '';

    section.appendChild(h2);
    section.appendChild(img);


    img.addEventListener('click', function () {
        const currentIndex = sprites.indexOf(img.src);
        const nextIndex = (currentIndex + 1) % sprites.length;
        img.src = sprites[nextIndex];
    });
}

async function getPokemonData(name) {
    try {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const jsonData = await data.json();

        const spritesArray = Object.values(jsonData.sprites).filter(sprite => typeof sprite === 'string');

        generateInfoSection(spritesArray, name);
    } catch (error) {
        console.error(error);
    }
}

function getSearchParams() {
    if (!location.search) {
        return;
    }

    const urlSearchParams = new URLSearchParams(location.search);


    const pokemonName = urlSearchParams.get('name');

    changePageTitle(`Página do ${pokemonName}`);
    getPokemonData(pokemonName);
}

document.addEventListener('DOMContentLoaded', function () {
    getSearchParams();
});
