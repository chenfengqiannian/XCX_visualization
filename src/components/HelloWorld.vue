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
              <div>[[group.id]]--[[group.text]]</div>
              <div v-for="page in group.pageItems" v-if="page.id > -1">
                [[page.id]]--[[page.text]]
              </div>
            </div>
          </div>
          <div v-else>
            <div class="base">
              <!--   base  -->
              <draggable v-model="panelItems" :options="panelOption">
                <div v-for="item in panelItems" class="panelbox">
                  [[item.name]]
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
        <draggable class="view" v-model="viewItems" :options="viewOption">
          <my-component v-for="item in viewItems" v-bind:viewitem="item.code"></my-component>
        </draggable>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
