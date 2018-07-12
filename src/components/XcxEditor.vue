<template>
  <div>
    <div v-for="item in styleList">
      <div>{{item.name}}</div>
      <input v-model="frfr"/>
      <p>Message is: {{ frfr }}</p>

    </div>
  </div>
</template>
<script>
  export default {
    data()
      {
        return
        {
          frfr:""
        }
      }
    ,
    name: "XcxEditor",
    props: ['avtiveitem'],
    mounted() {
      this.$watch('frfr',function(newval, val) {
        console.log(1111)
      },{deep:true})
    },
    // watch:
    //   {
    //     styleList: {
    //       handler(value, oldValue) {
    //         let copiedValue = Object.assign({}, value)
    //         console.log(copiedValue)
    //       },
    //       deep: true
    //     }
    //   },
    computed:
      {
        styleList() {
          if (this.avtiveitem) {
            let cloneitem=Object.assign({}, this.avtiveitem)
            let item = JSON.parse(cloneitem.code)
            return item.attrs.style
          }
          return []

        }
      }

  }
</script>

<style scoped>

</style>
