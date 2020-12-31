<template>
  <div>
    <string
      v-for="(string, index) in strings"
      :key="index"
      :fret="
        fretboardDiagram[index] || fretboardDiagram[index] === 0
          ? fretboardDiagram[index]
          : 'empty'
      "
    ></string>
  </div>
</template>

<script>
import String from "./String.vue";
import Strings from "./Strings";
export default {
  components: { String },
  data() {
    return {
      strings: Strings
    };
  },
  props: ["fretboardDiagram"]
};
</script>

<style></style>
