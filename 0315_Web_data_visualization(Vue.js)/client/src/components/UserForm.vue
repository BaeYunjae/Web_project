<script setup>
import dataLab from "@/utils/api";
import { ref } from "vue";
import { useChartStore } from "@/stores/chart";
const chartStore = useChartStore();

const startDate = ref("");
const endDate = ref("");
const timeUnit = ref("month");
const keywordGroups = ref([]);
const userInputGroupName = ref("");
const userInputKeyword = ref("");
const tempGroupName = ref("");
const tempKeywords = ref([]);
const toApiData = ref({});

const ages = ref("모든 연령");
const tempAge = ref([]);
const ageGroups = [
  { value: "1", age: "0~12세" },
  { value: "2", age: "13~18세" },
  { value: "3", age: "19~24세" },
  { value: "4", age: "25~29세" },
  { value: "5", age: "30~34세" },
  { value: "6", age: "35~39세" },
  { value: "7", age: "40~44세" },
  { value: "8", age: "45~49세" },
  { value: "9", age: "50~54세" },
  { value: "10", age: "55~59세" },
  { value: "11", age: "60세 이상" },
];

function tempGroupAdd() {
  tempGroupName.value = userInputGroupName.value;
}

function tempKeywordAdd() {
  tempKeywords.value.push(userInputKeyword.value);
  userInputKeyword.value = "";
}

function tempAgeAdd(event) {
  if (event.target.value === "모든 연령")
    tempAge.value = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
  else tempAge.value = [event.target.value];
}

function makeGroup() {
  keywordGroups.value.push({
    groupName: tempGroupName.value,
    keywords: tempKeywords.value,
  });

  tempGroupName.value = "";
  tempKeywords.value = [];

  userInputGroupName.value = "";
}

async function sendResultToApi() {
  toApiData.value = {
    startDate: startDate.value,
    endDate: endDate.value,
    timeUnit: timeUnit.value,
    keywordGroups: keywordGroups.value,
    ages: tempAge.value,
  };

  console.log(toApiData);

  await dataLab.post(toApiData.value);
  chartStore.makeChart();
}
</script>

<template>
  <br />
  <select v-model="ages" @change="tempAgeAdd($event)">
    <option value="모든 연령">모든 연령</option>
    <option v-for="age in ageGroups" :value="age.value">{{ age.age }}</option>
  </select>
  <div>시작일 <input type="date" v-model="startDate" /></div>
  <div>종료일 <input type="date" v-model="endDate" /></div>
  <select v-model="timeUnit">
    <option value="date">일간</option>
    <option value="week">주간</option>
    <option value="month">월간</option>
  </select>
  <div>
    그룹명: <input type="input" v-model="userInputGroupName" />
    <button @click="tempGroupAdd">추가</button>
    {{ tempGroupName }}
  </div>
  <div>
    키워드: <input type="input" v-model="userInputKeyword" />
    <button @click="tempKeywordAdd">추가</button>
    {{ tempKeywords }}
  </div>
  <div>
    <button @click="makeGroup">그룹 확정</button>
  </div>
  <p>사용자 입력 그룹별 키워드</p>
  <ul v-if="keywordGroups.length">
    <li v-for="(keywordGroup, index) in keywordGroups" :key="index">
      <p>그룹 이름: {{ keywordGroup.groupName }}</p>
      <p>그룹 키워드: {{ keywordGroup.keywords }}</p>
    </li>
  </ul>
  <input type="submit" @click="sendResultToApi" />
</template>
