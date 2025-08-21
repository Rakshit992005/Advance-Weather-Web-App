const apiKey = "866bcfd4de68b79405f18aba7110db91";

function detailsFetching(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.cod === "404") {
                window.location.href = "404.html";
            } else {
                const city = data.name || "Unknown location";
                const temp = parseInt(data.main.temp);
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;
                const minTemp = data.main.temp_min;
                const maxTemp = data.main.temp_max;
                const feelsLike = data.main.feels_like;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const visibility = data.visibility / 1000;
                const pressure = data.main.pressure;
                const sunrise = data.sys.sunrise;
                const sunset = data.sys.sunset;
                const countryCode = data.sys.country;

                const countryToTimezone = {
                    "AF": "Asia/Kabul",
                    "AL": "Europe/Tirane",
                    "DZ": "Africa/Algiers",
                    "AS": "Pacific/Pago_Pago",
                    "AD": "Europe/Andorra",
                    "AO": "Africa/Luanda",
                    "AI": "America/Anguilla",
                    "AG": "America/Antigua",
                    "AR": "America/Argentina/Buenos_Aires",
                    "AM": "Asia/Yerevan",
                    "AW": "America/Aruba",
                    "AU": "Australia/Sydney",
                    "AT": "Europe/Vienna",
                    "AZ": "Asia/Baku",
                    "BS": "America/Nassau",
                    "BH": "Asia/Bahrain",
                    "BD": "Asia/Dhaka",
                    "BB": "America/Barbados",
                    "BY": "Europe/Minsk",
                    "BE": "Europe/Brussels",
                    "BZ": "America/Belize",
                    "BJ": "Africa/Porto-Novo",
                    "BM": "Atlantic/Bermuda",
                    "BT": "Asia/Thimphu",
                    "BO": "America/La_Paz",
                    "BA": "Europe/Sarajevo",
                    "BW": "Africa/Gaborone",
                    "BR": "America/Sao_Paulo",
                    "BN": "Asia/Brunei",
                    "BG": "Europe/Sofia",
                    "BF": "Africa/Ouagadougou",
                    "BI": "Africa/Bujumbura",
                    "KH": "Asia/Phnom_Penh",
                    "CM": "Africa/Douala",
                    "CA": "America/Toronto",
                    "CV": "Atlantic/Cape_Verde",
                    "KY": "America/Cayman",
                    "CF": "Africa/Bangui",
                    "TD": "Africa/Ndjamena",
                    "CL": "America/Santiago",
                    "CN": "Asia/Shanghai",
                    "CO": "America/Bogota",
                    "KM": "Indian/Comoro",
                    "CG": "Africa/Brazzaville",
                    "CR": "America/Costa_Rica",
                    "HR": "Europe/Zagreb",
                    "CU": "America/Havana",
                    "CY": "Asia/Nicosia",
                    "CZ": "Europe/Prague",
                    "DK": "Europe/Copenhagen",
                    "DJ": "Africa/Djibouti",
                    "DM": "America/Dominica",
                    "DO": "America/Santo_Domingo",
                    "EC": "America/Guayaquil",
                    "EG": "Africa/Cairo",
                    "SV": "America/El_Salvador",
                    "GQ": "Africa/Malabo",
                    "ER": "Africa/Asmara",
                    "EE": "Europe/Tallinn",
                    "ET": "Africa/Addis_Ababa",
                    "FJ": "Pacific/Fiji",
                    "FI": "Europe/Helsinki",
                    "FR": "Europe/Paris",
                    "GA": "Africa/Libreville",
                    "GM": "Africa/Banjul",
                    "GE": "Asia/Tbilisi",
                    "DE": "Europe/Berlin",
                    "GH": "Africa/Accra",
                    "GR": "Europe/Athens",
                    "GD": "America/Grenada",
                    "GT": "America/Guatemala",
                    "GN": "Africa/Conakry",
                    "GW": "Africa/Bissau",
                    "GY": "America/Guyana",
                    "HT": "America/Port-au-Prince",
                    "HN": "America/Tegucigalpa",
                    "HK": "Asia/Hong_Kong",
                    "HU": "Europe/Budapest",
                    "IS": "Atlantic/Reykjavik",
                    "IN": "Asia/Kolkata",
                    "ID": "Asia/Jakarta",
                    "IR": "Asia/Tehran",
                    "IQ": "Asia/Baghdad",
                    "IE": "Europe/Dublin",
                    "IL": "Asia/Jerusalem",
                    "IT": "Europe/Rome",
                    "JM": "America/Jamaica",
                    "JP": "Asia/Tokyo",
                    "JO": "Asia/Amman",
                    "KZ": "Asia/Almaty",
                    "KE": "Africa/Nairobi",
                    "KI": "Pacific/Tarawa",
                    "KR": "Asia/Seoul",
                    "KW": "Asia/Kuwait",
                    "KG": "Asia/Bishkek",
                    "LA": "Asia/Vientiane",
                    "LV": "Europe/Riga",
                    "LB": "Asia/Beirut",
                    "LS": "Africa/Maseru",
                    "LR": "Africa/Monrovia",
                    "LY": "Africa/Tripoli",
                    "LI": "Europe/Vaduz",
                    "LT": "Europe/Vilnius",
                    "LU": "Europe/Luxembourg",
                    "MO": "Asia/Macau",
                    "MG": "Indian/Antananarivo",
                    "MW": "Africa/Blantyre",
                    "MY": "Asia/Kuala_Lumpur",
                    "MV": "Indian/Maldives",
                    "ML": "Africa/Bamako",
                    "MT": "Europe/Malta",
                    "MH": "Pacific/Majuro",
                    "MR": "Africa/Nouakchott",
                    "MU": "Indian/Mauritius",
                    "MX": "America/Mexico_City",
                    "FM": "Pacific/Pohnpei",
                    "MD": "Europe/Chisinau",
                    "MC": "Europe/Monaco",
                    "MN": "Asia/Ulaanbaatar",
                    "ME": "Europe/Podgorica",
                    "MA": "Africa/Casablanca",
                    "MZ": "Africa/Maputo",
                    "MM": "Asia/Yangon",
                    "NA": "Africa/Windhoek",
                    "NP": "Asia/Kathmandu",
                    "NL": "Europe/Amsterdam",
                    "NZ": "Pacific/Auckland",
                    "NI": "America/Managua",
                    "NE": "Africa/Niamey",
                    "NG": "Africa/Lagos",
                    "NO": "Europe/Oslo",
                    "OM": "Asia/Muscat",
                    "PK": "Asia/Karachi",
                    "PW": "Pacific/Palau",
                    "PA": "America/Panama",
                    "PG": "Pacific/Port_Moresby",
                    "PY": "America/Asuncion",
                    "PE": "America/Lima",
                    "PH": "Asia/Manila",
                    "PL": "Europe/Warsaw",
                    "PT": "Europe/Lisbon",
                    "QA": "Asia/Qatar",
                    "RO": "Europe/Bucharest",
                    "RU": "Europe/Moscow",
                    "RW": "Africa/Kigali",
                    "KN": "America/St_Kitts",
                    "LC": "America/St_Lucia",
                    "VC": "America/St_Vincent",
                    "WS": "Pacific/Apia",
                    "SM": "Europe/San_Marino",
                    "ST": "Africa/Sao_Tome",
                    "SA": "Asia/Riyadh",
                    "SN": "Africa/Dakar",
                    "RS": "Europe/Belgrade",
                    "SC": "Indian/Mahe",
                    "SL": "Africa/Freetown",
                    "SG": "Asia/Singapore",
                    "SK": "Europe/Bratislava",
                    "SI": "Europe/Ljubljana",
                    "SB": "Pacific/Guadalcanal",
                    "SO": "Africa/Mogadishu",
                    "ZA": "Africa/Johannesburg",
                    "ES": "Europe/Madrid",
                    "LK": "Asia/Colombo",
                    "SD": "Africa/Khartoum",
                    "SR": "America/Paramaribo",
                    "SZ": "Africa/Mbabane",
                    "SE": "Europe/Stockholm",
                    "CH": "Europe/Zurich",
                    "SY": "Asia/Damascus",
                    "TW": "Asia/Taipei",
                    "TJ": "Asia/Dushanbe",
                    "TZ": "Africa/Dar_es_Salaam",
                    "TH": "Asia/Bangkok",
                    "TL": "Asia/Dili",
                    "TG": "Africa/Lome",
                    "TO": "Pacific/Tongatapu",
                    "TT": "America/Port_of_Spain",
                    "TN": "Africa/Tunis",
                    "TR": "Europe/Istanbul",
                    "TM": "Asia/Ashgabat",
                    "UG": "Africa/Kampala",
                    "UA": "Europe/Kyiv",
                    "AE": "Asia/Dubai",
                    "GB": "Europe/London",
                    "US": "America/New_York",
                    "UY": "America/Montevideo",
                    "UZ": "Asia/Tashkent",
                    "VU": "Pacific/Efate",
                    "VA": "Europe/Vatican",
                    "VE": "America/Caracas",
                    "VN": "Asia/Ho_Chi_Minh",
                    "YE": "Asia/Aden",
                    "ZM": "Africa/Lusaka",
                    "ZW": "Africa/Harare"
                };

                let timeZone = countryToTimezone[countryCode] || "UTC";

                const options = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone };
                const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString('en-US', options);
                const sunsetTime = new Date(sunset * 1000).toLocaleTimeString('en-US', options);

                localStorage.setItem("selectedCity", city);
                document.querySelector("#city-input").value = city;

                document.getElementById("city").innerText = city.charAt(0).toUpperCase() + city.substring(1);
                document.querySelector(".description").innerHTML = description.charAt(0).toUpperCase() + description.substring(1);
                document.querySelector(".temp").innerHTML = temp + "°C";
                document.querySelector(".feels-like").innerHTML = `Feels like ${feelsLike} °C`;
                document.getElementById("min-temp").innerText = minTemp;
                document.getElementById("max-temp").innerText = maxTemp;
                document.querySelector(".weather-icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`;

                document.getElementById("hum").innerText = humidity;
                document.getElementById("pre").innerText = (pressure / 1000).toFixed(3);
                document.getElementById("sun-rise").innerText = sunriseTime;
                document.getElementById("sun-set").innerText = sunsetTime;
                document.getElementById("visi").innerText = visibility;
                document.getElementById("wind").innerText = windSpeed;
            }
        })
        .catch(err => console.error("Error fetching weather:", err));
}

function getWeather() {
    const city = document.getElementById("city-input").value;
    if (!city) {
        alert("Please Enter a City Name");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;
    detailsFetching(url);
}

const locationButton = document.getElementById("getLocation");

function gotLocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const lurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;
    detailsFetching(lurl);
}

function failedToGet() {
    alert("There was some issue in fetching location");
}

locationButton.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
});


document.getElementById("5-day-btn").addEventListener("click", () => {

    const city = document.getElementById("city-input").value;
    if (!city) {
        alert("Please Enter a City Name");
        return;
    }
    const storedCity = sessionStorage.getItem("selectedCity");

    window.location.href = "5-day.html";
});



