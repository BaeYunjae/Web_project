<script setup>
import LineChart from "@/components/LineChart.vue";
import UserForm from "@/components/UserForm.vue";
import { useChartStore } from "@/stores/chart.js";
const chartStore = useChartStore();

chartStore.makeChart();
</script>

<template>
  <LineChart />
  <UserForm />
</template>
