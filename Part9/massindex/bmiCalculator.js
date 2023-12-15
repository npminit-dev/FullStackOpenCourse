"use strict";
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
    if (BMI >= 18.5 && BMI < 25)
        return 'Normal Weight';
    return 'Obesity';
};
exports.getBMI = getBMI;
