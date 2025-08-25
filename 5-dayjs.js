const city = localStorage.getItem("selectedCity");

const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

document.querySelector(".city-name").textContent = city;

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const dailyData = [];
        const seenDates = new Set();

        // First entry → today
        if (data.list.length > 0) {
            dailyData.push(data.list[0]);
            seenDates.add(data.list[0].dt_txt.split(" ")[0]);
        }

        // Next days → choose 12:00:00 forecast
        data.list.forEach(item => {
            const [date, time] = item.dt_txt.split(" ");
            if (!seenDates.has(date) && time === "12:00:00") {
                dailyData.push(item);
                seenDates.add(date);
            }
        });

        // Limit to 6 days max
        const daysCount = Math.min(dailyData.length, 6);

        const tempList = document.querySelectorAll(".cur-temp");
        const descriptionList = document.querySelectorAll(".description");
        const dayList = document.querySelectorAll(".day");
        const dateList = document.querySelectorAll(".month-date");
        const feelList = document.querySelectorAll(".feel-temp");
        const imgs = document.querySelectorAll(".weather-img img");
        const cards = document.querySelectorAll(".card");

        for (let i = 0; i < daysCount; i++) {
            const item = dailyData[i];
            const dateObj = new Date(item.dt * 1000);

            tempList[i].textContent = item.main.temp.toFixed(1) + "°C";
            descriptionList[i].textContent = item.weather[0].description;
            dayList[i].textContent = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
            dateList[i].textContent = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            feelList[i].textContent = item.main.feels_like.toFixed(1) + "°C";

            const iconCode = item.weather[0].icon;
            imgs[i].src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            // Click event for each card (accordion style)
            cards[i].addEventListener("click", () => {
                const isOpen = cards[i].classList.contains("on-click");

                // Close all cards first
                cards.forEach(c => {
                    c.classList.remove("on-click");
                    c.querySelector(".clk").classList.remove("invis");
                    c.querySelector(".more-info").classList.add("invis");
                });

                // If clicked card wasn’t open → open it
                if (!isOpen) {
                    cards[i].classList.add("on-click");
                    cards[i].querySelector(".clk").classList.add("invis");
                    cards[i].querySelector(".more-info").classList.remove("invis");

                    // Fill in extra info for that day's forecast
                    cards[i].querySelector(".min-temp").textContent = item.main.temp_min + " °C";
                    cards[i].querySelector(".max-temp").textContent = item.main.temp_max + " °C";
                    cards[i].querySelector(".humidity").textContent = item.main.humidity + " %";
                    cards[i].querySelector(".pressure").textContent = (item.main.pressure / 1000).toFixed(2) + " bar";
                    cards[i].querySelector(".wind-speed").textContent = item.wind.speed + " Km/H";
                    cards[i].querySelector(".visibility").textContent = (item.visibility / 1000).toFixed(1) + " Km";
                }
            });
        }
    })
    .catch(error => console.error("Error fetching forecast:", error));
