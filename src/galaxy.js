"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class Galaxy {
    get symbolValueMapping() {
        return {
            I: 1,
            V: 5,
            X: 10,
            L: 50,
            C: 100,
            D: 500,
            M: 1000,
        };
    }
    get valueToSymbolMapping() {
        return lodash_1.invert(this.symbolValueMapping);
    }
    toRoman(num, times) {
        const one = this.valueToSymbolMapping[1 * times];
        const five = this.valueToSymbolMapping[5 * times];
        if (num < 4) {
            return lodash_1.repeat(one, num);
        }
        if (num >= 4 && num <= 8) {
            return `${lodash_1.repeat(one, 5 - num)}${five}${lodash_1.repeat(one, num - 5)}`;
        }
        return `${one}${this.valueToSymbolMapping[10 * times]}`;
    }
    romansToNumerals(romans) {
        const romansArr = this.splitRomans(romans);
        return lodash_1.sum(lodash_1.map(romansArr, (item, index) => {
            if (index < romansArr.length - 1
                && this.symbolValueMapping[item] < this.symbolValueMapping[romansArr[index + 1]]) {
                return -this.symbolValueMapping[item];
            }
            return this.symbolValueMapping[item];
        }));
    }
    numeralsToRomans(num) {
        const digits = this.splitNumeralsToDigits(num);
        const result = digits.reverse()
            .map((i, index) => {
            return this.toRoman(Number(i), Math.pow(10, index));
        })
            .reverse();
        return lodash_1.compact(result).join('');
    }
    splitRomans(romans) {
        return romans.split('');
    }
    splitNumeralsToDigits(num) {
        return String(num).split('');
    }
    get baseUnit() {
        return {
            glob: 'I',
            prok: 'V',
            pish: 'X',
            tegj: 'L',
        };
    }
    get prices() {
        return {
            silver: galaxy.countUnitPrice('glob glob', 34),
            gold: galaxy.countUnitPrice('glob prok', 57800),
            iron: galaxy.countUnitPrice('pish pish', 3910),
        };
    }
    getAmount(amount) {
        const romanNum = lodash_1.reduce(amount.split(' '), (res, item) => {
            return `${res}${this.baseUnit[item]}`;
        }, '');
        return this.romansToNumerals(romanNum);
    }
    countUnitPrice(amount, price) {
        if (this.getAmount(amount) <= 0) {
            return;
        }
        return price / this.getAmount(amount);
    }
    getPrice(amount, goods) {
        const num = this.getAmount(amount);
        return num * this.prices[goods];
    }
}
const galaxy = new Galaxy();
console.log(galaxy.numeralsToRomans(34));
console.log(galaxy.romansToNumerals('MCMIII'));
console.log('prices', galaxy.prices);
console.log('pish tegj glob glob ', galaxy.romansToNumerals('XLII'));
console.log('glob prok Silver', galaxy.getPrice('glob prok', 'silver'));
console.log('glob prok Gold', galaxy.getPrice('glob prok', 'gold'));
console.log('glob prok Iron', galaxy.getPrice('glob prok', 'iron'));
