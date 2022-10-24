const urlBase = 'https://rickandmortyapi.com/api/character';

const loadData = (urlBase, page = 1) => {
    const url = `${urlBase}?page=${page}`;
fetch(url)
  .then(respuesta => {
     return respuesta.json();
}) 
.then(respJson => {
    const info = respJson.info;
    const personajes = respJson.results;
    console.log(info);
    //validar botones
    const btnPrev = document.querySelector('#prev');
    const btnNext = document.querySelector('#next');
    if(!info.prev){
        btnPrev.classList.add('disabled');
    } else {
        btnPrev.classList.remove('disabled');
        btnPrev.setAttribute('data-id', Number(page) - 1);    
    }
    if(!info.next){
        btnNext.classList.add('disabled');
    } else {
        btnNext.classList.remove('disabled');
        btnNext.setAttribute('data-id', Number(page) + 1);    
    }
    showCharacters(personajes); 
})
}
const showCharacters = (personajes) => {
    const listaPersonajes = document.querySelector('#characters');
    //limpiar contenido
    while(listaPersonajes.firstChild){
        listaPersonajes.removeChild(listaPersonajes.firstChild);
    }
    personajes.forEach(personaje => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.classList.add('m-2');
        div.innerHTML = creaCard(personaje); 
        listaPersonajes.appendChild(div);
    })
}

const creaCard = (personaje) => {
    const html =`
      <div class="card" style="width: 18rem;">
         <img src="${personaje.image}" class="card-img-top" alt="${personaje.image}">
         <div class="card-body">
             <h5 class="card-title">${personaje.name}</h5>
             <p class="card-text">Is ${personaje.status}</p>
             <a href="#" class="btn btn-primary">Ver más</a>
            </div>
            </div>
        `;
        return html;
}

const navegacion = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('btn')){
        const id = e.target.getAttribute('data-id');
        loadData(urlBase, id);
    }
}

document.querySelector('#botones').addEventListener('click', navegacion);

loadData(urlBase);
