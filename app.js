function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      demonHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: []
    };
  },
  computed: {
    demonBarStyles() {
        if (this.demonHealth < 0 ) {
            return { width: "0%" }; 
        }
        return {width: this.demonHealth + '%'}
    },
    playerBarStyles() {
        if (this.playerHealth < 0 ) {
            return { width: "0%"}; 
        }
        return {width: this.playerHealth + '%'}
    },
    mayUseSpecialAttack() {
        return this.currentRound % 4 !== 0; 
    }
  },
  watch: {
    playerHealth(value) {
        if (value <= 0 && this.demonHealth <= 0) {
            this.winner = 'draw'
        } else if (value <= 0) {
            this.winner = 'demon'
        }
    },
    demonHealth(value) {
        if (value <= 0 && this.playerHealth <= 0) {
            this.winner = 'draw'
        } else if (value <= 0) {
            this.winner = 'player'
        }
    }
  },
  methods: {
    attackDemon() {
        this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.demonHealth -= attackValue;
      this.addLogMessages('player', 'attack', attackValue)
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessages('demon', 'attack', attackValue)
    },
    specialAttackDemon() {
        this.currentRound++; 
        const attackValue = getRandomValue(10, 25);
        this.demonHealth -= attackValue;
        this.addLogMessages('player', 'special-attack', attackValue)
        this.attackPlayer();
    },
    healingPlayer(){
        const healingValue = getRandomValue(8, 20);
        if (this.playerHealth + healingValue > 100) {
            this.playerHealth = 100;
        } else {
            this.playerHealth += healingValue
        }
        this.addLogMessages('player', 'heal', healingValue)
        this.attackPlayer();
    },
    restartGame() {
        this.playerHealth = 100; 
        this.monsterHealth = 100; 
        this.winner = null; 
        this.currentRound = 0; 
        this.logMessages = []
    },
    surrender() {
        this.winner = "demon"
        this.addLogMessages('player', 'surrenders')
    },
    addLogMessages(who, what, value) {
        this.logMessages.unshift({
            actionBy: who,
            actionType: what,
            actionValue: value
        })
    }
  },
});

app.mount("#game");
