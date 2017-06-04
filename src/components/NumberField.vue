<template>
  <div
    class="number__field"
    :class="{ active: active, disabled: disabled }">
    <div
      @click="onClick"
      :class="{ refreshable: showRefresh }"
      class="number__field__container">
      <label class="number__field__label">{{ label }}</label>

      <input
        class="number__field__input"
        ref="input"
        :autofocus="autofocus"
        :class="{ refreshable: showRefresh }"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="value"
        @input="onInput($event.target.value)"
        @focus="onFocus"
        @blur="onBlur"
        @keyup.enter="onBlur"
        type="text"
        spellcheck="false">

      <button
        v-if="showRefresh"
        @click.self="onRefreshField"
        tabindex="100"
        class="number__field__refresh">
      </button>
    </div>
  </div>
</template>

<script>
import { formatMixin } from '../mixins'

export default {
  name: 'number-field',

  props: {
    label: { type: String, required: true },
    value: { type: [String, Number], default: 0, required: true },
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

  mixins: [
    formatMixin
  ],

  mounted () {
    this.onInput(this.value)
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
      const formattedValue = this.formatValue(value, this.type)
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      this.$emit('input', formattedValue)
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

    * {
      cursor: not-allowed;
    }
  }

  &__container {
    align-items: center;
    display: flex;
    flex: 1;
    height: 38px;
    padding: {
      right: 14px;
      left: 14px;
    }

    &.refreshable {
      @media screen and (max-width: screen(large)) {
        padding-right: 0;
      }
    }

    @media screen and (max-width: screen(small)) {
      padding: {
        right: 7px;
        left: 7px;
      }
    }
  }

  &__label {
    color: palette(black);
    font: {
      size: .8rem;
      weight: 400;
    }
    flex: 1;

    @media screen and (max-width: screen(small)) {
      font-size: .75rem;
    }
  }

  &__input {
    background-color: transparent;
    border: 0;
    color: palette(black);
    font: {
      family: $sans-serif;
      size: .8rem;
    }
    outline: 0;
    padding: 0;
    text-align: right;
    transition: color $transition;
    width: 100px;

    &::placeholder {
      color: palette(gray);  
    }

    @media screen and (max-width: screen(small)) {
      font-size: .75rem;
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
    height: 36px;
    padding: 0;
    position: absolute;
    outline: 0;
    right: -2rem;
    top: 2px;
    width: 36px;

    @media screen and (max-width: screen(large)) {
      position: initial;
    }
  }
}
</style>
