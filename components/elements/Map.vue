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
    theme(newVal, oldVal) {
      const tiles = this.platform.getMapTileService({ type: 'base' })
      const layer = tiles.createTileLayer('maptile', newVal, 256, 'png', {
        style: 'default',
        lg: 'VIE',
      })
      this.map.setBaseLayer(layer)
    },
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

    this.map.addLayer(defaultLayers.venues)
    const mapTileService = this.$herePlatform().getMapTileService({
      type: 'base',
    })

    forEach(this.points, ({ displayPosition: { latitude, longitude } }) => {
      this.map.addObject(
        new window.H.map.Marker({ lat: latitude, lng: longitude })
      )
    })

    const pixelRatio = window.devicePixelRatio || 1
    const tileSize = pixelRatio === 1 ? 256 : 512
    const ppi = pixelRatio === 1 ? undefined : 320
    // Our layer will load tiles from the HERE Map Tile API
    const mapLayer = mapTileService.createTileLayer(
      'maptile',
      'normal.day',
      tileSize,
      'png8',
      { lg: 'VIE', ppi }
    )
    this.map.setBaseLayer(mapLayer)

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
  },
}
</script>

<style lang="scss" scoped>
.map {
  @apply w-auto;
}
</style>
