<template>
  <div class="z-50">
    <nav class="navbar">
      <ul>
        <li>
          <n-link to="/"><icon name="home-outline" width="20" /></n-link>
        </li>
        <li>
          <a :href="link" class="font-bold"
            ><span class="text-xs">
              {{ $t('navbar.dealer') }}
            </span></a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
/**
 * Default top navigation for mobile view.
 */
export default {
  name: 'Navbar',
  data: () => ({
    stage: process.env.VUE_APP_ENV,
    link: 'https://dealer.getit.market',
  }),
  mounted() {
    switch (this.stage) {
      case 'production':
        this.link = 'https://dealer.getit.social'
        break
      case 'staging':
        this.link = 'https://getit-dealer-dev.herokuapp.com/'
        break
      case 'development':
        this.link = 'http://localhost:3000'
        break
    }
  },
}
</script>
<style lang="scss">
.navbar {
  @apply bg-white antialiased shadow-lg p-2;

  ul {
    @apply list-none overflow-hidden flex justify-between w-full max-w-sm mx-auto;
  }

  li {
    a {
      @apply flex items-center;
      @apply p-3 mx-0;
      color: #7e7577;
      @apply transition duration-300 ease-in-out;

      &:hover {
        @apply text-primary no-underline;
      }
    }
    .nuxt-link-active {
      @apply text-primary no-underline;
    }
  }
}
</style>
