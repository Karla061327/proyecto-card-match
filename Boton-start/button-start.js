
const btnStart = document.querySelector('#btn-start');
const mainCards = document.querySelectorAll('.card');
const backCarts = document.querySelectorAll('.back');

let id1 = '',  
    cartasFlipped = 0,
    numberMatch = 0,
    missingMatch = 10;

btnStart.addEventListener("click", async() => {
    
    btnStart.innerHTML = 'Loading...'
    await fetchCharacters();
    appearCards();  
    desapearStartBotton();
    loadCharactersOnCards();
    
});

//PETICION HTTP
/**
 * 
 * @returns Arreglo dato de personajes
 */
const fetchCharacters = async() => {

    const characters = await fetch('https://apisimpsons.fly.dev/api/personajes?limit=10');
    const data = await characters.json();
    return data.docs

};

 //Aparecen las cartan con START
 const appearCards = () => {
    mainCards.forEach(function(element){
        element.classList.remove('hide-cards');
    });    
};


//Desaparecer boton de start
const desapearStartBotton = () => {
    btnStart.classList.add('hide-botton');
};

//cargar datos personajes y duplicar
/**
 * 
 * @returns {Array}
 */
const loadCharacters = async () => {
    
    const data = await fetchCharacters();   
    let characters = [];  

    for (let dat of data){
        let character = {};
        character.Name = dat.Nombre;
        character.Id = dat._id;
        character.Imagen = dat.Imagen;
        characters.push(character);
        characters.push(character);
    }
    characters = _.shuffle(characters);
    return characters
};


//cargar datos en las cartas
const loadCharactersOnCards = async () => {
    let characters = await loadCharacters();

    for(cart of backCarts){
        character = characters.pop();
        cart.innerText = character.Name; 
        cart.style.backgroundImage = `url("${character.Imagen}")`; 
        cart.id = character.Id;
    }
};

  
mainCards.forEach(function (element){

    element.addEventListener('click',(event) => {
     
        if (cartasFlipped === 2) {
            cartasFlipped = 0
            return 
        }  
        cartasFlipped += 1 ;  
        element.classList.add("is-flipped"); 
        //determinar el id de uan crata ya volteada
        //let ID = event.target.id; 
            
        id2 = event.target.nextElementSibling.id;

        if (!id1) {
            id1 = event.target.nextElementSibling.id;
            return

        } else if (id1 === id2){
            numberMatch += 1;
            missingMatch -= 1;
            alert(`MATCH #${numberMatch}, MISSING ${missingMatch} MATCH`);           
            id1 = '';
            if (numberMatch === 10){
                flipAllCards()
            }
            return
           
        } else if(id1 !== id2){
            setTimeout( () => {flipCards(id1)}, 1000);
            setTimeout( () => {flipCards(id2)}, 1000);        
            return         
    }});
});

//voltea todas las cartas cuando el juego termina
/**
 * 
 */
const flipAllCards = () => {
    mainCards.forEach(function(element){
        element.classList.remove('is-flipped');
        loadCharacters();
        loadCharactersOnCards(); 
    });  
}

/**
 * 
 * @param {String} id 
 * 
 */
const flipCards = (id) => {
    mainCards.forEach(function (element) {
        cartasFlipped = 0;
        if (element.children.length >= 2) {
            Array.from(element.children).forEach((child) => {
                if (child.id){            
                    if (child.id === id) {
                        element.classList.remove('is-flipped');
                        id1 = '';
                 }};
             });
         } else {
             console.log("No second child found");
         }
    }) 
};   
