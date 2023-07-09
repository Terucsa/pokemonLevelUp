const buttonPokemon = document.getElementById('buttonPokemon');
const mostrarInformacion = document.getElementById('mostrarInformacion');

function apiPokemon(id) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => data);
}

async function mostrarPokemones(number) {
  const pokemones = [];
  for (let i = 1; i <= number; i++) {
    const pokemon = await apiPokemon(i);
    pokemones.push(pokemon);
  }
  return pokemones;
}

function imprimirPokemones() {
  mostrarPokemones(6)
    .then((pokemones) => {
      // Mezclar los pokemones en orden aleatorio
      const pokemonesAleatorios = shuffleArray(pokemones);

      let bodyTabla = '';
      pokemonesAleatorios.forEach((pokemon) => {
        const nombre = pokemon.name;
        const img = pokemon.sprites.front_default;

        bodyTabla += `
        <div class="card basico" >
        <img src="${img}" class="img-fluid img-thumbnail" alt="..." >
        <div class="card-body">
          <p class="card-text">${nombre}</p>
        </div>
      </div>
        `;
      });

      const tabla = `
      <div class="container-card">
            ${bodyTabla}
      </div>
         
      `;

      mostrarInformacion.innerHTML = tabla;
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

function shuffleArray(array) {
  // Copiar el array para no modificar el original
  const newArray = array.slice();

  // Mezclar el array en orden aleatorio
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}
buttonPokemon.addEventListener('click', imprimirPokemones);
