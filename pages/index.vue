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

<script>
import _ from "lodash";
import data from "~/assets/data";
export default {
  name: "index",
  data() {
    return {
      data,
      dataKeys: Object.keys(data),
      currentWordSpell: "",
      index: null,
      tip: "按回车确认输入"
    };
  },
  computed: {
    displayWord() {
      if (this.index !== null) {
        return this.dataKeys[this.index];
      } else {
        return null;
      }
    }
  },
  mounted() {
    this.randomIndex();

    window.addEventListener("keyup", ev => {
      this.tip = "按回车确认输入";
      if (ev.code === "Enter" || ev.keyCode === 13) {
        if (this.currentWordSpell === this.data[this.displayWord]) {
          this.randomIndex();
        } else {
          this.tip = `输入错误，正确为：${this.data[this.displayWord]}`;
        }
        this.currentWordSpell = "";
      }
    });
  },
  methods: {
    randomIndex() {
      this.index = _.random(0, this.dataKeys.length - 1);
    }
  }
};
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
