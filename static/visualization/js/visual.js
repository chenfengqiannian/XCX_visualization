require.config({
    urlArgs: "ver=1.0_0",
    paths: {
        "vue": 'vue.min2',
        "sortablejs": 'Sortable',
        "vuedraggable": 'vuedraggable',
        "my-component": 'myComponent',

    },
    shim: {
        'vue': {
            exports: 'vue'
        }
    }
}),


    require(['vue', 'vuedraggable', 'my-component'], function (Vue, draggable) {

        //Vue.component('draggable', draggable);
        var app = new Vue({
            el: '#app',
            data: {
                //tab
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

                //text


            },

            components: {
                draggable,
                'my-component': myComponentIns
            },


            delimiters: ["[[", "]]"],

            mounted: function () {
                this.getInitData();
            },

            methods: {

                //---------------------------------------------tab------------------------------------------------
                pageManage: function () {
                    this.tabActive = true
                },
                package: function () {
                    this.tabActive = false
                },

                //-------------------------------------create page and group-------------------------------------
                createPage: function () {
                    if (this.groupId > -1) {
                        this.groupItems[this.atGroupId].pageItems.push({
                            id: 0,
                            text: '未命名页面'
                        })
                    }
                },
                createGroup: function () {
                    this.groupId++;
                    this.groupItems.push({
                        id: this.groupId,
                        text: '未命名组',
                        pageItems: []
                    })
                },

                //---------------------------------------choose page and group-----------------------------------
                chooseGroup: function (chooseId) {
                    this.atGroupId = chooseId
                },


                //============================================ Drag ==================================================
                jsonToHtml: function () {

                },

                //---------------------------------------------network-----------------------------------------------
                getInitData: function () {
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
        })


    })




















