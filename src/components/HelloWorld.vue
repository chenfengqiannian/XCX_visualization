<template>
  <div class="main" id="app">

    <div class="left fl">
      <div class="leftHeader">
        <ul>
          <li v-bind:class="" v-on:click="pageManage"><a>页面管理</a></li>
          <li v-bind:class="" v-on:click="package"><a>组件库</a></li>
        </ul>
      </div>

      <div class="leftContent">
        <div class="panel">
          <div v-if="tabActive">
            <div v-for="group in groupItems" v-if="group.id > -1" v-on:click="chooseGroup(group.id)">
              <div>{{group.id}}--{{group.text}}</div>
              <div v-for="page in group.pageItems" v-if="page.id > -1">
                {{page.id}}--{{page.text}}
              </div>
            </div>
          </div>
          <div v-else>
            <div class="base">
              <!--   base  -->
              <draggable :options="panelOption">
                <div v-for="item in panelItems" class="panelbox">

                </div>
              </draggable>
            </div>

            <div class="leftHeader">
              <ul>
                <li style="padding-left: 53px;">布局</li>
                <li style="padding-left: 53px;">高级</li>
                <li style="padding-left: 53px;">其他</li>
              </ul>
            </div>

            <div class="layout">
              <!--   layout   -->
              <table width="295px">

              </table>
            </div>
          </div>
        </div>

        <div class="new" v-if="tabActive">
          <input type="button" value="添加页面" class="newButton" v-on:click="createPage"/>
          <input type="button" value="添加分组" class="newButton" v-on:click="createGroup"/>
        </div>
      </div>
    </div>


    <div class="right fr">
      <div class="rightHeader">
        <div class="leftArea fl">
          <ul>
            <li><a href="" class="icon">风格</a></li>
            <li><a href="" class="icon">管理</a></li>
            <li><a href="" class="icon">帮助</a></li>
            <li><a href="" class="icon">客服</a></li>
            <li><a href="" class="icon">历史</a></li>
          </ul>
        </div>
        <div class="rightArea fr">
          <input type="button" value="预览" class="pre psButton" v-on:click=""/>
          <input type="button" value="保存" class="pre psButton" v-on:click=""/>
          <input type="button" value="生成" class="pre pdButton"/>
        </div>
      </div>
      <div class="rightContent">

        <!--320x520-->
        <draggable class="view" :options="viewOption">
          <my-component v-for="item in viewItems" v-bind:viewitem="item.code"></my-component>
        </draggable>
      </div>
    </div>

  </div>

</template>

<script>
  import axios from 'axios'
  import draggable from 'vuedraggable'

  let myComponentIns = {

    data: {
      item: {}
    },

    props: ['viewitem'],


    //render
    render: function (createElement) {

      //analyze string and insert the data to check the property change
      this.item = JSON.parse(this.viewitem);


      return createElement('p', this.viewitem)
    }
  }
  export default {
    name: 'HelloWorld',
    data() {
      return {
        tabActive: true,
        groupId: -1,
        atGroupId: 0,
        groupItems: [],

        //drag panel to view
        viewItems: [],
        panelItems: [],
        panelOption: {
          group: {
            name: 'pv',
            pull: 'clone',
            put: false,
          },
          sort: false,
          animation: 150,
        },
        viewOption: {
          group: {
            name: 'pv',
            pull: false,
            put: true,
          },
          animation: 150,
        },
      }

    },
    components: {
      draggable,
      'my-component': myComponentIns
    }
    ,
    mounted: function () {
      this.getInitData();
    },
    methods:
      {

        pageManage() {
          this.tabActive = true
        },
        package() {
          this.tabActive = false
        }
        ,
        chooseGroup(chooseId) {
          this.atGroupId = chooseId
        }
        ,
        createPage() {
          if (this.groupId > -1) {
            this.groupItems[this.atGroupId].pageItems.push({
              id: 0,
              text: '未命名页面'
            })
          }
        }
        ,
        createGroup() {
          this.groupId++;
          this.groupItems.push({
            id: this.groupId,
            text: '未命名组',
            pageItems: []
          })
        }
        ,
        getInitData() {
          var self = this;  //呵呵
          axios.get('http://0.0.0.0:8000/api/visualizationcode/')
            .then(function (response) {
              //处理response json
              self.panelItems = response.data;
              console.log(self.panelItems);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../static/visualization/css/visualLeft.css";
  @import "../../static/visualization/css/visualRight.css";
  @import "../../static/visualization/css/common.css";
</style>
