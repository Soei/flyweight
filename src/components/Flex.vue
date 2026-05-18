<template>
  <Card class="s-flex" flex>
    <!-- 透传插槽 -->
    <template v-slot:[name]="props" v-for="(props, name) in $slots">
      <slot :name="name" v-bind="props" />
    </template>
  </Card>
</template>
<script>
import Card from "./Card.vue";
export default {
  name: "Flex",
  components: {
    Card,
  },
};
</script>
<style lang="scss" scoped>
.s-flex {
  border: 0 !important;
}
</style>
