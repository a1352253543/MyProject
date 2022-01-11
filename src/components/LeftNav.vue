<template>
  <div>
      <el-aside width="300px" >
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          
          router = 'false'><!--是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转  -->
           <!-- 设置了没用 -->

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>加载WMTS</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="OsmMap">加载OSM地图</el-menu-item>
              <el-menu-item index="GaoDeMap">加载高德地图</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>功能</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="Popup">点击地图实现弹窗功能</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          
        </el-menu>
      </el-aside>
  </div>
</template>

<script>
export default {
    name:'LeftNav',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style>

</style>