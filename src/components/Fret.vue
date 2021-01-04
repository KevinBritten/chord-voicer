<template>
  <div>
    <span v-if="fretted">{{ voice }}</span>
  </div>
</template>

<script>
export default { props: ["fretted", "voice"] };
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
  font-size: 22px;
}
</style>
