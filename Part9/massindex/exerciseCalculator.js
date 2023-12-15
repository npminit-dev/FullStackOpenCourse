"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExerciseMetrics = void 0;
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
    var qualy = avgTime >= target ? 3 : avgTime >= target * .75 ? 2 : 1;
    var metrics = {
        days: weekRegister.length,
        trainingDays: trainingDays,
        originalTarget: target,
        avgTime: avgTime,
        targetReached: avgTime >= target,
        qualification: qualy,
        explanation: qualy === 3 ? 'Great! you have reached your target' : qualy === 2 ? 'You have overcomed the 75% of the target, but can be improved' : 'Target not reached, come back stronger'
    };
    return metrics;
};
exports.getExerciseMetrics = getExerciseMetrics;
var args = __spreadArray([], process.argv, true);
if (args && args.length) {
    console.log('CLI running script...\n');
    args = args.slice(2);
    var weekReg = args.slice(0, args.length - 1);
    var target = args.slice(-1)[0];
    if (isNaN(target))
        throw new Error('Invalid last argument, must be a number');
    else
        target = parseFloat(target);
    var arrConverted = weekReg.map(function (day, i) {
        if (!isNaN(day))
            return parseFloat(day);
        else
            throw new Error("Invalid array argument at position ".concat(i, ": must ve a number"));
    });
    console.log('getExerciseMetrics return value: ');
    console.log((0, exports.getExerciseMetrics)(arrConverted, target));
}
