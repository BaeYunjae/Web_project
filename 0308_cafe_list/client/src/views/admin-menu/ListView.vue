<script setup>
import { ref } from "vue";
import { useCommonStore } from "@/stores/common";
import { api } from "@/utils/axios";
import { useRouter } from "vue-router";

const common = useCommonStore();
const menus = ref([]);
const router = useRouter();

async function getMenus() {
  const result = await api.menus.findAll();
  console.log(result);
  menus.value = result.data;
}

function setImage(image_src) {
    let correctedPath = image_src.replace(/\\/g, '/');
  return `http://localhost:8080/${correctedPath}`;
}

function moveDetail(id) {
  router.push({
    name: "menus-detail",
    params: { id: id },
  });
}

common.changeTitle("메뉴 목록");
getMenus();
</script>

<template>
  <RouterLink :to="{ name: 'menus-register' }">
    <button type="button" class="order-button btn btn-outline-dark w-100">
      메뉴 추가하기
    </button>
  </RouterLink>

  <ul>
    <li v-for="menu in menus" :key="menu.id" @click="moveDetail(menu.id)">
      <div class="menu-container">
        <div
          class="menu-image"
          :style="`background-image: url(${setImage(menu.image_src)})`"
        ></div>
        <div class="menu-info-wrapper">
          <h2 class="menu-name">{{ menu.name }}</h2>
          <p class="menu-description">{{ menu.description }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.menu-container {
  display: flex;
  align-items: center;
  border-bottom: 3px solid black;
}

.menu-info-wrapper {
  margin: auto;
  text-align: center;
}

.menu-name {
  font-size: 25px;
  font-weight: bold;
}

.menu-description {
  padding-top: 10px;
}

.menu-image {
  background-size: cover;
  background-position: center;
  width: 180px;
  height: 180px;
}
</style>
