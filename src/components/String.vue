<template>
  <div>
    <fret v-for="i of 7" :key="i" :fretted="i - 1 === fret"></fret>
  </div>
</template>

<script>
import Fret from "./Fret.vue";
export default { props: ["fret"], components: { Fret } };
</script>

<style></style>
