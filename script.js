const searchInput = document.getElementById('searchInput');
const cardsContainer = document.getElementById('cardsContainer');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query.length > 1) {
    fetchCharacters(query);
  } else {
    cardsContainer.innerHTML = '';
  }
});

async function fetchCharacters(name) {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
    const data = await res.json();

    if (data.results) {
      renderCards(data.results);
    } else {
      cardsContainer.innerHTML = '<p>Nenhum personagem encontrado.</p>';
    }
  } catch (err) {
    cardsContainer.innerHTML = '<p>Erro ao buscar personagens.</p>';
    console.error(err);
  }
}

function renderCards(characters) {
  cardsContainer.innerHTML = '';

  characters.forEach(char => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${char.image}" alt="${char.name}">
      <div class="card-content">
        <h2>${char.name}</h2>
        <p><strong>Espécie:</strong> ${char.species}</p>
        <p><strong>Gênero:</strong> ${char.gender}</p>
        <p><strong>Status:</strong> ${char.status}</p>
        <p><strong>Dimensão:</strong> ${char.location?.name || 'Desconhecida'}</p>
      </div>
    `;

    cardsContainer.appendChild(card);
  });
}
