<template>
  <div class="flex items-stretch">
    <maps styling="block min-h-full w-full" :points="shops" />
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, query, redirect, store }) {
    try {
      const shops = await $axios.$get('/api/shops/near/u1r3re32782dk', {
        params: query,
      })

      return { shops }
    } catch (e) {
      store.commit('modal/showModal', {
        message: 'information.error_occurred',
        confirmText: 'refresh_now',
        onConfirm: () => {
          if (process.browser) location.reload()
        },
      })
      return { categories: [], showEmpty: true, nextPage: 0, prevPage: 0 }
    }
  },
}
</script>
<style lang="scss" scoped></style>
