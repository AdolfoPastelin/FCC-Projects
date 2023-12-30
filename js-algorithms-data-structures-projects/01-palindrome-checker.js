function palindrome(str) {
	if (typeof str !== 'string' || str === '') return

	const validCharactersArr = str.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().split('').filter(char => char !== ' ')
	const reversedValidCharactersArr = validCharactersArr.slice().reverse()

	return validCharactersArr.every((char, index) => char === reversedValidCharactersArr[index])
}

console.log(palindrome("eye"))
console.log(palindrome("anitalavalatina"))
console.log(palindrome("botella"))
console.log(palindrome("A man, a plan, a canal. Panama"))
console.log(palindrome("1 eye for of 1 eye."))
console.log(palindrome("0_0 (: /-\ :) 0-0"))
console.log(palindrome("#%//(#"))
console.log(palindrome(""))
console.log(palindrome(-1))
