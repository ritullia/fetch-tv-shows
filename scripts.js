// Naudojam API gauti duomenis: http://api.tvmaze.com/search/shows?q=golden%20girls
// Uzduotis:
// Kiekviename objekte yra show,o show turi --- weight ---
// Patikrinti ar weight yra daugiau uz 75 ir atvaizduoti objektus su visa informacija, informacija turi buti atvaizduota kortelese, kaip nors graziai :) 
// Visas html turetu buti sukurtas su JS, stengiames korteles kurima skirstyti i atskiras funkcijas :)
// Papildomai:
// Padaryti input irasyti weight ir tada paspaudus mygtuka rusiuoti, grazinti informacija pagal irasyti weight
// Taip pat galim daryti dar select kuriame butu < daugiau, > maziau, lyg = ir t.t. ir panaudoti kartu su weight :)


let url = "http://api.tvmaze.com/search/shows?q=girls";

// const weight = 75

// console.log('comperisonOperators' + comperisonOperators)

const mainCardDiv = document.getElementById('container')
let data; 

function getDataFromApi(){
    
    fetch(url)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            data = getCard(result)
        })
        .catch((error) => console.error(error));

}

function getCard(data) {
    
    let weight = document.getElementById('weight').value
    console.log(weight)
    let comperisonOperator = document.getElementById('comperisonOperators').value

    console.log(`Irasytas svoris ${weight}`)
    
    data.forEach(item => {
        //  console.log(eval(item.show.weight + comperisonOperators + weight ));

        if(eval(item.show.weight + comperisonOperator + weight )){
            console.log(item);

            let mainDiv = document.createElement('div');
            mainDiv.classList.add('main-card');
    
            let img = document.createElement('img');
            img.classList.add('main-img');
            img.src = item.show.image.medium;
            

            let movieDiv = document.createElement('div');
            movieDiv.classList.add('main-text-div')

            let weightEl = document.createElement('h3');
            weightEl.textContent =  item.show.weight + ' ' + comperisonOperator + ' ' + weight;
            weightEl.classList.add('main-title');

            let movieGenres = document.createElement('h5');
            movieGenres.textContent =  item.show.genres;
            movieGenres.classList.add('main-text');

            let movieLanguage = document.createElement('h5');
            movieLanguage.textContent =  item.show.language;
            movieLanguage.classList.add('main-text');

            let movieRating = document.createElement('div');
            movieRating.innerHTML =  item.show.summary;
            movieRating.classList.add('text-div');

            movieDiv.append( movieGenres, movieLanguage, movieRating, weightEl)
            mainDiv.append(img, movieDiv)
            
            mainCardDiv.append(mainDiv)
        }
    });

    let separator = document.createElement('div');
    separator.style.padding = '10px';
    separator.style.backgroundColor = '#06888'
    mainCardDiv.append(separator)
};

let weightButton = document.getElementById('weightBtn');
weightButton.addEventListener('click', getDataFromApi(() => {
    console.log('Paspausta')
}))

getDataFromApi()
