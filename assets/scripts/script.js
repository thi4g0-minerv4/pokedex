const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.main__form');
const input = document.querySelector('.input__search');
const prev = document.querySelector('.btn__prev');
const next = document.querySelector('.btn__next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();

        return data;
    };

    return null
}


const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Loading..."
    pokemonImage.src = "";
    pokemonImage.alt = "";
    pokemonNumber.innerHTML = "";

    const data =  await fetchPokemon(pokemon);
    console.log(data)
    if (data === null) {
        pokemonName.innerHTML = 'Not Found :(';
        pokemonNumber.innerHTML = 'X';
        pokemonImage.src = "";
        pokemonImage.alt = "";

        return;
    };

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonImage.alt = `pokemon-${data.name}`;

    searchPokemon = data.id

    
    input.value = '';
}


form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

prev.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -= 1;

        renderPokemon(searchPokemon)
    }
});
next.addEventListener('click', () => {
    searchPokemon += 1;

    renderPokemon(searchPokemon)
});

renderPokemon('1')