<template>
  <div class="container">
    <div>
      当前字库有{{ dataKeys.length }}个一/二级简码，将随机出现 <br>
      欢迎提供字符映射表（JSON格式），进行拓展。
    </div>
    <div class="word-box">{{ displayWord }}</div>
    <div>
      <label>
        <input class="word-input" type="text" v-model="currentWordSpell" />
      </label>
    </div>
    <div class="tip">{{ tip }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import data from "~/assets/data";

const dataKeys = Object.keys(data);
const currentWordSpell = ref("");
const index = ref<number | null>(null);
const tip = ref("按回车确认输入");

const displayWord = computed(() => {
  const i = index.value;
  if (i === null) return null;
  return dataKeys[i] ?? null;
});

function randomIndex() {
  index.value = Math.floor(Math.random() * dataKeys.length);
}

function handleKeyup(ev: KeyboardEvent) {
  tip.value = "按回车确认输入";
  if (ev.code === "Enter" || ev.keyCode === 13) {
    const word = displayWord.value;
    if (word === null) return; // 空字库保护
    if (currentWordSpell.value === data[word]) {
      randomIndex();
    } else {
      tip.value = `输入错误，正确为：${data[word]}`;
    }
    currentWordSpell.value = "";
  }
}

onMounted(() => {
  randomIndex();
  window.addEventListener("keyup", handleKeyup);
});

onUnmounted(() => {
  window.removeEventListener("keyup", handleKeyup);
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.word-box {
  margin-top: 10px;
  border: 1px dashed #000;
  font-size: 80px;
  padding: 10px;
}
.word-input {
  margin-top: 10px;
  width: 80px;
  font-size: 30px;
  text-align: center;
}
.tip {
  margin-top: 10px;
}
</style>
