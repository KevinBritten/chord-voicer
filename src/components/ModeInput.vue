<template>
  <div>
    <input
      type="number"
      @input="$emit('update-mode-values', { modeValues })"
      v-model.number="modeValues"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      modeValues: 0
    };
  }
};
</script>

<style></style>
