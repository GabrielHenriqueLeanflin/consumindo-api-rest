const api = 'https://rickandmortyapi.com/api'
const divPersonagens = document.querySelector('.chars-container')
const barraPesquisa = document.querySelector('#name')
const carregarMais = document.querySelector('#load-more')
const filtros = {
  name: '',
  status: '',
  species: '',
  gender: '',
  page: 1,
}
const species = document.querySelector('#species')
const gender = document.querySelector('#gender')
const statusPersona = document.querySelector('#status')

async function buscarPersonagens ( { name, status, species, gender, page } ) {
  const response = await fetch(`${api}/character?name=${name}&status=${status}&species=${species}&gender=${gender}&page=${page}`)
  console.log(response)
  const dados = await response.json()
    
  return dados.results
}

async function exibirPersonagens() {
  console.log(filtros)
  const personagens = await buscarPersonagens(filtros)
  console.log(personagens)

   personagens.forEach((element) => {
    const card = document.createElement('a')
    divPersonagens.appendChild(card)
    card.setAttribute('href', '/char.html')
    card.addEventListener('click', () => {
      localStorage.setItem('id', `${element.id}`)
    })
    console.log(element.id)


    const div1 = document.createElement('div')
    div1.classList.add('char')
    card.appendChild(div1)

    const img = document.createElement('img')
    img.setAttribute('src', `${element.image}`)
    div1.appendChild(img)

    const div2 = document.createElement('div')
    div2.classList.add('char-info')
    div1.appendChild(div2)

    const h3 = document.createElement('h3')
    h3.innerHTML = `${element.name}`
    div2.appendChild(h3)

    const span = document.createElement('span')
    span.innerHTML = `${element.species}`
    div2.appendChild(span)
  })
}

exibirPersonagens();

barraPesquisa.addEventListener('keyup', (event) => {
  filtros.page = 1
  filtros.name = event.target.value
  divPersonagens.innerHTML = ''

  exibirPersonagens();
} )

carregarMais.addEventListener('click', clickCarregarMais )

function clickCarregarMais () {
  filtros.page++;
  console.log(filtros)
  exibirPersonagens();

}

species.addEventListener('change', (event) => {
  filtros.species = event.target.value
  divPersonagens.innerHTML = ''

  exibirPersonagens()
})

gender.addEventListener('change', (event) => {
  filtros.gender = event.target.value
  divPersonagens.innerHTML = ''

  exibirPersonagens()
})

statusPersona.addEventListener('change', (event) => {
  filtros.status = event.target.value
  divPersonagens.innerHTML = ''

  exibirPersonagens()
})

