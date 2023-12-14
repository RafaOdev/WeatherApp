 //Caixa principal aonde contém todo o coteúdo.
let Container = document.querySelector('.container');
// Desenho do sol
let sunMoon = document.querySelector('.sun');
// caixa de busca.
let searchBox = document.querySelector('.search-box')
let city = document.querySelector('.search-city');
let search = document.getElementById('search-btn');
//
// Saída caso a cidade não seja encontrada
let notFound = document.querySelector('.not-found-img');
let cityNotFound = document.querySelector('.city-not-found');
// 
// Saída de dados do clima da cidade.
let detailsCity = document.querySelector('.details-City')
let temperatureCity = document.querySelector('.temperature');
let max_minTemp = document.querySelector('.max-min-temp')
let max_TempCity = document.querySelector('.max-temp');
let min_TempCity = document.querySelector('.min-temp');
let climateCity = document.querySelector('.climate');
//
// Saída de dados da descrisão da cidade.
let descriptionCity = document.querySelector('.descriptions')
let humidityCity = document.querySelector('.humidty');
let windCity = document.querySelector('.wind');
// Chave Api
let apiKey = '390eb7a4872daae8cb9eb6b5aaab1f59';
// Relógio digital no canto da tela
let hourOutput = document.querySelector('.hour-text');
let minuteOutput = document.querySelector('.minute-text');
let secondOutput = document.querySelector('.second-text');   


search.addEventListener('click', async () =>{
    await ApiData();
})

city.addEventListener('keypress', async (pressEnter) => {
    if(pressEnter.key === 'Enter'){
        await ApiData();
    }
})

async function ApiData(){
    let cityName = city.value;
    if (cityName == '') return;

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`).then(response => response.json()).then(json => {

        if(json.cod == '404'){

            Container.style.height = '402px';
            notFound.style.display = 'flex';
            searchBox.style.top = '105px';
            cityNotFound.style.opacity = '1';
            detailsCity.style.opacity = '0'
            max_minTemp.style.opacity = '0';
            descriptionCity.style.opacity = '0';
            sunMoon.style.opacity = '0';
        }

        else if(json.cod == '200'){

            notFound.style.display = 'none'
            cityNotFound.style.opacity = '0';
            Container.style.height = '502px';
            searchBox.style.top = '-10px';
            detailsCity.style.opacity = '1'
            max_minTemp.style.opacity = '1';
            descriptionCity.style.opacity = '1';

            temperatureCity.innerHTML = `${parseInt(json.main.temp)}C°`;
            max_TempCity.innerHTML = `${parseInt(json.main.temp_max)}C°`;
            min_TempCity.innerHTML = `${parseInt(json.main.temp_min)}C°`;
            climateCity.innerHTML = `${json.weather[0].description}`;
            humidityCity.innerHTML = `${json.main.humidity}%`;
            windCity.innerHTML = `${parseInt(json.wind.speed)}KM/H`;

            periodDay();

            function periodDay(){
                let locationHour = new Date();
                let hour = locationHour.getHours();

                if(hour > 6) sunMoon.style.opacity = '1';
                if(hour > 19){
                    if(sunMoon.classList.contains('sun')){
                        sunMoon.classList.remove('sun');
                        sunMoon.classList.add('moon');
                    }
                }
            }
        }                    
    })

}