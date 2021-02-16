<template>
  <div>
      <div v-if="isQuizStarted">
          <h1>{{operandLeft}}  {{ operator }} {{ operandRight }}</h1>

          <button @click="selectAnswer(answer)" v-for="(answer, index) of answers" :key="index">{{ answer }}</button>
      </div>

      <div v-if="!isQuizStarted">
          <button @click="startQuiz">Start</button>
      </div>
      <button @click="$emit('onBack')">Back</button>
      
  </div>
</template>

<script>
export default {
    props: ["operator"],
    data() {
        return {
            operandLeft: null, 
            operandRight: null,
            isQuizStarted: false,
            answers: [], 
            expectedAnswer: null
        }
    },
    methods: {
        startQuiz() {
            this.isQuizStarted = true; 
            this.operandLeft = parseInt(Math.random() * 13); 
            this.operandRight = parseInt(Math.random() * 13); 

            const methods = {
                '+': (a, b) => a + b,
                '-': (a, b) => a - b,
                '/': (a, b) => a / b,
                '*': (a, b) => a * b,
            }

            const methodToUse = methods[this.operator]; 

            this.answers = []; 
                /* this.operandLeft * parseInt(Math.random() * 3) +
                this.operandRight * parseInt(Math.random() * 3); */
                this.answers.push(methodToUse(this.operandLeft, this.operandRight + 1));
                this.answers.push(methodToUse(this.operandLeft + 1, this.operandRight));
                this.answers.push(methodToUse(this.operandLeft + 1, this.operandRight + 1));
                this.answers.push(methodToUse(this.operandLeft - 1, this.operandRight + 1));
                this.answers.push(methodToUse(this.operandLeft, this.operandRight - 1));
                //how do we guarantee one of then is ALWAYS THE CORRECT ONE? 
            
            const expectedAnswer = methodToUse(this.operandLeft, this.operandRight); 
            this.answers[
                parseInt(Math.random() * this.answers.length)
                ] = expectedAnswer; 
                this.expectedAnswer = expectedAnswer;
        },
        selectAnswer(answerSelected) {
            if (answerSelected !== this.expectedAnswer) {
                alert("you're WRONG"); 
            }
            this.startQuiz(); 
        }
    }
}
</script>

<style>
    * {
        font-family: 'Fira Code', monospace;
    }
</style>