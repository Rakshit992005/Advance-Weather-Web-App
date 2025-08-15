const city = localStorage.getItem("selectedCity");

const apiKey = "866bcfd4de68b79405f18aba7110db91";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

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

        for (let i = 0; i < daysCount; i++) {
            const item = dailyData[i];
            const dateObj = new Date(item.dt * 1000);

            tempList[i].textContent = item.main.temp.toFixed(1) + "°C";
            descriptionList[i].textContent = item.weather[0].description;
            dayList[i].textContent = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
            dateList[i].textContent = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            feelList[i].textContent = item.main.feels_like.toFixed(1) + "°C";
        }
    })
    .catch(error => console.error("Error fetching forecast:", error));
