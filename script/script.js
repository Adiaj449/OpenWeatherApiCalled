async function fetchData(url) {
    try {
        var data = await fetch(url);
        var realData = data.json();
        return realData;
    } catch (err) {
        return err;
    }
}
async function getWeatherData(countryCode) {
    try {
        let url = countryCode;
        var data = await fetchData(url);
        var realWeatherData = data.json();
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

        var detailsCountry = document.createElement('p');
        detailsCountry.setAttribute('class', 'card-text');
        detailsCountry.innerHTML = "Region : " + countriesData[i]['region'] + "<br>" + detailsCountry.innerText + "<br>Capital : " + countriesData[i]['capital'] + "<br>" + detailsCountry.innerText + "Country code : " + countriesData[i]['alpha3Code'];

        let btnCheckWeather = document.createElement('button');
        btnCheckWeather.setAttribute('class', 'btn btn-primary');
        btnCheckWeather.value = countriesData[i]['alpha3Code'];
        btnCheckWeather.innerText = "Check Weather";

        divBody.appendChild(countryImg);
        divBody.appendChild(cardTitle);
        cardDiv.appendChild(divBody);


        divBody.appendChild(detailsCountry);
        divBody.appendChild(btnCheckWeather);

        btnCheckWeather.addEventListener('click', function () {
            getWeatherData(btn.value).then(function (weatherData) {
                alert(weatherData);
            })
                .catch(function (err) {
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