<template>
  <div>
    <header>
      <h1>Venom Snek wants his revenge</h1>
      <h4>A game base on change and luck, sometimes skill</h4>
    </header>
    <div id="game">
      <section id="demon" class="container">
        <h2>The Whole World's Health</h2>
        <div class="healthbar">
          <div class="healthbar__value" :style="demonBarStyles"></div>
        </div>
      </section>
      <section id="player" class="container">
        <h2>Snek</h2>
        <div class="healthbar">
          <div class="healthbar__value" :style="playerBarStyles"></div>
        </div>
      </section>
      <section id="controls" v-if="!winner">
        <button @click="attackDemon">ATTACK</button>
        <button :disabled="mayUseSpecialAttack" @click="specialAttackDemon">
          SPECIAL ATTACK
        </button>
        <button @click="healingPlayer">HEAL</button>
        <button @click="surrender">SURRENDER</button>
      </section>
      <section className="container" v-if="winner">
        <h2>Game Over</h2>
        <div v-if="winner === 'demon'">
          <h3>You lost</h3>
          <h1>Such a lust for revenge</h1>
          <h1>WHOOOOOOOOOOOOOOOOOOOO?</h1>
        </div>
        <h3 v-else-if="winner === 'player'">You win</h3>
        <h3 v-else>Draw</h3>
        <button @click="restartGame">Play again?</button>
      </section>
      <section id="log" class="container">
        <h2>Battle Log</h2>
        <ul>
          <li v-for="logMessage in logMessages" v-bind:key="logMessage">
            <span
              :class="{
                'log--player': logMessage.actionBy === 'player',
                'log--demon': logMessage.actionBy === 'demon',
              }"
            >
              {{ logMessage.actionBy === "player" ? "Snek" : "Cypher" }}
            </span>
            <span v-if="logMessage.actionType === 'heal'">
              heals himself for
              <span class="log--heal">{{ logMessage.actionValue }}</span>
            </span>
            <span v-else>
              attacks and deals
              <span class="log--damage"> {{ logMessage.actionValue }}</span>
            </span>
          </li>
        </ul>
      </section>
      <section id="theory" class="container">
        <p>
          The objective of this small game is to implement and understand the
          main core principles of Vue: data(), methods(), computed properties
          and watchers. Along with all the possibilities regarding dynamic css
          classes, conditionally rendering content, etc. All the contents in
          this have been possible thanks to this
          <a
            href="https://www.udemy.com/course/vuejs-2-the-complete-guide/"
            target="_blank"
            >great course</a
          >.
        </p>
      </section>
    </div>
  </div>
</template>

<script>
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export default {
  data() {
    return {
      playerHealth: 100,
      demonHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    demonBarStyles() {
      if (this.demonHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.demonHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 4 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.demonHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "demon";
      }
    },
    demonHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    attackDemon() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.demonHealth -= attackValue;
      this.addLogMessages("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessages("demon", "attack", attackValue);
    },
    specialAttackDemon() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.demonHealth -= attackValue;
      this.addLogMessages("player", "special-attack", attackValue);
      this.attackPlayer();
    },
    healingPlayer() {
      const healingValue = getRandomValue(8, 20);
      if (this.playerHealth + healingValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healingValue;
      }
      this.addLogMessages("player", "heal", healingValue);
      this.attackPlayer();
    },
    restartGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      this.logMessages = [];
    },
    surrender() {
      this.winner = "demon";
      this.addLogMessages("player", "surrenders");
    },
    addLogMessages(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Source Code Pro', monospace;
}

body {
  margin: 0;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0.5rem;
  background-color: #880017;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
}

section {
  width: 90%;
  max-width: 40rem;
  margin: auto;
}

.healthbar {
  width: 100%;
  height: 40px;
  border: 1px solid #575757;
  margin: 1rem 0;
  background: #fde5e5;
}

.healthbar__value {
  background-color: #00a876;
  width: 100%;
  height: 100%;
}

.container {
  text-align: center;
  padding: 0.5rem;
  margin: 1rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
}

#monster h2,
#player h2 {
  margin: 0.25rem;
}

#controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

button {
  font: inherit;
  border: 1px solid #88005b;
  background-color: #88005b;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  margin: 1rem;
  width: 12rem;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

button:focus {
  outline: none;
}

button:hover,
button:active {
  background-color: #af0a78;
  border-color: #af0a78;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.26);
}

button:disabled {
  background-color: #ccc;
  border-color: #ccc;
  box-shadow: none;
  color: #3f3f3f;
  cursor: not-allowed;
}

#log ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

#log li {
  margin: 0.5rem 0;
}

.log--player {
  color: #7700ff;
}

.log--monster {
  color: #da8d00;
}

.log--damage {
  color: red;
}

.log--heal {
  color: green;
}

.code {
  overflow: hidden; 
}
</style>
