const extract = function <T>(obj: T, ...values: (keyof T)[]) {
  const newObj = {}

  for (const val of values) {
    newObj[val as string] = obj[val]
  }

  return newObj as Extract<T, (typeof values)[number]>
}

export default extract
