const chordsInit = {
    1: [5, 9, 3, 7],
    2: [7, 3, 5, 9]
};
const extentions = {
    remove: {
        9: 2,
        11: 4,
        13: 6
    },
    add: {
        2: 9,
        4: 11,
        6: 13
    }
};
const sanatize = (chord, mode) => {
    const sanatizedChord = [];
    chord.forEach((note) => {
        let sanatizedNote = Object.keys(extentions[`${mode}`]).includes(note.toString()) ?
            extentions[`${mode}`][`${note.toString()}`] :
            note;
        sanatizedChord.push(sanatizedNote);
    });
    return sanatizedChord;
};

const sanatizeAll = (chords, mode) => {
    const sanatizedObject = {};
    for (key of Object.keys(chords)) {
        sanatizedObject[key] = sanatize(chords[key], mode);
    }
    return sanatizedObject;
};

chordsNoExtentions = sanatizeAll(chordsInit, 'remove');

const chordArranger = (chords) => {
    const chordsTransposed = {};
    for (let chord in chords) {
        const chordHolder = {};
        let chordName = '';
        chords[chord].forEach((note) => {
            chordName += note.toString();
        });
        for (let i = 0; i < 7; i++) {
            chordHolder[`${i + 1}`] = chords[chord].map((note) => {
                let newNote = note - i;
                newNote = newNote < 1 ? 7 + newNote : newNote;
                return newNote;
            });
        }
        chordsTransposed[`${chordName}`] = chordHolder;
    }
    return chordsTransposed;
};
const chordsArranged = chordArranger(chordsNoExtentions);
console.log(chordsArranged);
// const getChordsWithExtentions = (chordObject) => {
//     for (key in Object.keys(chordObject)) {
//         for (let i = 0; i++; i < 7) {
//             chordObject[key][i] = sanatize(chordObject[key][i], extentions.add);
//         }
//     }
//     return chordObject;
// };
// console.log(chordsWithExtentions);
const chordsArrangedExtender = (chords) => {
    const chordsExtended = {};
    for (let chord in chords) {
        chordsExtended[chord] = sanatizeAll(chordsArranged[chord], 'add');
    }
    return chordsExtended;
};
const chordsArrangedExtended = chordsArrangedExtender(chordsArranged);
console.log(chordsArrangedExtended);

const testOptions = [{
        voice: [11, 1, 9, 13],
        quality: [2, 3, 6]
    },
    {
        voice: [1, 0, 0, 0],
        quality: [1, 2, 3, 4, 5, 7, 6]
    }
];

const searchByVoice = (chord, voices) => {
    meetsCriteria = true;
    for (let i = 0; i < chord.length - 1; i++) {
        if (!(voices[i] == chord[i]) && voices[i]) {
            meetsCriteria = false;
        }
    }
    console.log(meetsCriteria);
    return meetsCriteria;
};

const findChord = (chords, options) => {
    const results = {};

    for (let chord in chords) {
        for (let quality of options.quality) {
            if (searchByVoice(chords[chord][quality], options.voice)) {
                if (!results[quality]) {
                    results[quality] = [chords[chord][quality]];
                } else {
                    results[quality].push(chords[chord][quality]);
                }
            }
        }
    }
    return results;
};

searchMultiple = (chords, options) => {
    const multipleChords = {};
    options.forEach((option, i) => {
        multipleChords[i] = findChord(chords, option);
    });

    return multipleChords;
};
const testSearch = searchMultiple(chordsArrangedExtended, testOptions);
console.log(testSearch);