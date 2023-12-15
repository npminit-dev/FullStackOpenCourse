
export const getBMI = (heightOnMts: number, weightOnKgs: number): string => {
  if(!(typeof(heightOnMts) === 'number') || !(typeof(weightOnKgs) === 'number')) 
    throw new Error('Both parameters must be of type number.')
  if(heightOnMts > 2.51 || heightOnMts < 0.1) 
    throw new Error('Height must be a value between 0.1mts (10cms) and 2.51mts')
  if(weightOnKgs > 600 || weightOnKgs < 0.1)
    throw new Error('Weight must be a value between 600(kg) and 0.1(100 grams)')
  let BMI: number = weightOnKgs / (heightOnMts ** 2)
  if(BMI < 18.5) return 'Thinness'
  if(BMI >= 18.5 && BMI < 27) return 'Normal Weight'
  return 'Obesity'
}

if(process.argv.length === 4) {
  console.log('CLI script running...\n')
  let args = [...process.argv] as string[]
  args = args.slice(-2)
  let numberArgs = args.map(arg => {
    if(!isNaN(arg as any)) return parseFloat(arg)
    else throw new Error('Cannot cast value to number (at script arguments)')
  })
  console.log('getBMI return value:')
  console.log(getBMI(...numberArgs as [number, number]))
  process.exit(0)
}

