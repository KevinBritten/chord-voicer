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
    <fretboard-diagrams
      v-if="fretboardDiagrams.length > 0"
      :fretboardDiagrams="fretboardDiagrams"
    ></fretboard-diagrams>
    <mode-input @update-mode-values="updateMode"></mode-input>
    <button type="button" @click="checkAllVoicings" />
    <div>{{ results }}</div>
  </div>
</template>

<script>
import Voicings from "./Voicings";
import Modes from "./Modes";
import Strings from "./Strings";
import VoiceInput from "./VoiceInput.vue";
import ModeInput from "./ModeInput.vue";
import FretboardDiagrams from "./FretboardDiagrams.vue";

export default {
  data() {
    return {
      melodyNote: 0,
      selectedMode: 0,
      voiceQuantity: 1,
      voicings: Voicings,
      modes: Modes,
      strings: Strings,
      results: [],
      fretboardDiagrams: []
    };
  },

  components: { VoiceInput, ModeInput, FretboardDiagrams },
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
        if (result) {
          matchingVoicings.push(result);
        }
      }
      console.log(matchingVoicings);
      for (let voicing of matchingVoicings) {
        fretboardDiagrams.push(this.convertToFretboard(voicing));
      }
      console.log(fretboardDiagrams);
      this.fretboardDiagrams = fretboardDiagrams;
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
        if (fitsMode && note !== false) {
          let transposedNote = this.setWithinOctaveRange(note + distance);
          fitsMode = modeIntervals.includes(transposedNote) ? true : false;
          transposedChord.unshift(transposedNote);
        }
      }
      const result = fitsMode ? transposedChord : false;
      if (result) {
        console.log(voicing);
      }
      return result;
    },
    convertToFretboard(chord) {
      const fretboard = [];
      chord.forEach((note, i) => {
        let fret = note - chord[0] + this.strings[i] - 12 * Math.round(i / 2);
        fret = fret < -5 ? 12 + fret : fret;
        fretboard.push(fret);
      });

      console.log(fretboard);
      const lowestFret = fretboard.reduce((lowest, current) => {
        return lowest < current ? lowest : current;
      }, 0);
      return fretboard.map(fret => {
        return fret - lowestFret;
      });
    },
    setWithinOctaveRange(note) {
      return (note + 12) % 12;
    }
  }
};
</script>

<style></style>
