<template>
      <div id="button-container">

        
        <button @click="$emit('changeOperator', '+')">Plus +</button>
        <button @click="$emit('changeOperator', '-')">Minus -</button>
        <button @click="$emit('changeOperator', '/')">Divided by /</button>
        <button @click="$emit('changeOperator', '*')">Multiplication *</button>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    * {
        font-family: 'Fira Code', monospace;
    }
</style>