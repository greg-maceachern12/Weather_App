$(document).ready(function(){
	$('#submitLocation').click(function(){

		var enteredCity=$('#inputLocation').val();
    var typeOfForecast = 'weather';
    var selectedTime = $('#timeSelector').val();

    if (selectedTime == "shortTerm" || selectedTime == "longTerm"){
      typeOfForecast = "forecast";
    }

	var weatherForCity =
		$.ajax({
			url:"http://api.openweathermap.org/data/2.5/"+typeOfForecast+"?q="+enteredCity+"&units=metric&appid=23e4e058e0b0ab3bd4c4ba9d0b1ae0bb",
			success:function(response){

				console.log(response);
				var preHTML;

				if(selectedTime == 'now'){
          preHTML =
            '<h1 id = \'city\'>Selected City: ' + response.name + ', ' + response.sys.country +
            '<h2>' + 'Temperature is: ' + response.main.temp +' C' + '<h2>' +
            '<h2>' + 'Wind Speed is: ' + response.wind.speed + ' km/h, ' + response.wind.deg + ' Degrees' + '<h2>';
            $.each(response.weather, function(key, weather) {
							preHTML +=
								'<img class="weather-icon" src="http://openweathermap.org/img/w/' + weather.icon + '.png" />' +
                '<h2>Description: '+ weather.description + '</h2>'
						});
				}
				else if(selectedTime =='shortTerm'){

          preHTML = '<h1>Selected City: ' + response.city.name + ', ' + response.city.country;

            $.each(response.list, function(key, list) {
							if (key >2){
								return false;
							}
							preHTML +=
								'<h2>Day ' + (key +1) + ': <br>Temperature is: ' + list.main.temp +' C' + '<h2>' +
                '<h2>' + 'Wind Speed is: ' + list.wind.speed + ' km/h, ' + list.wind.deg + ' Degrees' + '<h2><br>';
						});
        }

				else if(selectedTime == 'longTerm'){
              preHTML = '<h1>Selected City: ' + response.city.name + ', ' + response.city.country;
                $.each(response.list, function(key, list) {
									if (key >15){
										return false;
									}
									preHTML +=
										'<h2>Day ' + (key +1) + ': <br>Temperature is: ' + list.main.temp +' C' + '<h2>' +
		                '<h2>' + 'Wind Speed is: ' + list.wind.speed + ' km/h, ' + list.wind.deg + ' Degrees' + '<h2><br>';
								});
        }
				else{
					return;
				}
        $('#weatherData').empty()
				$('#weatherData').prepend(
					'	<div class="weatherData">' +
							preHTML +
					'	</div>'
					);
			},
      error:function (xhr, ajaxOptions, thrownError){
          if(xhr.status==404) {
              alert("That is not a valid location!!");
          }
					if(xhr.status==404) {
              alert("Need paid version:(");
          }
      }

		})
	})
});
