export function repeat(fn, numberOfTimes) {
  return Array(numberOfTimes)
    .fill(0)
    .map((_, index) => fn(index))
}

export function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? "-" : ""

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString()
    let j = i.length > 3 ? i.length % 3 : 0

    return (
      negativeSign + "$" + 
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    )
  } catch (e) {
    return "Invalid value"
  }
}

export function makeSingleValueOrRange(minVal, maxVal, formatFn) {
  if (formatFn) {
    return minVal === maxVal
      ? formatFn(minVal)
      : `${formatFn(minVal)} – ${formatFn(maxVal)}`
  }
  return minVal === maxVal ? minVal : `${minVal} – ${maxVal}`
}
