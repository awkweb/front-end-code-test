<template>
  <div
    class="number__field"
    :class="{ active: active, disabled: disabled }">
    <div
      @click="onClick"
      class="number__field__container">
      <label class="number__field__label">{{ label }}</label>

      <input
        v-if="active && !disabled"
        class="number__field__input"
        ref="input"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :value="value"
        @input="onInput($event.target.value)"
        @focus="onFocus"
        @blur="onBlur"
        @keyup.enter="onBlur"
        type="number"
        spellcheck="false">
      <span
        v-else
        :class="{ refreshable: showRefresh }"
        class="number__field__input">
        {{ displayValue | prettyNumber }}
      </span>
    </div>

    <button
      v-if="showRefresh"
      @click.self="onRefreshField"
      class="number__field__refresh">
    </button>
  </div>
</template>

<script>
export default {
  name: 'number-field',

  props: {
    label: { type: String, required: true },
    value: { type: Number, default: 0, required: true },
    autofocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    placeholder: String,
    refreshable: { type: Boolean, default: false },
    showRefresh: { type: Boolean, default: false },
    triggerRefresh: { type: Boolean, default: false },
    type: String
  },

  data: () => ({
    active: false,
    originalValue: null
  }),

  computed: {
    displayValue () {
      let value;
      switch (this.type) {
        case 'currency':
          value = `$${this.value}`
          break
        case 'percent':
          value = `${this.value}%`
          break 
        default:
          value = this.value    
      }
      return value
    }
  },

  methods: {
    onClick () {
      if (!this.disabled) {
        this.active = true
        setTimeout(() => {
          const input = this.$el.children[0].children[1]
          input.focus()
        }, 0)
      }
    },

    onInput (value) {
      if (value === "") {
        value = 0
      }
      this.$emit('input', value)
    },

    onFocus (event) {
      this.originalValue = this.value
      this.active = true
    },

    onBlur () {
      if (this.triggerRefresh && this.originalValue != null && this.originalValue != this.value) {
        this.$emit('onTriggerRefresh')
      }
      this.active = false
      this.$refs.input.value = this.value
    },

    onRefreshField () {
      this.$emit('onRefreshField', this.label)    
    }
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/_functions.scss';

.number__field {
  border: {
    style: solid;
    color: palette(gray, light);
    radius: $border-radius;
    width: 1px;
  }
  box-shadow: $box-shadow;
  display: flex;
  flex: 1;
  margin-bottom: 10px;
  position: relative;
  transition: border-color $transition;

  &:not(.disabled):hover {
    border-color: palette(blue, light); 
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.active {
    border-color: palette(blue);
  }

  &.disabled {
    background-color: palette(gray, x-light);
    cursor: not-allowed;
  }

  &__container {
    align-items: center;
    display: flex;
    flex: 1;
    height: 38px;
    padding: {
      bottom: 0;
      right: 14px;
      left: 14px;
      top: 0;
    }
  }

  &__label {
    color: palette(black);
    font: {
      size: .8rem;
      weight: 500;
    }
    flex: 7;
  }

  &__input {
    background-color: transparent;
    border: 0;
    color: palette(black);
    font: {
      size: .8rem;
    }
    flex: 3;
    outline: 0;
    padding: 0;
    text-align: right;
    transition: color $transition;

    &::placeholder {
      color: palette(gray);  
    }

    &::-webkit-inner-spin-button, 
    &::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }

    &.refreshable {
      color: palette(gray);
    }
  }

  &__refresh {
    background: {
      color: transparent;
      image: url("../assets/icons/refresh.svg");
      position: center center;
      size: 35px;
      repeat: no-repeat;
    }
    border: 0;
    cursor: pointer;
    height: 40px;
    position: absolute;
    outline: 0;
    right: -2rem;
    top: 0;
    width: 40px;
  }
}
</style>
