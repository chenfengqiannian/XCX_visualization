<template>
  <div>
    <div v-for="(item,index) in styleList">
      <div>{{item.name}}</div>
      <!--<input v-bind:value="item.value"-->
             <!--v-on:input="inputChange(item,index,$event)"/>-->
      <input v-model="item.value"/>
      <p>Message is: {{ item.value }}</p>

    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {

    name: "XcxEditor",
    props: ['avtiveitem'],



    computed:
      {...mapState(['visualizationCode','itemList']),
        styleList() {
          if (this.avtiveitem) {
            return this.avtiveitem.code.attrs.style
          }
          return []

        }
      }

  }
</script>

<style scoped>

</style>
