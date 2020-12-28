<template>
  <div>
    <div>melody{{ melodyNote }}</div>
    <div>mode{{ mode }}</div>

    <voice-input
      v-for="i in voiceQuantity"
      :key="i"
      :voice-number="i"
      @update-voice-value="updateMelodyNote"
    ></voice-input>
    <mode-input @update-mode-values="updateMode"></mode-input>
    <button type="button" @click="checkAllVoicings" />
    <div>{{ results }}</div>
  </div>
</template>

<script>
import VoiceInput from "./VoiceInput.vue";
import ModeInput from "./ModeInput.vue";
import Voicings from "./Voicings";
import Modes from "./Modes";

export default {
  data() {
    return {
      voiceQuantity: 4,
      melodyNote: 0,
      // voiceValues: [0, 0, 0, 0],
      modeValues: [],
      voicings: Voicings,
      results: [],
      modes: Modes,
      mode: 0
    };
  },

  components: { VoiceInput, ModeInput },
  methods: {
    // updateVoiceValue(inputData) {
    //   let position = inputData.voiceNumber - 1;
    //   this.voiceValues[position] = inputData.voiceValue;
    // },
    updateMelodyNote(note) {
      this.melodyNote = note.voiceValue;
    },
    // updateModeValues(inputData) {
    //   this.modeValues.length = 0;
    //   let { modeValues } = inputData;
    //   let modeValuesArray = modeValues.toString().split("");
    //   modeValuesArray.forEach(i => {
    //     this.modeValues.push(parseInt(i));
    //   });
    // },
    updateMode(inputData) {
      this.mode = inputData.modeValues;
    },
    // findChords() {
    //   let matchingVoicings = [];
    //   for (let mode of this.modeValues) {
    //     let adjustedChord = [];
    //     for (let voiceValue of this.voiceValues) {
    //       let adjustedNote = voiceValue ? voiceValue + mode - 1 : 0;
    //       adjustedNote = adjustedNote > 7 ? adjustedNote - 7 : adjustedNote;
    //       adjustedChord.push(adjustedNote);
    //     }
    //     this.voicings.forEach(voicing => {
    //       let containsVoice = true;
    //       voicing.forEach((note, i) => {
    //         if (containsVoice) {
    //           containsVoice =
    //             adjustedChord[i] == note || adjustedChord[i] == 0
    //               ? true
    //               : false;
    //         }
    //       });
    //       if (containsVoice) {
    //         let adjustedVoicing = voicing.map(note => {
    //           let adjustedNote = note - (mode - 1);
    //           adjustedNote = adjustedNote > 7 ? adjustedNote - 7 : adjustedNote;
    //           adjustedNote = adjustedNote < 1 ? 7 + adjustedNote : adjustedNote;

    //           return adjustedNote;
    //         });
    //         matchingVoicings.push(adjustedVoicing);
    //       }
    //     });
    //   }
    //   this.results.length = 0;
    //   this.$set(this.results, 0, matchingVoicings);
    //   console.log(matchingVoicings);
    // },
    checkAllVoicings() {
      let voicings = this.voicings;
      const matchingVoicings = [];
      for (let voicing of voicings) {
        if (this.checkOneVoicing(voicing)) {
          matchingVoicings.push(voicing);
        }
      }
      console.log(matchingVoicings);
    },
    checkOneVoicing(voicing) {
      // melody only
      // input data
      //try destructing after const {mode,modes melodyNote} = this
      const mode = this.mode;
      const melodyNote = this.melodyNote;
      const modes = this.modes;
      // define current mode
      const modeIntervals = modes[mode];
      // define distance to move to line up with specified voice(s)
      let distance = melodyNote - voicing[voicing.length - 1];
      distance = distance < 0 ? distance + 12 : distance;
      console.log(distance);
      // check if voicing fits at given position
      let fitsMode = true;
      for (let note of voicing) {
        if (note && fitsMode) {
          console.log(note);
          fitsMode = modeIntervals.includes(12 % (note + distance))
            ? true
            : false;
        }
      }
      console.log(fitsMode);
      return fitsMode;
    }
  }
};
</script>

<style></style>
