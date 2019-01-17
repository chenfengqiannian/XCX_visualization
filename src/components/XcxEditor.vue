<template>
  <div>
    <div v-for="(item, key) in styleObject" class="editor">
      <div class="editorName">{{key}}</div>
      <!--<input v-bind:value="item.value"-->
      <!--v-on:input="inputChange(item,index,$event)"/>-->
      <label>
        <textarea v-model="styleObject[key]"></textarea>
      </label>
    </div>
    <div v-for="(item,key) in attrsObject" v-if="key!='style'" class="editor">
      <div class="editorName">{{key}}</div>
      <!--<input v-bind:value="item.value"-->
      <!--v-on:input="inputChange(item,index,$event)"/>-->
      <label>
        <textarea v-model="attrsObject[key]"></textarea>
      </label>
    </div>
    <div v-if="innerHTMLObject" class="editor">
      <div class="editorName">内容</div>
      <label>
        <textarea v-model="innerHTMLObject"></textarea>
      </label>
    </div>
    <div class="editor">
      <div style="text-align: center;line-height: 71px" v-on:click="deleteEl()">删除元素</div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  import _ from 'lodash';

  export default {

    name: "XcxEditor",
    props: ['avtiveitem'],
    methods:
      {  ...mapMutations([
          'DELEL'
        ]),
        deleteEl() {
          if (this.activeIndex !== undefined && this.itemList) {
            this.DELEL()
          }
        }
      },

    computed:
      {
        ...mapGetters(['itemList']),
        ...mapState(['visualizationCode', 'activeIndex']),
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
              if (val === "")
                val = " "
              this.avtiveitem.code.innerHTML = val
            }


          },


      }
  }
</script>

<style scoped>
  .editor {
    background-color: white;
    border-radius: 6px;
    height: 71px;
    margin-bottom: 16px;

  }

  .editor textarea {
    border: none;
    color: #636681;
    font-size: 17px;
    margin-left: 18px;
    margin-top: 5px;
    width: 299px;
    height: 35px;
  }

  .editorName {
    margin-left: 18px;
    margin-top: 20px;
    color: #d2d2d2;
    font-size: 18px;
  }

</style>
