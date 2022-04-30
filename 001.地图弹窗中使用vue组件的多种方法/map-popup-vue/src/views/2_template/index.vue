<template>
  <div style="width: 100%;height: 100%;" id="map"></div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { createApp, onMounted, onBeforeUnmount } from "vue";

// 解决生产环境leaflet图标路径生效问题
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl
});

onMounted(() => {
  // 创建地图
  const map = L.map("map").setView([31.491064, 120.311889], 13);

  // 添加图层
  const baseLayer = L.tileLayer(
    "https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    {
      subdomains: "1234"
    }
  );
  map.addLayer(baseLayer);

  // 创建poi点标记
  const marker = L.marker([31.491064, 120.311889]).addTo(map);

  /* -----------
    该方法需要在vite.config.js中配置如下参数，是为了改变引入的vue运行时
     alias: {
      'vue': 'vue/dist/vue.esm-bundler.js' // 使用模板字符串时需要设置
    }
  ----------------------*/

  // 需要指定id，vue才能找到对应渲染节点
  marker.bindPopup(
    `<div id="my_popup" style="width: 200px;height: 100px;"></div>`
  );

  // 通过vue的模板字符串创建并渲染到#my_popup节点上
  const id = 666;
  let vm;
  marker.on("popupopen", e => {
    vm = createApp({
      template: `
        <div>通过vue的字符串模板创建，可以将外部的参数直接传递到data中</div>
        <div>接收到的参数值：{{ count }}</div>
        <div>
        <button @click="count++">+1</button>
        </div>
      `,
      data() {
        return {
          count: id
        };
      }
    });
    vm.mount("#my_popup");
  });

  // 弹窗关闭时，一定需要销毁vue实例！非常重要！
  marker.on("popupclose", e => {
    vm.unmount();
  });

  // 自动打开marker，方便观察
  marker.openPopup();
});
</script>
