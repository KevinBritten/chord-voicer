<template>
  <div>
    <fretboard-diagram
      v-for="(chordResult, index) of chordResults"
      :key="index"
      :fretboard-diagram="chordResult.fretboardDiagram"
      :voicing="chordResult.voicing"
    ></fretboard-diagram>
  </div>
</template>

<script>
import FretboardDiagram from "./FretboardDiagram.vue";
export default {
  props: ["chordResults"],
  components: {
    FretboardDiagram
  }
};
</script>

<style></style>
