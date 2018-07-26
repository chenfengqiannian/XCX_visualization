<template>
  <div class="main" id="app">

    <div class="left fl">
      <div class="leftHeader">
        <ul>
          <li v-bind:class="" v-on:click="tabActive=true"><a>页面管理</a></li>
          <li v-bind:class="" v-on:click="tabActive=false"><a>组件库</a></li>
        </ul>
      </div>

      <div class="leftContent">
        <div class="panel" style="text-align: left">
          <div v-if="tabActive">
            <ul v-for="(group,index) in groupItems" v-if="group.id > -1" v-on:click="chooseGroup(group.id)">
              <li>
                <div class="group pub" v-on:click="chooseIndex=index">{{group.text}}<span
                  style="float: right;margin-right: 10px">添加</span></div>
                <template v-if="index===chooseIndex">
                  <ul v-for="(page,index2) in group.pageItems" v-if="page.id > -1">
                    <li class="member pub" v-bind:class="{ active: cactivePageId===page.id }"
                        @click="mberClick(page.id)">{{page.text}},{{page.id}}
                    </li>
                  </ul>
                </template>
              </li>
            </ul>
          </div>
          <div v-else>
            <div class="base">
              <!--   base  -->
              <draggable v-model="panelItems" :options="panelOption" class="panelFather">
                <div v-for="item in panelItems" class="panelbox">
                  <img v-bind:src="item.images" class="panel-img"/>
                  <div class="panelbox-text">{{item.name}}</div>
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
            <li><a class="icon" style="display: none">风格</a></li>
            <li><a class="icon" style="display: none">管理</a></li>
            <li><a href="" class="icon" style="display: none">帮助</a></li>
            <li><a href="" class="icon" style="display: none">客服</a></li>
            <li><a href="" class="icon" style="display: none">历史</a></li>
          </ul>
        </div>
        <div class="rightArea fr">
          <input type="button" value="预览" class="pre psButton" style="display: none" v-on:click=""/>
          <input type="button" value="保存" class="pre psButton" style="display: none" v-on:click=""/>
          <input type="button" value="生成" class="pre pdButton" v-on:click=""/>
        </div>
      </div>
      <div class="rightContent">

        <!--320x520-->
        <draggable class="view" v-model="viewItems" :options="viewOption">
          <XcxShow v-for="(item, index) in viewItems"
                   v-bind:viewitem="item.code"
                   v-bind:index="index"
                   v-bind:key="index"


          ></XcxShow>
        </draggable>

        <XcxEditor v-bind:avtiveitem="avtiveItem" class="changeItemView"
                   style="display: inline-block;vertical-align: top;"></XcxEditor>
      </div>
    </div>

  </div>

</template>

<script>
  import draggable from 'vuedraggable'
  import {API} from '../data/api'
  import global_ from '../Global'
  import _ from 'lodash';
  import {mapActions} from 'vuex'
  import {mapState} from 'vuex'
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'
  import XcxShow from '@/components/XcxShow'
  import XcxEditor from '@/components/XcxEditor'


  export default {
    data() {
      return {
        tabActive: true,
        groupId: -1,
        atGroupId: 0,
        chooseIndex: 0,
        groupItems: [],
        //drag panel to view
        // viewItems: Object.assign({}, this.itemList),


        panelOption: {
          group: {
            name: 'pv',
            pull: 'clone',
            put: false,
          },
          sort: false,
          animation: 150,
          clone: true
        },
        viewOption: {
          group: {
            name: 'pv',
            pull: false,
            put: true,
          },
          clone: true,
          animation: 150,
        },
      }

    },
    components: {
      draggable,
      XcxShow,
      XcxEditor
    },
    created: function () {
      // this.debouncedSend = _.debounce(this.sendItemList,1000)
    }
    ,
    mounted: function () {
      // this.getInitData();
      console.log(this.getQueryVariable("id"))
      this.getCode();
      this.getData(this.getQueryVariable("id"))
      // this.createGroup()
      // this.createPage();

    },
    methods:
      {

        ...mapMutations([
          'CODE', 'SETITEM', 'ADDPAGE', 'DELPAGE', 'SETACTIVEID'
        ]),
        ...mapActions([
          'getCode',
          'sendItemList',
          'getData'
        ]),
        mberClick(id) {
          this.SETACTIVEID(id)
        },
        chooseGroup(chooseId) {
          this.atGroupId = chooseId
          console.log(this.rawJson)
        }
        ,
        createPage() {
          this.ADDPAGE(global_.PageId++)
          let page = this.activePage
          if (this.groupId > -1) {
            this.groupItems[this.atGroupId].pageItems.push(page)
          }

        }
        ,
        createGroup() {
          this.groupId++;
          this.groupItems.push({
            id: this.groupId,
            text: '新组',
            pageItems: []
          })
        },


      },

    computed:
      {
        ...mapGetters(['activePage', 'itemList']),
        ...mapState(['visualizationCode', 'activeIndex', 'activePageId', 'pageList']),
        cactivePageId() {
          return this.activePageId
        },
        viewItems: {
          get() {
            return this.itemList
          },
          set(val) {
            let valList=_.cloneDeep(val)
            // let valList = JSON.parse(JSON.stringify(val));
            this.SETITEM(valList)
          }
        },

        panelItems() {
          return this.visualizationCode
        },
        avtiveItem() {
          // console.log(this.activeIndex)
          // console.log(this.viewItems)
          // console.log(this.viewItems[this.activeIndex])
          // Object.assign({}, this.viewItems[this.activeIndex])
          return this.viewItems[this.activeIndex]
          // {console.log(this.activeIndex)
          //
          //   if (this.activeIndex)
          //   return [this.viewItems[0],this.viewItems[1],this.viewItems[2]]
          //   else
          //     return {}
        },

      },
    watch:
      {
        pageList: {
          handler: function (newVal, oldVal) {
            // this.debouncedSend()
          },
          deep: true
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
