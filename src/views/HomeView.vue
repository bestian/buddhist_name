<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" :names="names" :myTotal="myTotal" :myToDay="myToDay" :myS="myS" :allnames="allnames" :len="len"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  props: ['names', 'myTotal', 'myToDay', 'myS', 'allnames', 'len'],
  components: {
    HelloWorld
  }
}
</script>
