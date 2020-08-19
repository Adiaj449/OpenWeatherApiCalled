async function fetchData(url) {
    try {
        var data = await fetch(url);
        var realData = data.json();
        return realData;
    } catch (err) {
        return err;
    }
}
async function getWeatherData(lat,long) {
    try {
        let url = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&exclude=hourly,daily&appid=e607e39f75c1c7526deb060ba1d50024";
        var data = await fetchData(url);
        var realWeatherData = data;
        return realWeatherData;
    }
    catch (err) {
        return err;
    }
}

fetchData('https://restcountries.eu/rest/v2/all').then(function (countriesData) {
    //console.log(countriesData[0]["name"]);

    let len = countriesData.length;

    var containerDiv = document.createElement('div');
    containerDiv.setAttribute('class', 'container text-center');

    var rowDiv = document.createElement('div');
    rowDiv.setAttribute('class', 'row');

    for (let i = 0; i < len; i++) {
        var colDiv = document.createElement('div');
        colDiv.setAttribute('class', 'col-sm-4');

        var cardDiv = document.createElement('div');
        cardDiv.setAttribute('class', 'card text-center');

        var countryImg = document.createElement('img');
        countryImg.setAttribute('class', 'card-img-top');
        countryImg.src = countriesData[i]['flag'];

        var divBody = document.createElement('div');
        divBody.setAttribute('class', 'card-body');

        var cardTitle = document.createElement("h4");
        cardTitle.setAttribute('class', 'card-title');
        cardTitle.innerText = countriesData[i]["name"];

        let latitude = countriesData[i]['latlng'][0];
        let longitude = countriesData[i]['latlng'][1];

        var detailsCountry = document.createElement('p');
        detailsCountry.setAttribute('class', 'card-text');
        detailsCountry.innerHTML = "Region : " + countriesData[i]['region'] + "<br>" + detailsCountry.innerText + "<br>Capital : " + countriesData[i]['capital'] + "<br>" + detailsCountry.innerText + "Country code : " + countriesData[i]['alpha3Code'];
        
        var lat = document.createElement('p');
        lat.setAttribute('class', 'card-text');
        lat.id = latitude;
        lat.innerHTML = "Latitude : " + latitude;

        var long = document.createElement('p');
        long.setAttribute('class', 'card-text');
        long.id = longitude;
        long.innerHTML = "Longitude :" + longitude;

        let btnCheckWeather = document.createElement('button');
        btnCheckWeather.setAttribute('class', 'btn btn-primary');
        btnCheckWeather.value = countriesData[i]['alpha3Code'];
        btnCheckWeather.innerText = "Check Weather";

        divBody.appendChild(countryImg);
        divBody.appendChild(cardTitle);
        cardDiv.appendChild(divBody);


        divBody.appendChild(detailsCountry);
        divBody.appendChild(lat);
        divBody.appendChild(long);
        divBody.appendChild(btnCheckWeather);

        btnCheckWeather.addEventListener('click', function () {
            getWeatherData(latitude,longitude).then(function (weatherData) {
                alert("Weather of Country : "+ countriesData[i]["name"] + " is "+ weatherData['current']['weather'][0]['description']);
            }).catch(function (err) {
                alert(err);
            })
        });
        colDiv.appendChild(cardDiv);
        rowDiv.appendChild(colDiv);
    }

    containerDiv.appendChild(rowDiv);
    var body = document.getElementsByTagName('body');
    document.body.appendChild(containerDiv);

}).catch(function (err) {
    console.log(err);
})