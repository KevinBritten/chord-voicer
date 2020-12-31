<template>
  <div>
    <div>melody{{ melodyNote }}</div>
    <div>selectedMode{{ selectedMode }}</div>

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
import Fretboard from "./Fretboard";

export default {
  data() {
    return {
      melodyNote: 0,
      selectedMode: 0,
      voiceQuantity: 1,
      voicings: Voicings,
      modes: Modes,
      fretboard: Fretboard,
      results: []
    };
  },

  components: { VoiceInput, ModeInput },
  methods: {
    updateMelodyNote(note) {
      this.melodyNote = note.voiceValue;
    },
    updateMode(inputData) {
      this.selectedMode = inputData.modeValues;
    },
    checkAllVoicings() {
      let voicings = this.voicings;
      const matchingVoicings = [];
      const fretboardDiagrams = [];
      for (let voicing of voicings) {
        const result = this.checkOneVoicing(voicing);
        console.log(result);
        if (result) {
          matchingVoicings.push(result);
        }
      }
      console.log(matchingVoicings);
      for (let voicing of matchingVoicings) {
        fretboardDiagrams.push(this.convertToFretboard(voicing));
      }
      console.log(fretboardDiagrams);
    },
    checkOneVoicing(voicing) {
      // melody only
      // input data
      const { selectedMode, melodyNote } = this;
      const modes = this.modes;
      const modeIntervals = modes[selectedMode];
      // define distance to move to line up with specified voice(s)
      let distance = this.setWithinOctaveRange(
        melodyNote - voicing[voicing.length - 1]
      );
      // distance = distance < 0 ? distance + 12 : distance;
      // check if voicing fits at given position
      let fitsMode = true;
      let transposedChord = [];
      for (let note of voicing) {
        console.log(note);
        if (fitsMode && (note || note === 0)) {
          let transposedNote = this.setWithinOctaveRange(note + distance);
          // transposedNote =
          //   transposedNote > 11 ? transposedNote - 12 : transposedNote;
          fitsMode = modeIntervals.includes(transposedNote) ? true : false;
          transposedChord.unshift(transposedNote);
        }
      }
      const result = fitsMode ? transposedChord : false;
      return result;
    },
    convertToFretboard(chord) {
      const fretboard = [];
      chord.forEach((note, i) => {
        let fret = note - chord[0] + this.fretboard[i] - 12 * Math.round(i / 2);

        fret = fret % 12 ? fret : 0;
        fretboard.push(fret);
      });
      console.log(fretboard + " fretboard");
      return fretboard;
    },
    setWithinOctaveRange(note) {
      return (note + 12) % 12;
    }
  }
};
</script>

<style></style>
