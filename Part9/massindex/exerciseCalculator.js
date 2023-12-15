"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExerciseMetrics = void 0;
/*
el número de días
el número de días de entrenamiento
el valor objetivo original
el tiempo promedio calculado
valor booleano que describe si se alcanzó el objetivo
una calificación entre los números 1-3 que indica qué tan bien se cumplen las horas. Puedes decidir la métrica por tu cuenta.
un valor de texto que explique la calificación, puedes inventar las explicaciones
*/
var getExerciseMetrics = function (weekRegister, target) {
    if (!Array.isArray(weekRegister))
        throw new Error('First argument must be an array');
    if ((Number.isNaN(target) || typeof (target) !== 'number'))
        throw new Error('Second argument must be of type number');
    var trainingDays = weekRegister.filter(function (day) {
        if (day < 0 || typeof (day) !== 'number')
            throw new Error('First argument array must contain only positive values of type number');
        if (day > 0)
            return true;
        return false;
    }).length;
    var avgTime = weekRegister.reduce(function (acc, curr) { return acc += curr; }, 0) / weekRegister.length;
    var qualification = avgTime >= target ? 3
        : avgTime >= target * .75 ? 2
            : 1;
    var metrics = {
        days: weekRegister.length,
        trainingDays: trainingDays,
        originalTarget: target,
        avgTime: avgTime,
        targetReached: avgTime >= target,
        qualification: qualification,
        explanation: qualification === 3 ? 'Great! you have reached your target'
            : qualification === 2 ? 'You have overcomed the 75% of the target, but can be improved'
                : 'Target not reached, come back stronger'
    };
    return metrics;
};
exports.getExerciseMetrics = getExerciseMetrics;
