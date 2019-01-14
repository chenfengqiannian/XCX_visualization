<template>
  <div>
    <div v-for="(item, key) in styleObject" class="editor">
      <div class="editorName">{{key}}</div>
      <!--<input v-bind:value="item.value"-->
      <!--v-on:input="inputChange(item,index,$event)"/>-->
      <textarea v-model="styleObject[key]"/>
    </div>
    <div v-for="(item,key) in attrsObject" v-if="key!='style'" class="editor">
      <div class="editorName">{{key}}</div>
      <!--<input v-bind:value="item.value"-->
      <!--v-on:input="inputChange(item,index,$event)"/>-->
      <textarea v-model="attrsObject[key]"/>
    </div>
    <div v-if="innerHTMLObject" class="editor">
      <div class="editorName">内容</div>
      <textarea v-model="innerHTMLObject"/>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import {mapActions} from 'vuex'
  import _ from 'lodash';

  export default {

    name: "XcxEditor",
    props: ['avtiveitem'],


    computed:
      {
        ...mapState(['visualizationCode']),
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

        }
        , innerHTMLObject:
          {
            get() {
              if (this.avtiveitem) {
                let object = this.avtiveitem.code.innerHTML;
                return object
              }
              return undefined

            },
            set(val) {
              if(val==="")
                val=" "
              this.avtiveitem.code.innerHTML = val
            }


          },




      }
  }
</script>

<style scoped>
.editor
{
  background-color: white;
  border-radius: 6px;
  height: 71px;
  margin-bottom: 16px;

}
  .editor textarea
  {
    border:none;
    color: #636681;
    font-size: 17px;
    margin-left: 18px;
    margin-top: 5px;
    width:299px;
    height: 35px;
  }
  .editorName
  {margin-left: 18px;
  margin-top: 20px;
    color: #d2d2d2;
    font-size: 18px;
  }

</style>
