<script setup>
import { Line } from "vue-chartjs";
import { ref } from "vue";

// pinia 가져오기
import { useChartStore } from "@/stores/chart";
const chartStore = useChartStore();

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = ref({
  responsive: true,
});
</script>

<template>
  <Line id="my-chart-id" :options="chartOptions" :data="chartStore.chartData" />
</template>
