<script setup>
import { useCommonStore } from "@/stores/common";

const common = useCommonStore();
common.changeTitle("SSAFY-CAFE");
</script>

<template>
  <main class="main-container">
    <div class="order-button-wrapper">
      <RouterLink :to="{ name: 'order-register' }">
        <button type="button" class="order-button btn btn-outline-dark">
          주문하기
        </button>
      </RouterLink>
    </div>

    <div class="order-button-wrapper">
      <RouterLink :to="{ name: 'orders' }">
        <button type="button" class="order-button btn btn-outline-dark">
          주문 내역 조회하기
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

.order-button-wrapper,

.icon-wrapper {
    text-align: center;
    margin-top: 30px;
}

.main-icon {
    font-size: 80px;
}

.order-button {
    min-width: 180px;
}

</style>