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
            :class="{ outside: (bar.value / total) < .25 }"
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
      const percent = (bar.value / this.total) * 100
      const height = Math.max(percent, 1)
      return {
        backgroundColor: this.backgroundColors[index],
        height: `${height}%`,
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
    color: palette(black);
    display: flex;
    position: relative;
    text-align: left;

    &:first-child {
      border-top-right-radius: $border-radius;
      border-top-left-radius: $border-radius;
    }

    &__name {
      font: {
        family: $sans-serif;
        size: .75rem;
      }
      position: absolute;
      left: -9.5rem;
      text-align: right;
      width: 160px;

      &:after{
        content: '';
        width: 30px;
        border-bottom: {
          color: palette(gray, dark);
          style: solid;
          width: 1px
        }
        position: absolute;
        top: 50%;
        margin-left: 5px;
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
