import page from '../helpers/page-model';
import restClient from '../helpers/restclient';
import { sortByDeviceCapacity } from '../helpers/utils.js'

fixture`Remove device`
    .page('http:localhost:3001')

test('Test4 - Delete Device', async t => {
    let devices = await restClient.getDevices();
    let sortedDevices = sortByDeviceCapacity(devices);
    const lastDeviceIndex = sortedDevices.length - 1;
    const deviceId = sortedDevices[lastDeviceIndex].id;

    const deviceNameElement = page.deviceName.nth(lastDeviceIndex);
    const deviceTypeElement = page.deviceType.nth(lastDeviceIndex);
    const deviceCapacity = page.deviceCapacity.nth(lastDeviceIndex);

    restClient.deleteDevice(deviceId);
    page.refresh();

    await t
        .expect(deviceNameElement.visible).notOk()
        .expect(deviceTypeElement.visible).notOk()
        .expect(deviceCapacity.visible).notOk()
        .expect(deviceNameElement.exists).notOk()
        .expect(deviceTypeElement.exists).notOk()
        .expect(deviceCapacity.exists).notOk()
});
