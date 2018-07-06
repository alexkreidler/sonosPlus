<template>
  <div id="app">
    <div id="header">
      <h1>SonosPlus</h1>
    </div>
    <Rooms v-on:speaker="supdate"></Rooms>
    <Play :speaker="speaker"></Play>
  </div>
</template>

<script>
import Rooms from './components/Rooms.vue'
import Play from './components/Play.vue'

export default {
  name: 'app',
  components: {
    Rooms,
    Play
  },
  data: function() {
    return {
      speaker: 'sonos'
    }
  },
  methods: {
    supdate(s) {
      this.speaker = s
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
