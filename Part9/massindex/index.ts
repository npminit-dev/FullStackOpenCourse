import { getBMI } from "./bmiCalculator";
import { getExerciseMetrics } from "./exerciseCalculator";

console.log(getBMI(1.82, 78))
console.log(getBMI(1.61, 120))
console.log(getBMI(1.80, 55))

console.log(getExerciseMetrics([3, 0, 2, 4.5, 0, 3, 1], 2))
console.log(getExerciseMetrics([4, 3, 2, 1], 2))
console.log(getExerciseMetrics([0, 0, 1, 2, 1, 0.5, 1], 2))