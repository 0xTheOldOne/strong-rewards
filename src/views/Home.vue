<template>
  <b-container fluid="md">
    <b-row>
      <b-col>
        <Calculator />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Calculator from "@/components/Calculator.vue";

export default {
  name: "Home",
  components: {
    Calculator,
  },
};
</script>
