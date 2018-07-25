<template>
  <div>
    <div v-for="(item, key) in styleObject">
      <div>{{key}}</div>
      <!--<input v-bind:value="item.value"-->
      <!--v-on:input="inputChange(item,index,$event)"/>-->
      <input v-model="styleObject[key]"/>
    </div>
    <div v-for="(item,key) in attrsObject" v-if="key!='style'" style="margin-top: 50px">
      <div>{{key}}</div>
      <!--<input v-bind:value="item.value"-->
      <!--v-on:input="inputChange(item,index,$event)"/>-->
      <input v-model="attrsObject[key]"/>
    </div>
    <template v-if="innerHTMLObject">
      <div>内容</div>
    <input v-model="innerHTMLObject"/>
      </template>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {

    name: "XcxEditor",
    props: ['avtiveitem'],


    computed:
      {
        ...mapState(['visualizationCode', 'itemList']),
        styleObject() {
          if (this.avtiveitem) {
            let arr = this.avtiveitem.code.attrs.style;
            return arr
          }
          return {}

        },
        attrsObject() {
          if (this.avtiveitem) {
            let arr = this.avtiveitem.code.attrs;
            return arr
          }
          return {}

        },innerHTMLObject()
        {
           if (this.avtiveitem) {
            let object = this.avtiveitem.code.innerHTML;
            return object
          }
          return undefined
        }


      }

  }
</script>

<style scoped>

</style>
