function telephoneCheck(str) {
	if (str.includes('(') && !str.includes(')') || !str.includes('(') && str.includes(')')) {
		return false
	}

	const validUSNumberFormat = /^1?\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/
	return validUSNumberFormat.test(str)
}

console.log(telephoneCheck("555-555-5555")) // true
console.log(telephoneCheck("555-5555")) // false
console.log(telephoneCheck("1 555)555-5555")) // false
console.log(telephoneCheck("555)-555-5555")) // false
console.log(telephoneCheck("555)-555-5555")) // false
console.log(telephoneCheck("(555-555-5555")) // false
console.log(telephoneCheck("(555) 555-5555")) // true
console.log(telephoneCheck("27576227382")) // false
