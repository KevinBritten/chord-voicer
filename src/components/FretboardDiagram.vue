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
      :voice="intervalList[voicing[index]]"
    ></string>
    <hr />
  </div>
</template>

<script>
import String from "./String.vue";
import Strings from "./Strings";
export default {
  components: { String },
  data() {
    return {
      strings: Strings,
      intervalList: {
        0: "r",
        1: "m2",
        2: "M2",
        3: "m3",
        4: "M3",
        5: "4",
        6: "a4",
        6: "d5",
        7: "5",
        8: "m6",
        9: "M6",
        10: "m7",
        11: "M7"
      }
    };
  },
  props: ["fretboardDiagram", "voicing"]
};
</script>

<style></style>
