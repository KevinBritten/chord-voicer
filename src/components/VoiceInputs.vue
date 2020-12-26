<template>
  <div>
    <voice-input
      v-for="i in voiceQuantity"
      :key="i"
      :voice-number="i"
    ></voice-input>
  </div>
</template>

<script>
import VoiceInput from "./VoiceInput.vue";
export default {
  data() {
    return {
      voiceQuantity: 4
    };
  },
  components: { VoiceInput }
};
</script>

<style></style>
