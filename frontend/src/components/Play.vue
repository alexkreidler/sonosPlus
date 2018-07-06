<template>
<div class="hello">
  <h2>Play</h2>
  <ul id="example-1">
    <input id="search" type="text" v-model="search" v-on:keyup.enter="play">
    <button id="play" v-on:click="play">Play</button>
    <p>{{status}} {{search}} on the {{speaker}} speaker</p>
  </ul>
</div>
</template>

<script>
export default {
  name: 'Play',
  props: {
    speaker: String
  },
  data: function() {
    return {
      items: {},
      search: 'Best Song Ever',
      status: 'Going to play'
    }
  },
  methods: {
    play: function(){
      this.$http.get('/play' + '?search=' + encodeURI(this.search) + '&speaker=' + encodeURI(this.speaker)).then(response => {
        console.log(response.body)
        this.status = 'Playing'
      });
    }
  },
  // props: ['speaker']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  /* display: inline-block; */
  margin: 0 10px;
}

a {
  color: #42b983;
}

#search {
  width: 80%;
  padding: 1em;
  font-size: 1.2em;
}

#play {
  padding: 1em;
  font-size: 1.2em;
  border-radius: 0.1em;
  border-color: #c4c4c4;
  background-color: #0188d4;
  color: #ffffff;
  margin: 1em;
}
#play:click {
  background-color: #52b1fe;
}
</style>
