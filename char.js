const id = localStorage.getItem('id');
const divInfo = document.querySelector('.personagens-info');

const api = 'https://rickandmortyapi.com/api/character/';

let episodios = [];

async function getEpisodios() {
    const response = await fetch(`${api}${id}`)
    const dados = await response.json();
    const get = dados.episode;

    for(index = 0; index < get.length; index++) {
        const element = get[index];

        const episodio = await fetch(element);
        const episodioResponse = await episodio.json();

        episodios.push({id: episodioResponse.id, air_date: episodioResponse.air_date, name: episodioResponse.name})    
    }

    return episodios;
}

async function buscarInfo () {
    const response = await fetch(`${api}${id}`)
    const dados = await response.json();

        divInfo.innerHTML = `
            <img class="img" src="${dados.image}">

            <h1 class="name">${dados.name}</h1>

            <div id="card" style="display: flex; margin-top: 20px; gap: 35px;">
                <div class="info">
                    <span class="titulo-info">Informações</span>

                    <div class="info-texto">
                        <span class="info-texto-tit">Gender</span>
                        <span>${dados.gender}</span>
                    </div>

                    <div class="info-texto">
                        <span class="info-texto-tit">Status</span>
                        <span>${dados.status}</span>
                    </div>

                    <div class="info-texto">
                        <span class="info-texto-tit">Specie</span>
                        <span>${dados.specie}</span>
                    </div>

                    <div class="info-texto">
                        <span class="info-texto-tit">Origem</span>
                        <span>${dados.origin.name}</span>
                    </div>

                    <div class="info-texto">
                        <span class="info-texto-tit">Location</span>
                        <span>${dados.location.name}</span>
                    </div>

                </div>
            </div>
        `

    episodios = await getEpisodios();

    const card = document.querySelector('#card')
    const tituloInfo2 = document.createElement('span')


    card.appendChild(tituloInfo2)

    const divInfo2 = document.createElement('div')
    divInfo2.classList.add('info2')
    divInfo2.innerHTML = '<span class="titulo-info">Episódios</span>'
    
    for (const episodio of episodios) {
        console.log(episodio)
        divInfo2.innerHTML += `
                    <div class="info-texto">
                       <span class="info-texto-tit">${episodio.id} - ${episodio.name}</span>
                        <span>${episodio.air_date}</span>
                    </div>
        `
    }

    card.appendChild(divInfo2)
}

buscarInfo()