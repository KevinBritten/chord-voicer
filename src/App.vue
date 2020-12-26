<template>
  <div>
    <voice-inputs></voice-inputs>
  </div>
</template>

<script>
import VoiceInputs from "./components/VoiceInputs.vue";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: { VoiceInputs }
};
</script>

<style></style>
