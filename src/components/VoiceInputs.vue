<template>
  <div>
    <h3>Mode</h3>
    <mode-input @update-mode-values="updateMode"></mode-input>
    <h3>Melody Note</h3>

    <voice-input
      v-for="i in voiceQuantity"
      :key="i"
      :voice-number="i"
      @update-voice-value="updateMelodyNote"
    ></voice-input>
    <button type="button" @click="updateDiagrams" />
    <fretboard-diagrams
      v-if="chordResults[0]"
      :chordResults="chordResults"
    ></fretboard-diagrams>
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
      chordResults: []
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
    updateDiagrams() {
      this.chordResults = [];
      this.checkAllVoicings();
    },
    checkAllVoicings() {
      let voicings = this.voicings;
      const matchingVoicings = [];
      const fretboardDiagrams = [];
      for (let voicing of voicings) {
        const searchResult = this.checkOneVoicing(voicing);
        if (searchResult) {
          this.chordResults.push({
            fretboardDiagram: this.convertToFretboard(searchResult),
            voicing: searchResult
          });
        }
      }

      // for (let voicing of voicings) {
      //   const result = this.checkOneVoicing(voicing);
      //   if (result) {
      //     matchingVoicings.push(result);
      //   }
      // }
      // this.matchingVoicings = matchingVoicings;
      // for (let [i, voicing] of matchingVoicings) {
      //   this.chordResults.push({
      //     fretboardDiagram: this.convertToFretboard(voicing),
      //     // voices:
      //   });
      // }
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
