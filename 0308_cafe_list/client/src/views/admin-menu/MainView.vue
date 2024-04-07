<script setup>
import { useCommonStore } from "@/stores/common";

const common = useCommonStore();
common.changeTitle("SSAFY-CAFE-관리자");
</script>

<template>
  <main class="main-container">
    <div class="menu-button-wrapper">
      <RouterLink :to="{ name: 'menus-register' }">
        <button type="button" class="menu-button btn btn-outline-dark">
          메뉴 추가하기
        </button>
      </RouterLink>
    </div>

    <div class="menu-button-wrapper">
      <RouterLink :to="{ name: 'menus' }">
        <button type="button" class="menu-button btn btn-outline-dark">
          메뉴 조회하기
        </button>
      </RouterLink>
    </div>

    <div class="icon-wrapper">
      <span class="main-icon material-symbols-outlined"> local_cafe </span>
    </div>
  </main>
</template>

<style scoped>
.main-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.menu-button-wrapper,

.icon-wrapper {
    text-align: center;
    margin-top: 30px;
}

.main-icon {
    font-size: 80px;
}

.menu-button {
    min-width: 180px;
}

</style>