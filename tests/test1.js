import { RestClient } from '../helpers/restclient.js';
import { Selector } from 'testcafe';

const _ = require('lodash');

fixture`List of Devices`
    .page('http:localhost:3001')
    .before(async ctx => {
        const api = new RestClient();
        const devices = await api.getDevices();
        _.map(devices, data => {
            data.hdd_capacity =  parseInt(data.hdd_capacity)
        });
        console.log(devices);
        const sortedDevices = _.sortBy(devices, 'hdd_capacity', 'asc');

        ctx.devices = sortedDevices;
    });

test('Test1', async t => {
    const expectedDevices = t.fixtureCtx.devices;

    const devices = Selector('div.list-devices').find('div.device-main-box');
    const numberOfDevices = await devices.count;

    for (let i = 0; i < numberOfDevices; i++) {
        console.log(`Device number ${i}`)
        console.log('===================');
        let device = devices.nth(i);

        let deviceName = device
            .child('div.device-info')
            .child('span.device-name');

        let deviceType = device
            .child('div.device-info')
            .child('span.device-type');

        let deviceCapacity = device
            .child('div.device-info')
            .child('span.device-capacity');

        let editDeviceButtonExists = device
            .child('div.device-options')
            .child('a.device-edit')
            .exists;

        let removeDeviceButtonExists = device
            .child('div.device-options')
            .child('button.device-remove')
            .exists;

        await t
            .expect(numberOfDevices).eql(10)
            .expect(deviceName.textContent).eql(expectedDevices[i].system_name)
            .expect(deviceType.textContent).eql(expectedDevices[i].type)
            .expect(deviceCapacity.textContent).eql(expectedDevices[i].hdd_capacity + ' GB')
            .expect(editDeviceButtonExists).ok()
            .expect(removeDeviceButtonExists).ok();
    }
});
