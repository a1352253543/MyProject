<template>
  <div class = 'map'></div>
</template>

<script>
    import 'ol/ol.css'
    import { Map, View } from 'ol'
    import Tile from 'ol/layer/Tile'
    import OSM from 'ol/source/OSM'

    export default {
      name: 'OsmMap',
      data () {
        return {
          map: null
        }
      },
      methods: {
        initMap () {
          // 地图实例
          this.map = new Map({
            target: "map", // 对应页面里 id 为 map 的元素
            layers: [ // 图层
              new Tile({
                source: new OSM() // 图层数据源
              })
            ],
            view: new View({ // 地图视图
              projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3857
              center: [114.064839, 22.548857], // 深圳坐标
              minZoom:10, // 地图缩放最小级别
              zoom: 12 // 地图缩放级别（打开页面时默认级别）
            })
          })
        }
      },
      mounted () {
        this.initMap();
      }
      
   
    }

</script>

<style>

</style>