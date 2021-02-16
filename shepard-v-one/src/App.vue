<template>
  <div id="app">
      <header id='app-header'>
        <img id="app-logo" src="./assets/logo.png" alt="shepard"/>
        <h1 id="#app-title">Shepard</h1>
        
      </header>
      <MathQuiz />
      <Game />
  </div>
</template>

<script>
import MathQuiz from './components/MathQuiz'; 
import Game from './components/Game'; 
export default {
  name: "App",
  components: {
  MathQuiz,
  Game
}
}

</script>

<style>
* {
  padding: 0;
  margin: 0; 
}
#app-logo {
  height: 3vh;  
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
}
</style>

<!-- 
colors: 

#ff4162; 

-->
