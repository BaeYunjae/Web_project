<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "@/utils/axios";

const router = useRouter();
const route = useRoute();

const data = ref(null);

async function getMenu() {
  const result = await api.menus.findOne(route.params.id);
  console.log(result.data);
  data.value = result.data;
}

function setImage() {
  return `http://localhost:8080/${data.value.image_src}`;
}

function moveRegister() {
  router.push({
    name: "menus-update",
    params: { id: route.params.id },
  });
}

async function deleteMenu() {
    const confirmResult = confirm("삭제하시겠습니까?");
    if (confirmResult) {
        const result = await api.menus.delete(route.params.id);
        alert(result.data.message);
        router.push({name: "menus"});
    }
}
function moveList() {
  router.push({ name: "menus" });
}

getMenu();
</script>

<template>
  <div class="card mb-2" v-if="data">
    <img :src="setImage()" class="card-img-top" alt="menu" />
    <div class="card-body">
      <h5 class="card-title">{{ data.name }}</h5>
      <p class="card-text">{{ data.description }}</p>
      <button type="button" class="btn btn-primary" @click="moveRegister">
        수정하기
      </button>
      <button type="button" class="btn btn-danger" @click="deleteMenu">
        삭제
      </button>
      <button type="button" class="btn btn-outline-primary" @click="moveList">
        목록
      </button>
    </div>
  </div>
</template>

<style scoped></style>
