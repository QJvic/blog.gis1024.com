<template>
  <div style="width: 100%;height: 100%;" id="map"></div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { createApp, onMounted } from "vue";
import component from "./component.vue";

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

  // 需要指定id，vue才能找到对应渲染节点
  marker.bindPopup(
    `<div id="my_popup" style="width: 200px;height: 100px;"></div>`
  );

  // 使用引入的sfc文件创建vue实例
  const id = 666;
  let vm;
  marker.on("popupopen", e => {
    vm = createApp(component, { id: id });
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
