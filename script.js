let time = new Date();
let hour = time.getHours()

if (hour < 4 || hour > 19) {
	/* night */
	document.getElementById("weatherData").style.color = "#ffffff";
	document.getElementById("mainbody").style.backgroundImage = "linear-gradient(to top left,#000000,#004547)";
}
else if (hour > 16) {
	/* eve */
	document.getElementById("weatherData").style.color = "#333333";
	document.getElementById("mainbody").style.backgroundImage = "linear-gradient(to top left,#1054a9,#c85508)";
}
else {
	/* morning */
	document.getElementById("weatherData").style.color = "#111111";
	document.getElementById("mainbody").style.backgroundImage = "linear-gradient(to top left,#3c4bf4,#f1eed6)";
}

const fetchWData = async () => {
	if (cityName.value) {
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=723c5c4db9e7f3ea14a7d9d727c8d20d&units=metric`)
		response.json().then(data => {
			console.log(data);
			let city = data.name
			let country = data.sys.country
			let currTemp = data.main.temp
			let flTemp = data.main.feels_like
			let wDesc = data.weather[0].main
			let minTemp = data.main.temp_min
			let maxTemp = data.main.temp_max
			let humidity = data.main.humidity
			let pressure = data.main.pressure
			let windSpd = data.wind.speed
			let windDir = data.wind.deg

			weatherData.innerHTML = `
			<!-- Row 1 -->
			<div class="col-12 fs-5">
			  <span>${city}</span>,<span>${country}</span>
			</div>
			<!-- Row 2 -->
			<div class="col-12" style="font-size: 3rem">${currTemp} °C</div>
			<!-- Row 3 -->
			<div class="col-12 m-1 p-0">Time : <span>${time.toTimeString()}</span></div>
			<!-- Row 4 -->
			<div class="col-12 fs-6">
			  Feels Like <span>${flTemp} °C</span>.
			  <span>${wDesc}</span>
			</div>
			<!-- Row 5 -->
			<div class="col-12 fs-7 p-0">
			  <div class="m-2">
				Minimum Temperature : <span class="w-100">${minTemp} °C</span>
			  </div>
			  <div class="m-2">
				Maximum Temperature : <span class="w-100">${maxTemp} °C</span>
			  </div>
			</div>
			<!-- Row 6 -->
			<div class="col-6 fs-6">Humidity : <span>${humidity}</span></div>
			<div class="col-6 fs-6">Pressure : <span>${pressure}hPa</span></div>
			<!-- Row 7 -->
			<div class="col-6 fs-6">Wind Speed : <span>${windSpd} m/s</span></div>
			<div class="col-6 fs-6">Wind Direction : <span><i class="fa-solid fa-arrow-up" style="transform:rotate(${windDir}deg);"></i>${windDir} degree</span></div>`
		}
		)
	}
	else {
		alert("Please enter valid input")
	}
}