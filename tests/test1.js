import restClient from '../helpers/restclient';
import page from '../helpers/page-model';
import { sortByDeviceCapacity } from '../helpers/utils.js'

fixture`List of Devices`
    .page('http:localhost:3001')
    .beforeEach(async t => {
        const devices = await restClient.getDevices();
        t.ctx.devices = sortByDeviceCapacity(devices);
    })

test('Test1 - List of devices', async t => {
    const expectedDevices = t.ctx.devices;
    const numberOfDevices = await page.devices.count;

    for (let i = 0; i < numberOfDevices; i++) {
        await t
            .expect(await page.isDeviceInfoVisible(i)).ok()
            .expect(await page.getDeviceName(i)).eql(expectedDevices[i].system_name)
            .expect(await page.getDeviceType(i)).eql(expectedDevices[i].type)
            .expect(await page.getDeviceCapacity(i)).eql(expectedDevices[i].hdd_capacity + ' GB')
            .expect(await page.deviceButtonsExist(i)).ok()
            .expect(await page.areDeviceButtonsVisible(i)).ok();
    }
});
