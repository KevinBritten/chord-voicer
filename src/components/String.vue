<template>
  <div>
    <fret
      v-for="i of 7"
      :key="i"
      :voice="voice"
      :fretted="i - 1 === fret"
    ></fret>
  </div>
</template>

<script>
import Fret from "./Fret.vue";
export default { props: ["fret", "voice"], components: { Fret } };
</script>

<style></style>
