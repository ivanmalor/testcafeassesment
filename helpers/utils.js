const _ = require('lodash');

export function sortByDeviceCapacity(list) {
    _.map(list, data => {
        data.hdd_capacity =  parseInt(data.hdd_capacity)
    });
    return _.sortBy(list, 'hdd_capacity', 'asc');
}