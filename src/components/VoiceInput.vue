<template>
  <div>
    <input
      type="number"
      @input="$emit('update-voice-value', { voiceValue, voiceNumber })"
      v-model="voiceValue"
    />
  </div>
</template>

<script>
export default {
  props: ["voice-number"],
  data() {
    return {
      voiceValue: 0
    };
  }
};
</script>

<style></style>
