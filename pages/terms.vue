<template>
  <div class="container mb-5 mt-5 md:mt-24">
    <div class="max-w-3xl mx-auto" v-html="$md.render(content.content)" />
  </div>
</template>

<script>
import { createClient } from '~/plugins/modules/contentful.js'
const client = createClient()

export default {
  name: 'Terms',
  async asyncData({ params }) {
    const { fields } = await client.getEntry('5mzCp6ARnPQTTGZYkL6khU')
    return { content: fields }
  },
  data: () => ({}),
  head() {
    return {
      title: this.content.title,
    }
  },
}
</script>

<style lang="css" scoped></style>
