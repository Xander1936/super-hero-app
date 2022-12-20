//url: https://superheroapi.com/api/access-token
//Access Token: 5869460283110025 
//So https://superheroapi.com/api/5869460283110025

//Setup the api url with the token
const SUPERHERO_TOKEN = 5869460283110025

//Don't forget to add .php for this specific  superhero api
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

//Setup the Button to get the Hero image
const newHeroButton = document.getElementById('newHeroButton')
//Setup the hero image div
const heroImageDiv = document.getElementById('heroImage')
//Setup the Search Button
const searchButton = document.getElementById('searchButton')
//Setup the Search Input
const searchInput = document.getElementById('searchInput')

// Get a Super Hero function 
const getSuperHero = (id,name) => {
    // name 👉 base_url/search/batman
    // json.results[0].image.url
    // id: 👉 base_url/id
    // json.image.url
    //Asynchronous programming; get the super hero by the id.
    fetch(`${BASE_URL}/${id}`)
    //Promises: Get the response from the api 
    .then(response => response.json())
    //Grab the hero image div and attach the image dynamically from the api
    .then(json => {
        console.log(json.powerstats)
        //Pass the superHero
        const superHero = json
        showHeroInfo(superHero)
        
    })        
}

const statToEmoji = {
    intelligence: '🧠',
    strength: '🤼‍♂️',
    speed: '🏃‍♂️',
    durability: '🔋',
    power: '💪',
    combat: '🔫'
}

const showHeroInfo = (character) => {
    const name = `<h2>${character.name}</h2>`

    const img = `<img src="${character.image.url}" height=200 width=200 />`

    //Grab the property powerstats from the api with the Object.keys method
    const stats = Object.keys(character.powerstats).map(stat => {
        //Pass the name of the key stat of powerstats; toUpperCase() capitalizing the whole string
        return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p> `
    }).join('')
    
    heroImageDiv.innerHTML = `${name}${img}${stats}`
    return stats.join('')
}

const getSearchSuperHero = (name) => {
    console.log(searchInput.value)
    fetch(`${BASE_URL}/search/${name}`)
    //Promises: Get the response from the api 
    .then(response => response.json())
    //Grab the hero infos and attach them dynamically from the api
    .then(json => {
        // Get the superHero: the second result in the list hero name of the api;
        //json.results[0] first result and json.results[1] second result
        const hero = json.results[0]
        showHeroInfo(hero)
        
    })       
}

//The random Hero function to get the 731 super heroes randomly from the api.
const randomHero = () => {
    const numberOfHeroes = 731
    return Math.floor(Math.random()*numberOfHeroes) + 1

}

//console.log(getSuperHero(randomHero()))
//New Hero Button to get a Super Hero randomly by clicking 
newHeroButton.onclick = () => getSuperHero(randomHero())
//
searchButton.onclick = () => getSearchSuperHero(searchInput.value)






//<></>