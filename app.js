let list = [];

while (false) {
  let line = prompt('What would you like to do?');
  if (line === 'quit' || line === 'q') {
    break;
  } else if (line === 'list') {
    console.log('********************************');
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        console.log(`${i} : ${list[i]}`);
      }
    } else {
      console.log('Enpty List');
    }
    console.log('********************************');
  } else if (line === 'new') {
    let newList = prompt('type a new list');
    list.push(newList);
    console.log('added list :' + newList);
  } else if (line === 'delete') {
    let deleteNum = parseInt(prompt('type a delete list Number'));
    if (!Number.isNaN(deleteNum)) {
      const deleted = list.splice(deleteNum, 1);
      console.log('deleted list :' + deleteNum);
    }
  }
}

// pokemon list
const BaseURL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

const battle = document.querySelector('.battle');
for (let i = 1; i <= 151; i++) {
  const pokemonList = document.createElement('div');
  pokemonList.className = 'pokemonList';
  const img = document.createElement('img');
  img.src = `${BaseURL}${i}.png`;
  const span = document.createElement('span');
  span.innerHTML = `${i}`;
  pokemonList.appendChild(img);
  pokemonList.appendChild(span);
  document.querySelector('.container').appendChild(pokemonList);

  pokemonList.addEventListener('click', function () {
    if (battle.children.length < 2) {
      document.querySelector('.battle').appendChild(this);
    }
  });
}
const p1 = {
  score: 0,
  button: document.querySelector('.player1btn'),
  display: document.querySelector('.score1'),
};
const p2 = {
  score: 0,
  button: document.querySelector('.player2btn'),
  display: document.querySelector('.score2'),
};
const resetBtn = document.querySelector('.resetBtn');
const select = document.querySelector('select');
let winningScore = 3;
let isGameOver = false;

function updateScores(player, opponent) {
  if (!isGameOver) {
    player.score += 1;
    if (player.score === winningScore) {
      isGameOver = true;
      player.display.classList.add('winner');
      opponent.display.classList.add('loser');
      player.button.disabled = true;
      opponent.button.disabled = true;
    }
    player.display.textContent = player.score;
  }
}

p1.button.addEventListener('click', function () {
  updateScores(p1, p2);
});
p2.button.addEventListener('click', function () {
  updateScores(p2, p1);
});

select.addEventListener('change', function () {
  winningScore = parseInt(this.value);
  reset();
});

resetBtn.addEventListener('click', reset);

function reset() {
  isGameOver = false;
  for (let p of [p1, p2]) {
    p.score = 0;
    p.display.textContent = 0;
    p.display.classList.remove('winner', 'loser');
    p.button.disabled = false;
  }
}

// 비동기 실행 promiss
const delayColorChange = (color, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = color;
      resolve();
    }, delay);
  });
};
// delayColorChange('#ffc9de', 1000)
//   .then(() => delayColorChange('#fdd97c', 1000))
//   .then(() => delayColorChange('#fbfdaa', 1000))
//   .then(() => delayColorChange('#c1f0b2', 1000))
//   .then(() => delayColorChange('#b2e4f0', 1000))
//   .then(() => delayColorChange('#d6b2f0', 1000))
//   .then(() => delayColorChange('white', 1000));

// async / await 사용

async function asyncDelay() {
  await delayColorChange('#ffc9de', 1000);
  await delayColorChange('#fdd97c', 1000);
  await delayColorChange('#fbfdaa', 1000);
  await delayColorChange('#c1f0b2', 1000);
  await delayColorChange('#b2e4f0', 1000);
  await delayColorChange('#d6b2f0', 1000);
  await delayColorChange('white', 1000);
}

// then 사용
// asyncDelay().then(() => console.log('End of asyncDelay'));

// 함수로 활용
async function printDelay() {
  await asyncDelay();
  console.log('End of asyncDelay');
}

printDelay();

// 비동기 함수의 오류 처리하기 - try/catch 문
// async function printError() {
//   try {
//     let data = await requestSomethig('/page');
//     console.log(data);
//   } catch (e) {
//     console.log('error' + e);
//   }
// }

// pokemo api 사용하기
// fetch('https://pokeapi.co/api/v2/pokemon-species/150')
//   .then(res => {
//     console.log('resolved' + res);
//     return res.json();
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(e => {
//     console.log('error', e);
//   });

// 함수로 API 불러오기
const loadPokemons = async () => {
  const baseURL = 'https://pokeapi.co/api/v2/pokemon-species/';
  try {
    for (let i = 1; i <= 151; i++) {
      const res = await fetch(`${baseURL}${i}`);
      const data = await res.json();
      console.log(data);
    }
  } catch (e) {
    console.log('error', e);
  }
};

// Axios 이용 하기
// axios
//   .get('https://pokeapi.co/api/v2/pokemon-species/150')
//   .then(response => {
//     console.log('response', response);
//   })
//   .catch(e => console.log('error', e));

// Axios 함수
const getPokemon = async id => {
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    );

    return res.data.names[2].name;
  } catch (e) {
    console.log('error', e);
  }
};

const getENPokemon = async enname => {
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${enname}`,
    );
    return res.data.id;
  } catch (e) {
    console.log('error', e);
  }
};

// Axios 를 활용한 포켓몬 이름 알려주는 함수
// 컨테이너 안에 있는 디브를 클릭하면 해당 정보를 가지고와서 이름을 보여줄 수 있게끔 구성
const containerDivs = document.querySelectorAll('.container > div');
for (let div of containerDivs) {
  div.addEventListener('click', function () {
    getPokemonName(parseInt(this.innerText));
  });
}

// 이름을 보여주는 함수 (API 사용)
const participant = document.querySelector('.participant');
const getPokemonName = async function (id) {
  const name = await getPokemon(id);
  const newString = document.createElement('span');
  newString.innerText = name + ' ';
  if (participant.children.length < 2) {
    participant.appendChild(newString);
  }
};

// 검색 기능 추가
const form = document.querySelector('#searchform');
const nameinput = document.querySelector('#nameinput');
const searchbtn = document.querySelector('#searchbtn');
const imagesContainer = document.querySelector('.imagesContainer');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  imagesContainer.innerHTML = '';
  const searchTerm = form.elements.query.value;
  const searchlist = await searchKR(searchTerm);
});

// 한글 검색 기능 추가
const searchKR = async function (krname) {
  axios
    .get('/pokemonNameMapping.json')
    .then(response => {
      const data = response.data;

      // 이름 검색
      const searchQuery = krname;
      const results = Object.keys(data)
        .filter(key => key.includes(searchQuery))
        .map(key => ({
          koreanName: key,
          englishName: data[key],
        }));
      makeImages(results);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const makeImages = async function (shows) {
  for (let show of shows) {
    const id = await getENPokemon(show.englishName);
    krname = show.koreanName;
    const img = document.createElement('img');
    img.src = `${BaseURL + id}.png`;
    const span = document.createElement('span');
    span.textContent = id + ' ' + krname;
    imagesContainer.appendChild(img);
    imagesContainer.appendChild(span);
  }
};
