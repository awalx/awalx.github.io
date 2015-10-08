$(document).ready(function() {
		//Use browser geolocation
		if (navigator.geolocation) {
				//get current postion and pass it to the forecast function.
				navigator.geolocation.getCurrentPosition(forecast);
		} else {
				//output to console if no geolocation
				console.log("No Geolocation!");
		}
		//request data from forecast.io	
		function forecast(position) {
				var apiKey = 'bfd3ca81558dce3b289752569e166a4e';
				var forecastUrl = 'https://api.forecast.io/forecast/';
				var locationUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
				var latlng = position.coords.latitude + ',' + position.coords.longitude;

				$.getJSON(forecastUrl + apiKey + "/" + latlng + "?callback=?", postForecast);
				$.getJSON(locationUrl + latlng, postLocationName);
		}

		//Post Location Name in readible language
		function postLocationName(data) {
				if (data.status == "OK") {
						//Check result 0
						var result = data.results[0];
						//look for locality tag and administrative_area_level_1
						var city = "";
						for (var i = 0, len = result.address_components.length; i < len; i++) {
								var ac = result.address_components[i];
								if (ac.types.indexOf("locality") >= 0) city = ac.long_name;
						}
						$('#locationName').text(city);
				}

				/*var locationArr = data.results[0].formatted_address.split(' ');
		$('#locationName').text(data.results[2].formatted_address);*/
		}

		//update webpage with forecast information
		function postForecast(data) {
				$('#icon').addClass('wi-forecast-io-' + data.currently.icon);
				$('#temperature').text(Math.floor(data.currently.temperature));
				$('#summary').text(data.currently.summary);
				$('#weatherApp').addClass(data.currently.icon);
				$('#hi').text(Math.floor(data.daily.data[0].temperatureMax));
				$('#lo').text(Math.floor(data.daily.data[0].temperatureMin));
			$('#precip').text(Math.floor(data.daily.data[0].precipProbability * 100));
		}
});