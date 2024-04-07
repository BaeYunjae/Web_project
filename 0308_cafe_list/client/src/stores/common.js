import { ref } from "vue";
import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", () => {
  const title = ref("SSAFY-CAFE");
  function changeTitle(newTitle) {
    title.value = newTitle;
  }
  return { title, changeTitle };
});
