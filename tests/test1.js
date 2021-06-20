import restClient from '../helpers/restclient';
import page from '../helpers/page-model';

const _ = require('lodash');

fixture`List of Devices`
    .page('http:localhost:3001')
    .before(async ctx => {
        const devices = await restClient.getDevices();
        _.map(devices, data => {
            data.hdd_capacity =  parseInt(data.hdd_capacity)
        });
        const sortedDevices = _.sortBy(devices, 'hdd_capacity', 'asc');
        ctx.devices = sortedDevices;
    });

test('Test1 - List of devices', async t => {
    const expectedDevices = t.fixtureCtx.devices;

    const numberOfDevices = await page.devices.count;

    for (let i = 0; i < numberOfDevices; i++) {
        let device = page.devices.nth(i);

        let deviceName = device.find(page.deviceName);
        let deviceType = device.find(page.deviceType);
        let deviceCapacity = device.find(page.deviceCapacity);

        let editDeviceButtonExists = device.find(page.editDeviceButton).exists;
        let removeDeviceButtonExists = device.find(page.removeDeviceButton).exists;

        await t
            .expect(numberOfDevices).eql(10)
            .expect(deviceName.textContent).eql(expectedDevices[i].system_name)
            .expect(deviceType.textContent).eql(expectedDevices[i].type)
            .expect(deviceCapacity.textContent).eql(expectedDevices[i].hdd_capacity + ' GB')
            .expect(editDeviceButtonExists).ok()
            .expect(removeDeviceButtonExists).ok();
    }
});
