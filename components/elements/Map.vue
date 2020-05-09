<template>
  <div ref="map" :class="[styling]" />
</template>
<script>
import { forEach } from 'lodash'
export default {
  name: 'Maps',
  props: {
    styling: {
      type: String,
      default: 'map',
    },
    position: {
      type: Object,
      default: () => ({
        latitude: 52.268874,
        longitude: 10.52677,
      }),
    },
    points: {
      type: Array,
      default: () => [],
    },
    // Todo
    polygon: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    map: {},
    ui: {},
  }),
  computed: {
    getPoligonCoordinates() {
      if (this.polygon) {
        const { coordinates } = this.polygon
        return coordinates
      }
      return null
    },
  },
  watch: {
    position({ latitude, longitude }) {
      this.map.setCenter({ lat: latitude, lng: longitude })
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.map.getViewPort().resize()
    })
    const defaultLayers = this.$herePlatform().createDefaultLayers()

    const coordinates = {
      lat: this.position.latitude,
      lng: this.position.longitude,
    }

    // Render Map with Marker
    this.map = this.getMap(this.$refs.map, defaultLayers.normal.map, {
      zoom: 12,
      center: coordinates,
    })

    // creates a group that contains all places shown
    const group = new window.H.map.Group()
    /**
     * This function will be called for crating marker with based on passed place position.
     *
     * @param  {Object} placeLink    A JSONP object representing the place link
     * @param  {H.map.Icon} icon     svg representation of marker
     */
    function createMarker(locationInformation, icon) {
      const { latitude, longitude } = locationInformation.displayPosition
      const marker = new window.H.map.Marker({ lat: latitude, lng: longitude })
      group.addObject(marker)
      // data is valude that marker can hold. we save whole place so we can latter get
      // follow function when we click on it
      return marker.setData(locationInformation)
    }

    // Add markers to the Map
    forEach(this.points, (locationInformation) => {
      createMarker(locationInformation)
    })

    // Add Group to Map
    this.map.addObject(group)

    // add 'tap' event listener, that opens info bubble, to the group
    function addClickListener() {
      return new Promise((resolve) => {
        group.addEventListener(
          'tap',
          function (evt) {
            console.log(window)
            resolve(evt.target.getData())
          },
          false
        )
      })
    }

    addClickListener().then((shop) => this.returnDetails(shop))

    const events = this.getEvents(this.map)
    this.getBehavior(events)
    // eslint-disable-next-line
    const ui = this.getUi(this.map, defaultLayers)
  },
  destroyed() {
    window.removeEventListener('resize', () => {
      this.map.getViewPort().resize()
    })
  },
  methods: {
    getMap(container, layers, settings) {
      return new window.H.Map(container, layers, settings)
    },
    getEvents(map) {
      return new window.H.mapevents.MapEvents(map)
    },
    getBehavior(events) {
      return new window.H.mapevents.Behavior(events)
    },
    getUi(map, layers) {
      return window.H.ui.UI.createDefault(map, layers)
    },
    returnDetails(shop) {
      if (!shop) return
      this.$emit('tap', shop)
    },
  },
}
</script>

<style lang="scss" scoped>
.map {
  @apply w-auto;
}
</style>
