export const formatMixin = {
	methods: {
	  formatValue (value, type) {
      value = value.toString().replace(/([^0-9]+)/g, '')
      value = value === "" ? "0" : `${parseInt(value)}`
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      switch (type) {
        case 'currency':
          value = `$${value}`
          break
        case 'percent':
          value = `${value}%`
          break 
        default:
          value = value   
      }
      return value
    }
  }
}