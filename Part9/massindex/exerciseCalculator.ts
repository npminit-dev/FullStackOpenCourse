type qualiType = 1|2|3

interface ExerciseMetric {
  days: number,
  trainingDays: number,
  originalTarget: number,
  avgTime: number,
  targetReached: boolean,
  qualification: qualiType,
  explanation: string
}

export const getExerciseMetrics = (weekRegister: number[], target: number): ExerciseMetric => {
  if(!Array.isArray(weekRegister)) throw new Error('First argument must be an array')
  if((Number.isNaN(target) || typeof(target) !== 'number')) throw new Error('Second argument must be of type number')

  let trainingDays =  weekRegister.filter(day => {
    if(day < 0 || typeof(day) !== 'number') throw new Error('First argument array must contain only positive values of type number')
    if(day > 0) return true
    return false
  }).length

  let avgTime =  weekRegister.reduce((acc, curr) => acc += curr, 0) / weekRegister.length

  let qualy: qualiType = avgTime >= target ? 3 : avgTime >= target * .75 ? 2 : 1

  let metrics: ExerciseMetric = {
    days: weekRegister.length,
    trainingDays,
    originalTarget: target,
    avgTime,
    targetReached: avgTime >= target,
    qualification: qualy,
    explanation: qualy === 3 ? 'Great! you have reached your target' : qualy === 2 ? 'You have overcomed the 75% of the target, but can be improved' : 'Target not reached, come back stronger'
  };

  return metrics
}

let args = [...process.argv]

if(args && args.length > 2) {
  console.log('CLI running script...\n')
  args = args.slice(2)
  let weekReg = args.slice(0, args.length - 1)
  let target: string|number = args.slice(-1)[0]
  if(isNaN(target as any)) throw new Error('Invalid last argument, must be a number')
  else target = parseFloat(target)
  let arrConverted = weekReg.map((day, i) => {
    if(!isNaN(day as any)) return parseFloat(day)
    else throw new Error(`Invalid array argument at position ${i}: must ve a number`)
  })
  
  console.log('getExerciseMetrics return value: ')
  console.log(getExerciseMetrics(arrConverted, target))
}