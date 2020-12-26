<template>
  <div>
    <voice-input
      v-for="i in voiceQuantity"
      :key="i"
      :voice-number="i"
      @update-voice-values="updateVoiceValues"
    ></voice-input>
  </div>
</template>

<script>
import VoiceInput from "./VoiceInput.vue";
export default {
  data() {
    return {
      voiceQuantity: 4,
      voiceValues: [0, 0, 0, 0]
    };
  },
  components: { VoiceInput },
  methods: {
    updateVoiceValues(inputData) {
      let position = inputData.voiceNumber - 1;
      this.voiceValues[position] = inputData.voiceValue;
    }
  }
};
</script>

<style></style>
