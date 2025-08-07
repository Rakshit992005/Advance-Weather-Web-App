console.log("started");

const apiKey="866bcfd4de68b79405f18aba7110db91";

function getWeather(){
    const city=document.getElementById("city-input").value;
    if(!city){
        alert("Please Enter a City Name");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            if(data.cod === "404"){
                window.location.href = "404.html";
            }
            else{
                const temp = parseInt(data.main.temp);
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;
                const minTemp= data.main.temp_min;
                const maxTemp= data.main.temp_min;
                const feelsLike = data.main.feels_like;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const visibility = data.visibility / 1000;
                const pressure = data.main.pressure;
                const sunrise =data.sys.sunrise;
                const sunset =data.sys.sunset;


                document.getElementById("city").innerHTML = city.charAt(0).toUpperCase() + city.substring(1);
                document.querySelector(".description").innerHTML = description.charAt(0).toUpperCase() + description.substring(1);
                document.querySelector(".temp").innerHTML = temp +"°C";
                document.querySelector(".feels-like").innerHTML = `Feels like ${feelsLike} °C`;
                document.getElementById("min-temp").innerHTML= minTemp;
                document.getElementById("max-temp").innerHTML= maxTemp;
                document.querySelector(".weather-icon").innerHTML =  `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" ></img>`;

                document.getElementById("hum").innerHTML= humidity;
                document.getElementById("pre").innerHTML= (pressure/1000).toFixed(3);

            
            }

        });
    
}






console.log("script.js loaded");    