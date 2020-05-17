<template>
  <div class="flex items-center justify-center">
    <div class="text-center w-auto">
      <img
        v-if="image"
        :src="`/img/${image}.svg`"
        alt=""
        width="300"
        class="mx-auto"
      />
      <h3 class="text-tertiary mb-2" :class="[image ? 'mt-4' : '']">
        {{ $t(emptyText) }}
      </h3>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    image: {
      type: String,
      default: null,
    },
    emptyText: {
      type: String,
      default: 'shop.no_items',
    },
  },
  data: () => ({}),
}
</script>

<style lang="css" scoped></style>
