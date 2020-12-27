<template>
  <div>
    <div>v:{{ voicings }}</div>
    <div>mv{{ modeValues }}</div>
    <div>vv{{ voiceValues }}</div>

    <voice-input
      v-for="i in voiceQuantity"
      :key="i"
      :voice-number="i"
      @update-voice-value="updateVoiceValue"
    ></voice-input>
    <mode-input @update-mode-values="updateModeValues"></mode-input>
    <button type="button" @click="findChords" />
    <div>{{ results }}</div>
  </div>
</template>

<script>
import VoiceInput from "./VoiceInput.vue";
import ModeInput from "./ModeInput.vue";
import Voicings from "./Voicings";

export default {
  data() {
    return {
      voiceQuantity: 4,
      voiceValues: [0, 0, 0, 0],
      modeValues: [],
      voicings: Voicings,
      results: []
    };
  },

  components: { VoiceInput, ModeInput },
  methods: {
    updateVoiceValue(inputData) {
      let position = inputData.voiceNumber - 1;
      this.voiceValues[position] = inputData.voiceValue;
    },
    updateModeValues(inputData) {
      this.modeValues.length = 0;
      let { modeValues } = inputData;
      let modeValuesArray = modeValues.toString().split("");
      modeValuesArray.forEach(i => {
        this.modeValues.push(parseInt(i));
      });
    },
    findChords() {
      let matchingVoicings = [];
      for (let mode of this.modeValues) {
        let adjustedChord = [];
        for (let voiceValue of this.voiceValues) {
          let adjustedNote = voiceValue ? voiceValue + mode - 1 : 0;
          adjustedNote = adjustedNote > 7 ? adjustedNote - 7 : adjustedNote;
          adjustedChord.push(adjustedNote);
        }
        this.voicings.forEach(voicing => {
          let containsVoice = true;
          voicing.forEach((note, i) => {
            if (containsVoice) {
              containsVoice =
                adjustedChord[i] == note || adjustedChord[i] == 0
                  ? true
                  : false;
            }
          });
          if (containsVoice) {
            let adjustedVoicing = voicing.map(note => {
              let adjustedNote = note - (mode - 1);
              adjustedNote = adjustedNote > 7 ? adjustedNote - 7 : adjustedNote;
              adjustedNote = adjustedNote < 1 ? 7 + adjustedNote : adjustedNote;

              return adjustedNote;
            });
            matchingVoicings.push(adjustedVoicing);
          }
        });
      }
      this.results.length = 0;
      this.$set(this.results, 0, matchingVoicings);
      console.log(matchingVoicings);
    }
  }
};
</script>

<style></style>
