<template>
  <div style="width: 100%;height: 100%;" id="map"></div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { onMounted } from "vue";

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
  // 通过iframe将另一个组件引用进来，可以通过路由传递参数
  marker
    .bindPopup(
      `<iframe style="border: 0;height: 100px;width: 200px;" src="/#/1_inner?id=666"></iframe>`
    )
    .openPopup();
});
</script>
