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
    group: {},
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
    points(shops, oldShops) {
      // Remove old Markers
      if (oldShops.length) {
        this.group.removeAll()
      }
      // Add markers to the Map
      forEach(shops, (locationInformation) => {
        this.createMarker(locationInformation)
      })
      // Add Group to Map
      this.map.addObject(this.group)
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

    this.map.addEventListener('mapviewchangeend', () => {
      const { lat, lng } = this.map.getCenter()
      const zoom = this.map.getZoom()
      this.returnNewPosition({ latitude: lat, longitude: lng, zoom })
    })

    // creates a group that contains all places shown
    this.group = new window.H.map.Group()

    forEach(this.points, (locationInformation) => {
      this.createMarker(locationInformation)
    })

    // Add Group to Map
    this.map.addObject(this.group)

    // add 'tap' event listener, that opens info bubble, to the group
    this.group.addEventListener('tap', this.returnDetails, false)

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
    /**
     * This function will be called for crating marker with based on passed place position.
     *
     * @param  {Object} placeLink    A JSONP object representing the place link
     * @param  {H.map.Icon} icon     svg representation of marker
     */
    createMarker(locationInformation) {
      const appIcon = new window.H.map.Icon('/img/pin.png', {
        size: { w: 26, h: 26 },
      })

      const { latitude, longitude } = locationInformation.displayPosition
      const marker = new window.H.map.Marker(
        { lat: latitude, lng: longitude },
        { icon: appIcon }
      )

      this.group.addObject(marker)
      // data is valude that marker can hold. we save whole place so we can latter get
      // follow function when we click on it
      return marker.setData(locationInformation)
    },

    returnDetails(evt) {
      this.$emit('tap', evt.target.getData())
    },

    returnNewPosition(position) {
      this.$emit('position', position)
    },
  },
}
</script>

<style lang="scss" scoped>
.map {
  @apply w-auto;
}
</style>
