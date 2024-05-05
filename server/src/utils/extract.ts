const extract = function <T>(obj: T, ...values: (keyof T)[]) {
  const newObj: any = {}

  for (const val of values) {
    newObj[val as string] = obj[val]
  }

  return newObj
}

export default extract
