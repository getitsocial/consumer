<template>
  <div style="padding-top: 5em;">
    <h1>Testpage</h1>
  </div>
</template>

<script>
export default {
  asyncData({ seo }) {
    seo({
      name: 'Testpage',
      title: 'lokal auf get it!',
      templateTitle: '%name% - %title%',
      description: 'Lokal einkaufen!',
      og: {
        title: 'Testpage',
        image: 'shop.picture.url',
        locale: 'de',
      },
      fb: {
        appId: '574950416384081',
      },
    })
  },
}
</script>

<style lang="css" scoped></style>
