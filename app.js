var searchForm = document.getElementById('search_form');
var result = document.getElementById("result");
var searchHero = document.getElementById("search_hero");
var superHeroesData = "";


// append the received array of data
function superheroesAlias(data){
    if(data.length === 10){

        superHeroesData += '<ul>';
        data.forEach(function(item){
            superHeroesData += '<li><h3 class="heroAlias text-capitalize text-bold">' + item.toLowerCase() + '</h3></li>';
        });
        superHeroesData += '</ul>';

    }else if(data.length === 1){

        superHeroesData += "<h3 class='heroAlias text-uppercase text-bold'>" +  data[0].alias.toLowerCase() + "</h3>";
        superHeroesData += "<h4 class='heroName text-uppercase text-bold'>A.K.A " +  data[0].name.toLowerCase() + "</h4>";
        superHeroesData += "<p class='heroBiography mt-2'>" +  data[0].biography + "</p>";

    }

    result.innerHTML = superHeroesData;
}


// check if data is found or not
function getSuperHeroes(data){
    console.log(typeof data);
    console.log(data.length);
    if(typeof data === "object"){
        superheroesAlias(data);
    }else{
        result.innerHTML = "<p class='text-uppercase error text-bold'>" +  data + "</p>";
    }
}

// fetching data from PHP
function fetchData(base_url){
    fetch( base_url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data.length);
        getSuperHeroes(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


// check if query string will be empty or not
function searchDataAjax(query = ''){
    var base_url = "";

    if(query === ""){
        base_url = 'superheroes.php';
        fetchData(base_url);
    }else{
        base_url = 'superheroes.php?query=' +  query;
        fetchData(base_url);
    }
}


// if input field is empty or not
function searchHeroes(event){
    event.preventDefault();
    
    superHeroesData = "";
    result.innerHTML = "";

    if(searchHero.value.length == 0 ){
        console.log("A");
        searchDataAjax() // search input is empty
    }else{
        searchDataAjax(searchHero.value) // search input is not empty
        console.log("B");
    }
}


// input form submit button
searchForm.addEventListener('submit', searchHeroes);