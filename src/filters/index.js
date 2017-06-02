export function prettyNumber (number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
