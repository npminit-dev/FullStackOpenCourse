"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bmiCalculator_1 = require("./bmiCalculator");
var exerciseCalculator_1 = require("./exerciseCalculator");
console.log((0, bmiCalculator_1.getBMI)(1.82, 78));
console.log((0, bmiCalculator_1.getBMI)(1.61, 120));
console.log((0, bmiCalculator_1.getBMI)(1.80, 55));
console.log((0, exerciseCalculator_1.getExerciseMetrics)([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log((0, exerciseCalculator_1.getExerciseMetrics)([4, 3, 2, 1], 2));
console.log((0, exerciseCalculator_1.getExerciseMetrics)([0, 0, 1, 2, 1, 0.5, 1], 2));