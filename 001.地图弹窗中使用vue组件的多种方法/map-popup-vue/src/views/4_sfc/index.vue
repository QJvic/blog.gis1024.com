<template>
  <div style="width: 100vw;height: 100vh;display: flex;flex-direction: column;">
    <link-header class="height"></link-header>
    <div style="flex:1" id="map"></div>
  </div>
</template>

<script setup>
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import {defineCustomElement, onMounted} from "vue";
import component from './component.vue';
import LinkHeader from "../../components/linkHeader.vue";

onMounted(() => {
  // 创建地图
  const map = L.map('map').setView([31.491064, 120.311889], 13);

  // 添加图层
  const baseLayer = L.tileLayer("http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}", {
    subdomains: "1234"
  });
  map.addLayer(baseLayer);

  // 创建poi点标记
  const marker = L.marker([31.491064, 120.311889]).addTo(map);

  const MyVueElement = defineCustomElement(component);
  if(!customElements.get('my-vue-element'))
  customElements.define('my-vue-element', MyVueElement)

  marker.bindPopup(`<my-vue-element j-id="666" style="width: 200px;height: 100px;"></my-vue-element>`)

  // 自动打开marker，方便观察
  marker.openPopup();
})

</script>