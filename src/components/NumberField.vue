<template>
  <div
    class="number__field"
    :class="{ active: isActive }"
    @click="onClick">
    <label class="number__field__label">{{ label }}</label>

    <input
      class="number__field__input"
      ref="input"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :value="value"
      @input="onInput($event.target.value)"
      @focus="onFocus"
      @blur="onBlur"
      type="number"
      spellcheck="false">

    <button
      v-if="showRefresh"
      @click="refreshField">
      Refresh
    </button>
  </div>
</template>

<script>
export default {
  name: 'number-field',

  props: {
    label: { type: String, required: true },
    value: { type: Number, default: 0, required: true },
    placeholder: String,
    autofocus: Boolean,
    refreshable: Boolean,
  },

  data: () => ({
    isActive: false,
    showRefresh: false,
    originalValue: null
  }),

  methods: {
    onClick () {
      const input = this.$el.children[1]
      input.focus()
    },

    onInput (value) {
      if (value === "") {
        value = 0
      }
      this.$emit('input', value)
    },

    onFocus (event) {
      this.originalValue = this.value
      this.isActive = true
    },

    onBlur () {
      if (this.refreshable && this.originalValue != null && this.originalValue != this.value) {
        this.showRefresh = true
      }
      this.isActive = false
      this.$refs.input.value = this.value
    },

    refreshField () {
      this.showRefresh = false
      this.$emit('refreshField')    
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
    width: 1px;
  }
  box-shadow: $box-shadow;
  display: flex;
  flex: 1;
  margin-bottom: 14px;
  padding: {
    bottom: 8px;
    right: 14px;
    left: 14px;
    top: 8px;
  }
  position: relative;
  transition: border-color $transition;

  &:hover {
    border-color: palette(blue, light); 
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.active {
    border-color: palette(blue);
  }

  &__label {
    color: palette(black);
    font: {
      family: $sans-serif;
      size: .8rem;
      weight: 500;
    }
    flex: 7;
    transition: color $transition;
  }

  &__input {
    background-color: transparent;
    border: 0;
    color: palette(black);
    font: {
      family: $sans-serif;
      size: .8rem;
    }
    flex: 3;
    outline: 0;
    padding: 0;
    text-align: right;

    &::placeholder {
      color: palette(gray);  
      transition: color $transition;
    }

    &::-webkit-inner-spin-button, 
    &::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
  }
}
</style>
