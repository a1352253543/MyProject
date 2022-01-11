<template>
  <div>
      <el-container style="height: 900px; border: 1px solid #eee">

        <el-aside>
          <LeftNav></LeftNav>
        </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span style="font-size:30px;text-align: center;display:block;">欢迎使用XXX地理信息系统</span>
        </el-header>

        <el-main >
          <div id = 'map' style="height: 100%;" >
            <router-view></router-view>   
          </div>
        </el-main>

      </el-container>

      </el-container>
  </div>
</template>

<script>

  import LeftNav from './LeftNav.vue'
  export default {
    name:'Layout',
    template:`
    <div>
      <LeftNav></LeftNav>
    <div>
    `,
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components:{
      LeftNav
    }
   
  }
</script>

<style>
    .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
    }

    .el-aside {
      color: #333;
    }
    
    
  
</style>