<script setup>
import { ref } from "vue";
import { useCommonStore } from "@/stores/common";
import { useRoute, useRouter } from "vue-router";
import { api } from "@/utils/axios";

const route = useRoute();
const router = useRouter();

const name = ref("");
const description = ref("");
const file = ref(null);
const common = useCommonStore();

function fileChange(e) {
  console.log(e.target.files);
  file.value = e.target.files[0];
}

function setURL(file) {
  console.log(file);
  const imageURL = URL.createObjectURL(file);
  console.log(imageURL);
  return imageURL;
}

async function menuCreate() {
  if (!name.value || !description.value || !file.value) {
    alert("빈 값이 있습니다. 내용을 전부 작성해주세요.");
  }
  const result = await api.menus.create(
    name.value,
    description.value,
    file.value
  );
  console.log(result);
  // 요청 성공
  if (result.data.success) {
    alert(result.data.message);
    router.push({ name: "menus" });
  }
  // 요청 실패
  if (!result.data.success) {
    alert(result.data.message);
  }
}

async function getMenus() {
  const result = await api.menus.findOne(route.params.id);
  name.value = result.data.name;
  description.value = result.data.description;
}

if (route.params.id) {
  common.changeTitle("메뉴 수정하기");
  getMenus();
} else {
  common.changeTitle("메뉴 추가하기");
}

async function menuUpdate() {
  const result = await api.menus.update(
    route.params.id,
    name.value,
    description.value
  );
  console.log(result);
  alert(result.data.message);
  router.push({
    name: "menus-detail",
    params: {id : result.id},
  });
}

async function updateImage() {
  const result = await api.menus.updateImage(
    route.params.id,
    file.value,
  );
  console.log(result);
  alert(result.data.message);
}
</script>

<template>
  <div class="form-wrapper">
    <div>
      <span>메뉴 이름: </span>
      <input type="text" v-model="name" />
    </div>
    <div>
      <span>메뉴 설명: </span>
      <input type="text" v-model="description" />
    </div>
    <input type="file" @change="fileChange" />
    <div v-if="route.params.id">
      <button @click="menuUpdate">메뉴 수정하기</button>
      <button @click="updateImage">이미지 수정하기</button>
    </div>
    <div v-else>
      <button @click="menuCreate">메뉴 추가하기</button>
    </div>
  </div>
  <div class="image-wrapper" v-if="file">
    <img class="selected-image" :src="setURL(file)" />
  </div>
</template>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  border: 1px solid black;
  padding: 20px;
}

.form-wrapper > * {
  margin: 10px;
}

.image-wrapper {
  margin-top: 30px;
  border: 1px solid black;
}

.selected-image {
  width: 100%;
}
</style>
