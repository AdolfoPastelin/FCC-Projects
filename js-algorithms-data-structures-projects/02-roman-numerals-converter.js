function convertToRoman(num) {
	const romanNumeralsChart = {
		M: 1000,
		CM: 900,
		D: 500,
		CD: 400,
		C: 100,
		XC: 90,
		L: 50,
		XL: 40,
		X: 10,
		IX: 9,
		V: 5,
		IV: 4,
		I: 1
	}

	if (num === 0) return ''

	for (let romanNumeral in romanNumeralsChart) {
		if (num >= romanNumeralsChart[romanNumeral]) {
			return romanNumeral + convertToRoman(num - romanNumeralsChart[romanNumeral])
		}
	}
}

console.log(convertToRoman(36))
console.log(convertToRoman(0))
console.log(convertToRoman(1))
console.log(convertToRoman(-41))