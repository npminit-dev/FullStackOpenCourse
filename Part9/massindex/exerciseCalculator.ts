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

/* 
el número de días
el número de días de entrenamiento
el valor objetivo original
el tiempo promedio calculado
valor booleano que describe si se alcanzó el objetivo
una calificación entre los números 1-3 que indica qué tan bien se cumplen las horas. Puedes decidir la métrica por tu cuenta.
un valor de texto que explique la calificación, puedes inventar las explicaciones
*/

export const getExerciseMetrics = (weekRegister: number[], target: number): ExerciseMetric => {
  if(!Array.isArray(weekRegister)) throw new Error('First argument must be an array')
  if((Number.isNaN(target) || typeof(target) !== 'number')) throw new Error('Second argument must be of type number')

  let trainingDays =  weekRegister.filter(day => {
    if(day < 0 || typeof(day) !== 'number') throw new Error('First argument array must contain only positive values of type number')
    if(day > 0) return true
    return false
  }).length

  let avgTime =  weekRegister.reduce((acc, curr) => acc += curr, 0) / weekRegister.length

  let qualification: qualiType = avgTime >= target ? 3 
                               : avgTime >= target * .75 ? 2 
                               : 1

  let metrics: ExerciseMetric = {
    days: weekRegister.length,
    trainingDays,
    originalTarget: target,
    avgTime,
    targetReached: avgTime >= target,
    qualification,
    explanation: qualification === 3 ? 'Great! you have reached your target' 
               : qualification === 2 ? 'You have overcomed the 75% of the target, but can be improved'
               : 'Target not reached, come back stronger'
  };

  return metrics
}