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
      title: 'abc',
      templateTitle: '%name% - %title%',
      description: '123',
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
  layout: 'empty',
}
</script>

<style lang="css" scoped></style>
