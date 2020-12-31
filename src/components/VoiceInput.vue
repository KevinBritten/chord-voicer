<template>
  <div>
    <input
      type="text"
      @input="
        $emit('update-voice-value', {
          voiceValue: intervalList[intervalName],
          voiceNumber
        })
      "
      v-model="intervalName"
    />
  </div>
</template>

<script>
export default {
  props: ["voice-number"],
  data() {
    return {
      intervalName: "",
      intervalList: {
        r: 0,
        m2: 1,
        M2: 2,
        m3: 3,
        M3: 4,
        "4": 5,
        a4: 6,
        d5: 6,

        "5": 7,
        m6: 8,
        M6: 9,
        m7: 10,
        M7: 11
      }
    };
  }
};
</script>

<style></style>
