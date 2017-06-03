<template>
  <div class="total__field">
    <label class="total__field__label">{{ label }}</label>
    <span class="total__field__value">${{ value | prettyNumber }}</span>
  </div>
</template>

<script>
export default {
  name: 'total-field',

  props: {
    label: { type: String, required: true },
    value: { type: Number, required: true },
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/_functions.scss';

.total__field {
  display: flex;
  flex: 1;
  margin-bottom: 10px;
  padding: {
    bottom: 8px;
    right: 14px;
    left: 14px;
    top: 6px;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &__label {
    color: palette(black);
    font: {
      size: .8rem;
      weight: 500;
    }
    flex: 7;
  }

  &__value {
    background-color: transparent;
    border: 0;
    color: palette(black);
    font: {
      size: .8rem;
      weight: 500;
    }
    flex: 3;
    outline: 0;
    padding: 0;
    text-align: right;
  }
}
</style>
