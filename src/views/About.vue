<template>
  <div class="about">
    <div class="ui category search">
      <div class="ui icon input">
        <input class="prompt" type="text" placeholder="以姓名查詢" v-model="key">
        <i class="search icon"></i>
      </div>
    </div>
    <h1>加總</h1>
    <table class="ui celled unstackable table">
      <thead>
        <tr><th><i class="user icon"/><br class="thin-only" />姓名/法名</th>
        <!-- <th><i class="comment icon"/>佛號</th>  -->
        <!-- <th><i class="plus icon"/>加總</th> -->
        <th><i class="align left icon"/>詳情</th>
      </tr></thead>
      <tbody>
        <tr v-for = "u in my_fil(users, key)" :key="u">
          <td data-label="Name"><h3 class="ui header">{{ u }}</h3></td>
          <!-- <td data-label="Number">
             <div class="ui list">
               <div class="item" v-for="a in  list(u)" :key="a.date+a.n">
                 {{a.date}}: <span class="highlight">{{parseInt(a.number)}}聲</span>
               </div>
             </div>
          </td> -->
          <!-- <td data-label="Total">總共<br class="thin-only" />
            <span class="highlight">{{ count(u) }}聲</span>
            <br class="thin-only"/>佛號
          </td> -->
          <td>
            <button class="ui big blue button" @click="expend(u)">
              <i class="angle double down icon"/>
              展開
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ui left aligned list container" v-if="exp" id = "exp">
      <div class="left aligned item">  
        <h2 class="my_detail">{{exp}}：總共念了<span class="highlight">{{count(exp)}}聲</span>佛號</h2>
      </div>
      <div class="ui divider"></div>
      <div class="left aligned item" v-for="(o, k) in my_exp(allnames, exp)" :key="k">
        <p class="my_detail">{{o.date}}：念了<span class="highlight">{{o.number}}聲</span>佛號</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SumSum',
  metaInfo: {
    title: '加總',
  },
  props: ['names', 'allnames'],
  data: () => ({
      exp: '',
      key: '',
      n: 5
  }),
  computed: {
    // a computed getter
    users () {
      var u = [];
      var key = this.key;
      for (let i = 0; i < this.allnames.length; i++) {
        var re = /(.+?)[/／|丨\s]/;
        let n = this.allnames[i].n.replace(re, '');
        re = /(.+)?[〈（](.+)[）〉].*/;
        n = n.replace(re, '$2');
        n = n.replace('丨','');
        if (u.indexOf(n) == -1) {
          u.push(n);
        }
        // console.log(u)
      }
      if (key) {
        u = u.filter(function(k) {
          return k.indexOf(key) > -1
        })
      }
      return u;
    }
  },
  mounted () {
    const vm = this
    window.addEventListener("scroll", vm.handleScroll)
  },
  watch: {
    key () {
      this.exp = ''
    }
  },
  methods: {
    expend (u) {
      this.exp = u
      setTimeout(() => {
        const el = document.getElementById('exp')
        el.scrollIntoView(true)
      }, 100)
    },
    my_exp (list, key) {
      if (!key) {
        return []
      }
      var arr = [...list.filter((o) => {
        // console.log(o)
        let u = o.n || ''
        var re = /(.+)?[/／|丨\s]+/;
        u = u.replace(re, '');
        re = /(.+)?[〈（](.+)[）〉].*/;
        u = u.replace(re, '$2');
        u = u.replace('丨','');
        let pattern = new RegExp(key, 'i')
        return pattern.test(u)
      })]
      arr.reverse()
      return arr
    },
    my_fil (list, key) {
      if (!key) {
        return []
      }
      return list.filter((u) => {
        var re = /(.+)?[/／|丨\s]+/;
        u = u.replace(re, '');
        re = /(.+)?[〈（](.+)[）〉].*/;
        u = u.replace(re, '$2');
        u = u.replace('丨','');
        let pattern = new RegExp(key, 'i')
        return pattern.test(u)
      })
    },
    handleScroll () {
      this.n += 1
    },
    list (u) {
      var key = this.key;
      var ans = this.names.filter(function(k) {
        var re = /(.+)?[/／|丨\s]+/;
        let n = k.n.replace(re, '');
        let u2 = u.replace(re, '');
        re = /(.+)?[〈（](.+)[）〉].*/;
        n = n.replace(re, '$2');
        n = n.replace('丨','');
        re = /(.+)?[〈（](.+)[）〉].*/;
        u2 = u2.replace(re, '$2');
        u2 = u2.replace('丨','');
        return n == u2;
      });
      if (key) {
        ans = ans.filter(function(k) {
          return k.n.indexOf(key) > -1
        })
      }
      // console.log(ans)
      return ans.slice().reverse()
    },
    count (u) {
      var ans = 0;
      for (var i = 0; i < this.allnames.length; i++) {
        var re = /(.+)?[/／|丨\s]+/;
        let n = this.allnames[i].n.replace(re, '');
        u = u.replace(re, '');
        n = n.replace('丨','');
        re = /(.+)?[〈（](.+)[）〉].*/;
        n = n.replace(re, '$2');
        u = u.replace('丨','');
        u = u.replace(re, '$2');
        if (u === n) {
          ans += parseInt(this.allnames[i].number, 10);
        }
      }
      return ans;
    }
  }
}
</script>

<style scoped>

td {
  max-width:33vw !important;
}

th {
  text-align: center !important;
}

th i.icon {
  margin: .3em !important;
}

@media screen and (max-width: 600px) {
  td {
    max-width:100vw !important;
  }
}

@media screen and (min-width: 601px) {

  .my_detail {
    margin-left: 10vw;
  }
}
</style>
