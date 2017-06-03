<template>
  <div id="chart" class="chart">
    <div class="chart__container">
      <div class="chart__bars">
        <div
          v-for="(bar, index) in data.sort((a, b) => a.order > b.order)"
          v-if="bar.value > 0"
          :style="getBarStyle(bar, index)"
          class="chart__bar"
        >
          <span
            v-show="(bar.value / total) > .1"
            class="chart__bar__name"
          >
            {{ bar.name }}
          </span>
        </div>
      </div>
    </div>
    <span class="chart__x-label">Age {{ this.xLabel }}</span>
  </div>
</template>

<script>
export default {
  name: 'chart',

  data: () => ({
    backgroundColors: ['#C4DBEE', '#9ACAE0', '#63AED4']
  }),

  props: {
    total: { type: Number, required: true },
    data: { type: Array, required: true },
    xLabel: Number
  },

  methods: {
    getBarStyle (bar, index) {
      return {
        backgroundColor: this.backgroundColors[index],
        height: `${(bar.value / this.total) * 100}%`,
        width: '100px'
      }
    }
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/_functions.scss';

.chart {
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 2rem;

  &__container {
    border-bottom: {
      style: solid;
      color: palette(gray, light);
      width: 1px;
    }
    height: 100%;
    max-width: 300px;
    width: 100%;

    @media screen and (max-width: screen(large)) {
      height: 400px;
    }
  }

  &__bars {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;

    @media screen and (max-width: screen(large)) {
      height: 400px;
    }
  }

  &__bar { 
    align-items: center;
    color: palette(white);
    display: flex;
    text-align: center;

    &:first-child {
      border-top-right-radius: $border-radius;
      border-top-left-radius: $border-radius;
    }

    &__name {
      font: {
        family: $sans-serif;
        size: .8rem;
      }
    }
  }

  &__x-label {
    font: {
      family: $sans-serif;
      size: .8rem;
      weight: 500;
    }
    padding: .5rem;
  }
}
</style>
