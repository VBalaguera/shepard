<template>
  <div id="app">
      <header id='app-header'>
        <img id="app-logo" src="./assets/logo.png" alt="shepard"/>
        <h1 id="app-title">Shepard</h1>
        
      </header>
      <WeatherApp />
      <MathQuiz />
      <Game />

  </div>
</template>

<script>
import MathQuiz from './components/MathQuiz'; 
import Game from './components/Game'; 
import WeatherApp from './components/WeatherApp'; 
export default {
  name: "App",
  components: {
  MathQuiz,
  Game,
  WeatherApp
}
}

</script>

<style>
* {
  padding: 0;
  margin: 0; 
}
#app-logo {
  height: 5vh;  
}
#app-header {
    background-color: #282c34;
  min-height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #41B883;
}

#app-title {
  font-weight: 400; 
  font-size: 1.5rem; 
}
</style>

