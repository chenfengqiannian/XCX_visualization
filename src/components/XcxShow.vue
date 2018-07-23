<template>
<div v-bind:is="currentComponent" v-bind:style="styleObject" v-bind:class="classObject" v-bind="itemattrs"
     v-on:click="selected">{{innerHTML}}
</div>
</template>
<script>
  import {mapActions} from 'vuex'
  import {mapState} from 'vuex'
  import {mapMutations} from 'vuex'
  export default  {
    data() {
      return {}


    },

    computed:
      {
        itemattrs() {
          let item = this.viewitem
          let attrs = {}
          for (let changeStyleItem in item.attrs) {
            if (changeStyleItem === "style" || changeStyleItem === "class")
              continue
            attrs[changeStyleItem] = item.attrs[changeStyleItem];
          }
          return attrs;
        },
        styleObject() {

          return this.viewitem.attrs.style;
        },
        innerHTML() {
          let item = this.viewitem;
          return item["innerHTML"];
        },
        classObject() {
         let item = this.viewitem;
          return item["attrs"]["class"]
        },
        currentComponent() {
          let item = this.viewitem;
          return item["htmlTag"];
        },

      },
    mounted() {
      // this.getInitData();

    },
    methods:
      {
        ...mapMutations([
          'SETINDEX','SETITEM'
        ]),
        selected() {
          for (let i of this.$parent.$children) {
            i.$vnode.componentInstance.$el.className = "";
          }
          this.$vnode.componentInstance.$el.className = "itemActive";
          this.SETINDEX(this.index)
        }
      },

    props: ['viewitem',"index"],

  }


</script>

<style scoped>
.itemActive{
   border:1px solid aqua;
}
</style>
