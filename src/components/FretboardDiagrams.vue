<template>
  <div>
    <!-- <fretboard-diagram
      v-for="(fretboardDiagram, index) of fretboardDiagrams"
      :key="index"
      :fretboardDiagram="fretboardDiagram"
    ></fretboard-diagram> -->
    <fretboard-diagram
      :fretboardDiagram="fretboardDiagrams[0]"
    ></fretboard-diagram>
  </div>
</template>

<script>
import FretboardDiagram from "./FretboardDiagram.vue";
export default {
  props: ["fretboardDiagrams"],
  components: {
    FretboardDiagram
  }
};
</script>

<style></style>
