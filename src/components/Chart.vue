<template>
  <div id="chart" class="chart">
    <svg
      :width="chartWidth"
      :height="chartHeight"
    >
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'chart',

  data: () => ({
    svg: null,
    chartWidth: 0,
    chartHeight: 0
  }),

  props: {
    data: { type: Array, required: true },
  },

  mounted () {
    this.svg = d3.select("svg").append("g")

    this.$nextTick(function() {
      window.addEventListener('resize', this.getChartWidth)
      window.addEventListener('resize', this.getChartHeight)

      this.getChartWidth()
      this.getChartHeight()
    })
  },

  methods: {
    getChartWidth(event) {
      this.chartWidth = this.$el.clientWidth
    },

    getChartHeight(event) {
      this.chartHeight = this.$el.clientHeight
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.getChartWidth)
    window.removeEventListener('resize', this.getChartHeight)
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/_functions.scss';

.chart {
  flex: 1;
}
</style>
