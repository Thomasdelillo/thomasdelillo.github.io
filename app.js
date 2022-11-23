window.addEventListener('load', ()=>  {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationtimeZone = document.querySelector(".location-timezone");
    let iconSelection = document.querySelector(".icon");

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude.toFixed(4);
            lat = position.coords.latitude.toFixed(4);


            const proxy = "https://cors-anywhere.herokuapp.com/";
            const API_key = 'abf83f1194efd2b5b009ef3d9d65e1e0'
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=abf83f1194efd2b5b009ef3d9d65e1e0`
            

            fetch(api)
            .then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data);
                const temp = (1.8 * (data.main.temp - 273) + 32).toFixed(0);
                const summary = toTitleCase(data.weather[0].description);
                const timezone = data.name + ", " + data.sys.country;
                const icon = data.weather[0].icon;
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = summary;
                locationtimeZone.textContent = timezone;
                //Set Icon
                setIcon(icon, document.querySelector('.icon'));
                console.log(document.querySelector('.icon'));
            });
        });        
    } else {
        h1.textContent = "This does not work"
    }

    console.log("summary");
    console.log("data.weather[0].description");
    function setIcon(iconnn, iconID) {
        const skycons = new Skycons({color: "white"})
        iconSelection.textContent = iconnn;
        const currentIcon = iconnn;
        //console.log(icon);
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }
});