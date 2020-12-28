export default {
  1: [0, 2, 4, 5, 7, 9, 11],
  2: [0, 2, 3, 5, 7, 9, 10],
  3: [0, 1, 3, 5, 7, 8, 10],
  4: [0, 2, 4, 6, 7, 9, 11],
  5: [0, 2, 4, 5, 7, 9, 10],
  6: [0, 2, 3, 5, 7, 8, 10],
  7: [0, 1, 3, 5, 6, 8, 10]
};

//const checkAllChords = (chords) => {
//const matchingChords = []
//for (let chord of chords) {
//    if (checkOneChord(chord)){matchingChords.push(chord)}
//}
//return matchingChords
//}
//const checkOneChord = (chord) => {
//melody only
//input data
//const mode = 2 //dorian
//const melodyNote = 9 //M6
//define current mode
//const modeIntervals = modes[mode]
//define distance to move to line up with specified voice(s)
//const distance = melodyNote - chord[chord.lenth-1] //9 - 7 = 2
//distance = distance < 0 ? distance + 12 : distance;
//check if chord fits at given position
//const fitsMode = true
//for (let note in chord) {
//if (note && fitsMode) {
//fitsMode = modeIntervals.includes(note+distance) ? true : false
//}
//}
//return fitsMode

//with all voices
//input data
// const chord = [false, false, false, 0,3,7] //min triad
//const mode = 2 //dorian
//const specifiedVoices = [false,false,false,false, 9]
//define current mode
//const modeIntervals = modes[mode]
//define distance to move to line up with specified voice(s)
//const distance = specifiedVoices[topVoiceToCheck] - chord[topVoiceToCheck] //9 - 7 = 2
//check if chord fits at given position
//const fitsMode = true
//for (let note in chord) {
//if (note && fitsMode) {
//fitsMode = modeIntervals.includes(note+distance) ? true : false
//}
//}
