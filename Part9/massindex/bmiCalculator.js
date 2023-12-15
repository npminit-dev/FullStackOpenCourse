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
exports.getBMI = void 0;
var getBMI = function (heightOnMts, weightOnKgs) {
    if (!(typeof (heightOnMts) === 'number') || !(typeof (weightOnKgs) === 'number'))
        throw new Error('Both parameters must be of type number.');
    if (heightOnMts > 2.51 || heightOnMts < 0.1)
        throw new Error('Height must be a value between 0.1mts (10cms) and 2.51mts');
    if (weightOnKgs > 600 || weightOnKgs < 0.1)
        throw new Error('Weight must be a value between 600(kg) and 0.1(100 grams)');
    var BMI = weightOnKgs / (Math.pow(heightOnMts, 2));
    if (BMI < 18.5)
        return 'Thinness';
    if (BMI >= 18.5 && BMI < 27)
        return 'Normal Weight';
    return 'Obesity';
};
exports.getBMI = getBMI;
if (process.argv.length === 4) {
    console.log('CLI script running...\n');
    var args = __spreadArray([], process.argv, true);
    args = args.slice(-2);
    var numberArgs = args.map(function (arg) {
        if (!isNaN(arg))
            return parseFloat(arg);
        else
            throw new Error('Cannot cast value to number (at script arguments)');
    });
    console.log('getBMI return value:');
    console.log(exports.getBMI.apply(void 0, numberArgs));
    process.exit(0);
}
