import { ref } from "vue";
import { defineStore } from "pinia";
import dataLab from "@/utils/api";

export const useChartStore = defineStore("chart", () => {
  const chartData = ref({
    labels: ["2023-04-01", "2023-05-01", "2023-06-01"],
    datasets: [
      {
        label: "A",
        backgroundColor: "blue",
        borderColor: "blue",
        data: [7.17983, 8.21018, 15.56848],
        tension: 0.3,
      },
      {},
    ],
  });

  function setChartData(data) {
    chartData.value = data;
  }

  function makeColor() {
    return "#" + Math.round(Math.random() * 0xffffff).toString(16);
  }

  async function makeChart() {
    try {
      const response = await dataLab.get();

      const chartData = {
        labels: response.data[0].data.map((li) => li.period),
        datasets: response.data.reduce((acc, cur) => {
          const label = cur.title;
          const data = cur.data.map((li) => li.ratio);
          acc.push({
            label: label,
            data: data,
            fill: false,
            backgroundColor: makeColor(),
            borderColor: makeColor(),
          });
          return acc;
        }, []),
      };

      setChartData(chartData);
    } catch (error) {
      console.log(error);
    }
  }

  return { chartData, setChartData, makeChart };
});
