<template>
  <div id="app">
    <div id="nav" class="ui menu">
      <router-link class = "item" to ="/">
        <i class ="home icon"/>
        <span class="fat-only">首頁</span></router-link>
      <router-link class = "item" to ="/about"><i class ="plus icon"/>
        <span class="fat-only">個人查詢</span></router-link>
      <!-- <router-link class = "item" to ="/day"><i class ="calendar icon"/>
        <span class="fat-only">每日</span></router-link> -->
      <router-link class = "item" to ="/rank"><i class ="chess king
 icon"/>
        <span class="fat-only">榮譽</span></router-link>
      <div class="right menu">
        <!-- <a v-if="!deferredPrompt"
          class="item"
          @click="install()"
        >
          <i class ="download icon"/>
          安裝
        </a> -->
        <router-link class = "item" to ="/88"><i class ="users icon"/>
        <span class="fat-only">88佛</span></router-link>
        <a class = "item fat-only" href="https://sites.google.com/view/innerpurelight/%E9%A6%96%E9%A0%81" target="_blank"><i class ="globe icon"/>台東永明佛寺</a>
        <a class = "item fat-only" href="https://github.com/bestian/number" target="_blank"><i class ="github icon"/>原始碼</a>
        <div class="wide item">
          <iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fbestian.github.io%2Fnumber%2F%23%2F&layout=button_count&size=small&appId=485195848253155&width=71&height=20" width="100" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </div>
      </div>
    </div>
    <router-view :names="names" :allnames="getnames()" :myTotal = "myTotal" :myToDay="myToDay" :len="len"/>
  </div>
</template>

<script>
import { db } from './firebase'
import { ref as dbRef } from 'firebase/database'
import { useDatabaseList } from 'vuefire'


const names = useDatabaseList(dbRef(db, 'names'))

export default {
  name: 'App',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: '歡迎',
    // all titles will be injected into this template
    titleTemplate: '%s | 永明佛寺念佛號',
  },
  data() {
    return {
      delay: false,
      len: 20,
      names: names,
      old_names: [],
    }
  },
  computed: {
    myToDay () {
      var ans = 0
      for (var i = 0; i < this.names.length; i++) {
        let n = this.names[i]
        if (
            (
              new Date(n.time).getFullYear() === new Date().getFullYear() && new Date(n.time).getMonth() === new Date().getMonth() && new Date(n.time).getDate() === new Date().getDate()
            )) {
          // console.log(n)
          ans += parseInt(n.number)
        }
      }
      // console.log(ans)
      return ans
    },
    myTotal () {
      var ans = 0
      for (var i = 0; i < this.names.length; i++) {
        let n = this.names[i]
        // console.log(new Date(n.time).getFullYear())
        if ((new Date(n.time).getFullYear() > 2023) || ((new Date(n.time).getFullYear() == 2023) && (new Date(n.time).getMonth() >= 4))) {
          // console.log(parseInt(n.number))
          ans += parseInt(n.number)
        }
        // console.log(ans)
      }
      // console.log(ans)
      return ans
    }
  },
  mounted () {
    window.addEventListener('wheel', this.onScroll);
    if("ontouchstart" in window){
       window.addEventListener('touchmove', this.onScroll);
    }
    const vm = this
    this.axios.get('./data/data-2023-04.json').then((response) => {
      // console.log(response.data)
      vm.old_names = response.data
      // console.log(vm.old_names)
    })
  },
  methods: {
    onScroll () {
      if (!this.delay) {
        console.log('load more')
        this.delay = true
        setTimeout(this.notDelay, 500)
        this.len += 10
      }
    },
    notDelay () {
      this.delay = false
    },
    infiniteHandler () {
      console.log('load more...')
      this.len += 10
      // console.log(this.allnames)
    },
    obj_to_list (obj) {
      const ks = Object.keys(obj)
      const list = ks.map(function (i) {
        return obj[i]
      })
      return list
    },
    getnames () {
      var ans = [...this.old_names]
      ans = ans.concat(this.names)
      return ans
    },
    install() {
      console.log(this.deferredPrompt)
      if (this.deferredPrompt) {

      // Show the prompt:
        this.deferredPrompt.prompt();

        // Wait for the user to respond to the prompt:
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
          } else {
            console.log("User dismissed the install prompt");
          }
          this.deferredPrompt = null;
        });
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 18px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  -webkit-animation:spin 4s 2 linear;
  -moz-animation:spin 4s 2 linear;
  animation:spin 4s 2 linear;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  50% {
    -webkit-transform: rotateY(1800deg);
    transform: rotateY(180deg);
  }
  100% {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
}

@keyframes spin {
  0% {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  50% {
    -webkit-transform: rotateY(1800deg);
    transform: rotateY(180deg);
  }
  100% {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
}

@-webkit-keyframes jump {
  0% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
  50% {
    -webkit-transform: scaleY(1.2);
    transform: scaleY(1.2);
  }
  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}

@keyframes jump {
  0% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
  50% {
    -webkit-transform: scaleY(1.2);
    transform: scaleY(1.2);
  }
  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}

label, input {
  font-size: 18px !important;
}

.router-link-exact-active {
  background-color: #cfc !important;
}

@media screen and (min-width: 601px) {
  .thin-only {
    display: none !important;
  }
}

@media screen and (max-width: 600px) {

  .fat-only {
    display: none !important;
  }
}

.highlight {
  display: inline-block;
  background-color: #9f9;
  padding: 0 0.5em;
  border-radius: 10px;
  -webkit-animation: jump 1s linear infinite;
  animation: jump 1s linear infinite;
}

.left.aligned {
  text-align: left;
}

a, button {
  cursor: pointer;
}

.wide {
  width: 120px !important;
}
</style>
