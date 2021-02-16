<template>
  <div id="quiz-app">
    <h1 className="title">Math quiz app</h1>
    <OperatorQuiz @onBack="onBack" v-if="operator" :operator="operator" />
    <OperatorSelector v-if="!operator" @changeOperator="changeOperator" />
  </div>
</template>

<script>
import OperatorSelector from "./components/OperatorSelector";
import OperatorQuiz from "./components/OperatorQuiz";
export default {
  name: "App",
  data() {
    return {
      operator: null,
    };
  },
  methods: {
    changeOperator(operator) {
      this.operator = operator;
    },
    onBack(){
      this.operator = null; 
    }
  },
  components: {
    OperatorSelector,
    OperatorQuiz,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');
#quiz-app {
  font-family: 'Fira Code', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 1.5rem;
}

button {
  padding: 1rem;
  background-color: #ff6726;
  color: white;
  font-size: 1rem;
  box-shadow: none;
  margin: 0 1rem;
}

#button-container {
  display: flex;
  justify-content: center;
}
</style>

<!-- 
colors: 

#ff4162; 

-->
