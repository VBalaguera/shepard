<template>

        <div :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
            <main>
                <div class='search-box'>
                    <input 
                        type='text' 
                        class="search-bar" 
                        placeholder="Type your location" 
                        v-model="query"
                        @keypress="fetchWeather"
                        />
                </div>
                <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
                    <div class="location-box">
                        <div class="location">
                            {{weather.name}}, {{weather.sys.country}}
                        </div>
                        <div class='date'>
                            {{ getDate() }}
                        </div>
                    </div>
                    <div class="weather-box">
                        <div class="temp">
                            {{Math.round(weather.main.temp)}}°C
                        </div>
                        <div class="weather-main">
                            {{weather.weather[0].main}}
                        </div>
                        <div class="weather-secondary">
                            Feels like: {{Math.round(weather.main.feels_like)}}°C
                        </div>
                        <div class="weather-secondary">
                            Temp max: {{Math.round(weather.main.temp_max)}}°C | Min: {{Math.round(weather.main.temp_min)}}°C
                        
                         </div>
                        <div class="weather-secondary">
                            Humidity: {{weather.main.humidity}}%
                        </div>
                        <div class="weather-bottom">
                            Have a nice day
                        </div>

                    </div>
                </div>
            </main>
        </div>
</template>

<script>
export default {
    data() {
        return {
            api_key: "dfb68e03983cbca6f09b52c554395f1f",
            url_base: "https://api.openweathermap.org/data/2.5/",
            query: '',
            weather: {}
        }
    },
    methods: {
        fetchWeather(e) {
            if(e.key == "Enter") { //only runs when pressing ENTER
                fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
                .then(res => {
                    return res.json();
                }).then(this.setResults); 
            }
        },
        setResults(results) {
            this.weather = results; 
        },
        getDate () {
        let d = new Date(); 
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate(); 
        let month = months[d.getMonth()]; 
        let year = d.getFullYear(); 

        return `${day} ${date} ${month} ${year}`;
    }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&display=swap');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Josefin Sans', sans-serif;
}

.weather-app {
    background: rgb(183,190,191);
    background: linear-gradient(180deg, rgba(183,190,191,1) 0%, rgba(28,62,136,1) 100%); 
    background-size: cover; 
    background-position: bottom; 
    transition: 0.4s ease-out; 
}

.weather-app.warm {
    background: rgb(246,254,71);
    background-image: linear-gradient(180deg, rgba(246,254,71,1) 0%, rgba(246,12,12,1) 100%); 
    transition: 0.4s ease-out; 
}

main {
    min-height: 90vh; 
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8));
    padding: 1rem; 
    transition: 0.4s ease-out; 
}

.search-box {
    width: 100%;
    margin: 0 0 3rem; 
}

.search-box .search-bar {
    display: block; 
    width: 100%; 
    padding: 1rem; 

    appearance: none;
    background: none; 
    border: none; 
    outline: none; 

    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 0 0 1rem 1rem; 
    margin-top: -1rem; 
    opacity: none;  

    box-shadow: 0px 5px rgba(0, 0, 0, 0.2); 

    color: #313131; 
    font-size: 1.5rem;
    
    transition: 0.4s ease; 
}

.location {
    color: #FFF;
    font-size: 3rem;
    font-weight: 500; 
    text-align: center; 
    text-shadow: 0px 2px rgba(50, 50, 70, 0.5)
}


.location-box {
    color: #FFF;
    font-size: 3rem;
    font-weight: 500; 
    text-align: center; 
    text-shadow: 0px 2px rgba(50, 50, 70, 0.5)
}

.date {
    color: #fff;
    font-size: 2rem; 
    font-weight: 400; 
    margin: 2rem 0 0rem 0; 
    text-align: center; 
    text-shadow: 2px 4px rgba(50, 50, 70, 0.5); 
}

.weather-box {
    text-align: center; 
}

.temp {
    position: relative; 
    display: inline-block;
    width: 12rem; 
    height: 12rem; 
    margin: 1rem; 
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50%; 

    padding: 3.5rem 1rem; 

    color: #FFF; 
    font-size: 4rem;
    font-weight: 900; 

    text-shadow: 3px 6px rgba(50, 50, 70, 0.7);
    text-align: center; 
    box-shadow: 2px 4px rgba(0, 0, 0, 0.2); 
}

.weather-main {
    color: #FFF; 
    font-size: 3.5rem;
    font-weight: 700;
    text-shadow: 2px 4px rgba(50, 50, 70, 0.7); 
}

.weather-main {
    margin: 1rem 0 1rem 0; 
}

.main {
    margin-bottom: 2rem; 
}

.weather-secondary {
    color: #FFF; 
    font-size: 2rem;
    font-weight: 600;
    margin: .2rem 0; 
    text-shadow: 2px 4px rgba(50, 50, 70, 0.7); 
}

.weather-bottom {
    position: absolute; 
    bottom: 2%;
    right: 0; 
    left: 0;  
    color: #FFF; 
    font-size: 2rem;
    font-weight: 600; 
    text-shadow: 2px 4px rgba(50, 50, 70, 0.5); 
}

@media screen and (max-width: 450px) {
    .main {
        padding: 0; 
    }

    .weather-secondary, .weather-main {
        font-size: 2rem; 
    }
}
</style>