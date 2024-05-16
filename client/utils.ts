export function getDate() {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const suffixes = ['st', 'nd', 'rd', 'th']

  const currentDate = new Date()
  const month = months[currentDate.getMonth()]
  const day = currentDate.getDate()
  let suffix = 'th'

  // Determine suffix for the day
  if (day >= 11 && day <= 13) {
    suffix = 'th'
  } else {
    const digit = day % 10
    if (digit >= 1 && digit <= 3) {
      suffix = suffixes[digit - 1]
    }
  }

  const year = currentDate.getFullYear()

  return `${month} ${day}${suffix}, ${year}`
}
