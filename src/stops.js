"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class Stops {
    constructor(graphs) {
        this.generateLinks = (graph) => {
            const stops = graph.split(', ');
            return lodash_1.reduce(stops, (res, item) => {
                const start = item.slice(0, 1);
                const end = item.slice(1, 2);
                const distance = item.slice(2);
                return lodash_1.merge(res, {
                    [start]: Object.assign({}, res[start], { [end]: {
                            distance,
                        } }),
                });
            }, {});
        };
        this.links = this.getLinks(graphs);
    }
    getLinks(graphs) {
        return this.generateLinks(graphs);
    }
    getRouteDistance(routeStr) {
        const routes = routeStr.split('-');
        const arr = [];
        lodash_1.reduce(routes, (res, item, index) => {
            if (index === 0) {
                return [routes[0]];
            }
            arr.push([lodash_1.last(res), item]);
            return [
                ...res,
                item,
            ];
        }, [routes[0]]);
        return arr;
    }
    calcRoutesDistance(routeStr) {
        const stopGroups = this.getRouteDistance(routeStr);
        try {
            return lodash_1.reduce(stopGroups, (res, item) => {
                const distance = lodash_1.get(this.links, [...item, 'distance']);
                if (!distance) {
                    throw new Error(' NO SUCH ROUTE');
                }
                return Number(res) + Number(distance);
            }, 0);
        }
        catch (_a) {
            return ' NO SUCH ROUTE';
        }
    }
    findRoute(start, end) {
        lodash_1.forEach(this.links, (link) => {
            lodash_1.forEach(lodash_1.keys(this.links[start]), (key) => {
                if (!link[key] || link[key] === link[end]) {
                    return;
                }
                return this.findRoute(key, end);
            });
        });
    }
}
const stops = new Stops('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
console.log('1: A_B_C: ', stops.calcRoutesDistance('A-B-C'));
console.log('2: A_D:', stops.calcRoutesDistance('A-D'));
console.log('3: A_D_C:', stops.calcRoutesDistance('A-D-C'));
console.log('4: A_E_B_C_D', stops.calcRoutesDistance('A-E-B-C-D'));
console.log('5: A_E_D', stops.calcRoutesDistance('A-E-D'));
console.log('links', stops.links);
console.log('links', stops.findRoute('C', 'C'));
