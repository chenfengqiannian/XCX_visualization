<template>
  <div v-wechat-title="$route.meta.title"  class="main" id="app">
    <div class="top">

      <div v-bind:class="" v-on:click="tabActive=true"
           style="margin-left: 82px;width: 149px;color: #5355c3;font-size: 17px">页面管理
      </div>
      <div v-bind:class="" v-on:click="tabActive=false"
           style="margin-left: 62px;width: 110px;color: #5355c3;font-size: 17px">组件库
      </div>
      <div style="line-height: 58px;height:58px;width: 100%;font-size: 21px;color: #5355c3;text-align: center">予丰科技小程序<span
        style="color: #f2926d">可视化</span></div>
      <div style="width: 227.954px"></div>
      <input type="button" v-on:click="sc" value="生成"
             style="border-radius: 5px;line-height: 34px;font-size: 15px;height:34px;width: 131px;background-color: #5355c3;text-align: center;color: white;margin-right: 51px"/>

    </div>
    <div class="bottom">
      <div class="fleft" style="height:90%;width: 323px;margin-left: 47px;border-top-left-radius:6px;
border-top-right-radius:6px;overflow-y: hidden">
        <div class="leftContent">
          <div class="panel" v-bind:class="{classPanelItems}" style="text-align: left;background-color: white;">
            <div v-if="tabActive">
              <ul v-for="(group,index) in groupItems" v-if="group.id > -1" v-on:click="chooseGroup(group.id)">
                <li>
                  <div class="group pub" v-bind:class="{ groupActive: (activeGroupId===group.id && groupOrItem===0)}"
                       v-on:click="chooseIndex=index">
                    <div class="leftImg groupImg"></div>
                    {{group.text}}
                    <span class="leftImg pubDelete" v-on:click="deleteGroupOrPage(0,index)"></span>
                  </div>
                  <template v-if="index===chooseIndex">
                    <ul v-for="(page,index2) in group.pageItems" v-if="page.id > -1">
                      <li class="member pub" v-bind:class="{ active: (cactivePageId===page.id && groupOrItem===1) }"
                          @click.stop="mberClick(page.id)">
                        <div class="leftImg memberImg"></div>
                        {{page.text}}
                        <span class="leftImg pubDelete" v-on:click="deleteGroupOrPage(1,index2)"></span>
                      </li>
                    </ul>
                  </template>
                </li>
              </ul>
            </div>
            <template v-else>
              <div class="base">
                <!--   base  -->
                <draggable v-model="panelItems" :options="panelOption" class="panelFather">
                  <div v-for="item in panelItems" class="panelbox">
                    <img v-bind:src="item.images" class="panel-img"/>
                    <div class="panelbox-text">{{item.name}}</div>
                  </div>
                </draggable>
              </div>


            </template>
          </div>

          <div class="new" v-if="tabActive">
            <input type="button" value="添加页面" class="newButton" v-on:click="createPage"/>
            <input type="button" value="添加分组" class="newButton" v-on:click="createGroup"/>
          </div>
        </div>
      </div>
      <div class="fcentre" style="height:90%;width: 335px;background-color: white">

        <div class="rightContent">

          <!--320x520-->
          <draggable class="view" v-model="viewItems" :options="viewOption">
            <XcxShow v-for="(item, index) in viewItems"
                     v-bind:viewitem="item.code"
                     v-bind:index="index"
                     v-bind:key="index"


            ></XcxShow>
          </draggable>

          <!--<XcxEditor v-bind:avtiveitem="avtiveItem" class="changeItemView"-->
          <!--style="display: inline-block;vertical-align: top;"></XcxEditor>-->
        </div>
      </div>
      <div class="fright" style="height:90%;width: 323px;margin-right: 47px;">
        <XcxEditor v-bind:avtiveitem="avtiveItem" class="changeItemView"
                   style="display: inline-block;vertical-align: top;width: 100%"></XcxEditor>
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
        //drag panel to view
        // viewItems: Object.assign({}, this.itemList),
        groupOrItem: 0,

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
      this.debouncedSend = _.debounce(this.sendGroupList, 1000)
    }
    ,
    mounted: function () {
      // this.getInitData();
      // console.log(this.getQueryVariable("id"))
      this.getCode();
      this.getData(this.getQueryVariable("id"))


    },
    methods:
      {

        ...mapMutations([
          'CODE', 'SETITEM', 'ADDPAGE', 'DELPAGE', 'DELGROUP','SETACTIVEID', 'SETGUROP', 'SETACTIVEGRUOPID'
        ]),
        ...mapActions([
          'getCode',
          'sendGroupList',
          'getData'
        ]),

        deleteGroupOrPage(type,index)
        { console.log(type)
          console.log(index)
          if(type===0)
          {this.DELGROUP(index)

          }
          if(type===1)
          {
            this.DELPAGE(index)
          }
        },
        sc() {
          let id = this.getQueryVariable("id")
          window.location.href = window.location.origin + "/setting/?c_id=" + id
        },
        mberClick(id) {
          this.SETACTIVEID(id)

          this.groupOrItem = 1

        },
        chooseGroup(chooseId) {
          this.SETACTIVEGRUOPID(chooseId)

          this.groupOrItem = 0
        }
        ,
        createPage() {
          let slastPageId = this.lastPageId + 1
          let self = this
          let obj = this.groupItems.find((val) => {
            return val.id === self.activeGroupId
          })
          if (obj) {
            obj.pageItems.push({
              id: slastPageId,
              text: "新页面",
              template: "custom",
              name: "page" + slastPageId,
              itemList: []
            })
            this.SETACTIVEID(slastPageId)
          }

        }
        ,
        createGroup() {
          let slastGroupId = _.cloneDeep(this.lastGroupId) + 1
          this.SETACTIVEGRUOPID(slastGroupId)
          this.groupItems.push({
            id: slastGroupId,
            text: '新组',
            pageItems: []
          })
        },


      },

    computed:
      {
        ...mapGetters(['activePage', 'itemList', 'lastGroupId', 'lastPageId']),
        ...mapState(['visualizationCode', 'activeIndex', 'activePageId', 'activeGroupId', 'pageList', 'v_groupItems']),
        classPanelItems() {
          if (this.tabActive === false) {
            return "classPanelItems"
          }
          return
        },
        cactivePageId() {
          return this.activePageId
        },
        viewItems: {
          get() {
            return this.itemList
          },
          set(val) {
            let valList = _.cloneDeep(val)
            // let valList = JSON.parse(JSON.stringify(val));
            this.SETITEM(valList)
          }
        },
        groupItems: {
          get() {
            return this.v_groupItems
          },
          set(val) {
            let valList = _.cloneDeep(val)
            // let valList = JSON.parse(JSON.stringify(val));
            this.SETGUROP(valList)
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
        v_groupItems: {
          handler: function (newVal, oldVal) {
            this.debouncedSend()
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
