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
        let device = page.devices.nth(i);

        let deviceName = device.find(page.deviceName);
        let deviceType = device.find(page.deviceType);
        let deviceCapacity = device.find(page.deviceCapacity);

        let editDeviceButtonExists = device.find(page.editDeviceButton).exists;
        let removeDeviceButtonExists = device.find(page.removeDeviceButton).exists;

        await t
            .expect(deviceName.visible).ok()
            .expect(deviceName.textContent).eql(expectedDevices[i].system_name)
            .expect(deviceType.visible).ok()
            .expect(deviceType.textContent).eql(expectedDevices[i].type)
            .expect(deviceCapacity.visible).ok()
            .expect(deviceCapacity.textContent).eql(expectedDevices[i].hdd_capacity + ' GB')
            .expect(editDeviceButtonExists).ok()
            .expect(removeDeviceButtonExists).ok();
    }
});
