<template>
<div class="hello">
  <h2>Rooms</h2>
  <ul id="example-1">
    <li v-for="item in items" :key=item.coordinator.roomName v-on:click="setSelected(item.coordinator.roomName); $emit('speaker', item.coordinator.roomName)" v-bind:class="{ selected: speaker == item.coordinator.roomName }">
      {{ item.coordinator.roomName }}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'Rooms',
  props: {
    msg: String
  },
  data: function() {
    this.$http.get('/proxy' + '/zones').then(response => {
      console.log(response.body)
      this.items = response.body
    });
    return {
      items: {},
      speaker: this.speaker
    }
  },
  methods: {
    setSelected: function(name){
        this.speaker = name
        console.log(this);
      // some code to filter users
    }
  }
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
  margin: 1em;
  padding: 1em;
  border-radius: 0.1em;
  background-color: #c4c4c4;
}
li:hover {
  background-color: #8eb9d1;
}
li.selected {
  background-color: #489fd1;
}

a {
  color: #42b983;
}
</style>
