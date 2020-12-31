<template>
  <div><span v-if="fretted">•</span></div>
</template>

<script>
export default { props: ["fretted"] };
</script>

<style scoped>
div {
  height: 30px;
  width: 30px;
  border: solid black 1px;
  display: inline-block;
}
span {
  position: absolute;
  font-size: 30px;
}
</style>
