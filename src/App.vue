<template>  
  <div id = 'app'>
    
    <Layout/>
    <!-- <OsmMap/>
    <GaoDeMap/> -->
    
  </div>
  
</template>

<script>
  import Layout from './components/Layout.vue'
  // import OsmMap from './pages/OsmMap.vue'
  // import GaoDeMap from './pages/GaoDeMap.vue'

// 路由组件好像不能写在App里，要不然就直接呈现在页面中了

  export default {
    name:'app',
    components:{
      Layout,
      // OsmMap,
      // GaoDeMap
    }

  }

  
</script>

<style>

</style>