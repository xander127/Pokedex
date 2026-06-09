
//IV LISTA POKEMON
const listaPokemon = document.querySelector("#listaPokemon");

//DIV MODAL
const modal = document.querySelector("#modal");
const detallePokemon = document.querySelector("#detalle-pokemon");
const cerrarModal = document.querySelector("#cerrar-modal");

const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }


    const card = document.createElement("div");
    card.classList.add("pokemon");
    card.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(card);

    //modal con los detalles mas especificos del pokemon al hacer click en la card  
    card.addEventListener("click", () => {

        detallePokemon.innerHTML = `
        <h2>${poke.name.toUpperCase()}</h2>

        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">

        <h3>Detalles:</h3>
        <p>N°: #${pokeId}</p>
        <p>Altura: ${poke.height}</p>
        <p>Peso: ${poke.weight}</p>
        <p>Experiencia Base: ${poke.base_experience}</p>

        <h3>Tipos</h3>
        <div class="pokemon-tipos">
            ${tipos}
        </div>

        <h3>Habilidades</h3>
        <ul>
            ${poke.abilities
                .map(a => `<li>${a.ability.name}</li>`)
                .join("")}
        </ul>
    `;

        modal.style.display = "flex";
    });


}

cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))

