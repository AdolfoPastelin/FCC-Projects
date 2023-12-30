function checkCashRegister(price, cash, cid) {
  const TYPE = 0
  const AMOUNT = 1
  const change = []
  const coinValues = {
    'PENNY': 0.01,
    'NICKEL': 0.05,
    'DIME': 0.1,
    'QUARTER': 0.25,
    'ONE': 1,
    'FIVE': 5,
    'TEN': 10,
    'TWENTY': 20,
    'ONE HUNDRED': 100
  } 
  const originalCID = [...cid]
  const sortedCID = cid.sort((coinA, coinB) => coinValues[coinB[TYPE]] - coinValues[coinA[TYPE]])

  let changeDue = cash - price
  let totalCID = cid.reduce((accumulator, coin) => accumulator + coin[AMOUNT], 0)


  for (const coin of sortedCID) {
    const coinType = coin[TYPE]
    const coinValue = coinValues[coinType]
    let coinAmount = coin[AMOUNT]

    if (coinValue > changeDue || coinAmount === 0) continue

    let amountToReturn = 0

    while (changeDue >= coinValue && coinAmount > 0) {
      changeDue -= coinValue
      coinAmount -= coinValue
      amountToReturn += coinValue

      changeDue = Math.round(changeDue * 100) / 100
    }

    if (amountToReturn > 0) {
      amountToReturn = Number(amountToReturn.toFixed(2))
      change.push([coinType, amountToReturn])
    }

    totalCID -= amountToReturn
  }

  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] }
  } 
  
  if (totalCID === 0) {
    return { status: "CLOSED", change: originalCID }
  }

  return { status: "OPEN", change }
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))
//{status: "OPEN", change: [["QUARTER", 0.5]]}

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))
//{status: "INSUFFICIENT_FUNDS", change: []}

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))
//{status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}