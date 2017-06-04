export function prettyNumber (number, type) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function nFormatter(number, digits = 1) {
  var si = [
    { value: 1E18, symbol: "E" },
    { value: 1E15, symbol: "P" },
    { value: 1E12, symbol: "T" },
    { value: 1E9,  symbol: "G" },
    { value: 1E6,  symbol: "M" },
    { value: 1E3,  symbol: "k" }
  ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;
  for (i = 0; i < si.length; i++) {
    if (number >= si[i].value) {
      return (number / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }
  }
  return number.toFixed(digits).replace(rx, "$1");
}
