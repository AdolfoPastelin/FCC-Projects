function rot13(str) {
  return str.replace(/[A-Z]/g, (char) => {
		const charCode = char.charCodeAt(0)
		
		// Range from A to M
		if (charCode >= 65 && charCode <= 77) {
			return String.fromCharCode(charCode + 13)
		}

		// Range from N to Z
		if (charCode >= 78 && charCode <= 90) {
			return String.fromCharCode(charCode - 13)
		}

		return char
	})
}

console.log(rot13("SERR PBQR PNZC"))
console.log(rot13("SERR CVMMN!"))