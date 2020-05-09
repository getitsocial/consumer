import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Icon from '~/components/utils/Icon.vue'
import Modal from '~/components/elements/Modal.vue'
import Maps from '~/components/elements/Map.vue'

// Global Mixins and Utils
Vue.component('Icon', Icon)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// Elements
Vue.component('Modal', Modal)
Vue.component('Maps', Maps)
