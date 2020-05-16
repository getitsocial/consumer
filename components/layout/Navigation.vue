<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <nav class="bg-white shadow">
        <div class="container navigation">
          <div class="brand">
            <n-link to="/" exact>
              <img src="/img/logo.svg" alt="" width="110" />
            </n-link>
          </div>
          <div class="ml-3">
            <ul>
              <li>
                <n-link to="/">
                  {{ $t('navbar.shops') }}
                </n-link>
              </li>
            </ul>
          </div>
          <div class="ml-auto">
            <ul>
              <li>
                <a href="https://dealer.getit.market">
                  <span class="mr-1">{{ $t('navbar.dealer') }}</span>
                  <icon name="arrow-forward-outline" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
/**
 * Default top navigation for desktop view.
 */
export default {
  name: 'Navigation',
  data: () => ({}),
}
</script>
<style lang="scss">
.navigation {
  @apply relative flex items-center text-black antialiased px-2 py-5;

  @screen sm {
    @apply px-3;
  }

  .brand {
    @apply font-bold text-xl px-1 hidden;

    @screen sm {
      @apply inline-block;
    }

    a {
      @apply text-primary no-underline;

      &:hover {
        @apply text-info;
      }
    }

    @screen sm {
      @apply px-3;
    }
  }

  ul {
    @apply list-none overflow-hidden;
  }

  li {
    @apply float-left;

    a {
      @apply flex items-center;
      @apply text-light px-3 py-2 mx-0 rounded-md uppercase text-xs font-bold tracking-wider no-underline;
      @apply transition duration-200 ease-in-out;

      &:hover {
        @apply text-secondary;
        .icon {
          @apply transition duration-300 ease-in-out;
          transform: translate(0.3rem);
        }
      }

      @screen sm {
        @apply mx-2 text-sm;
      }
    }
    .nuxt-link-active {
      @apply text-primary no-underline;
    }
  }
}
</style>
