import page from '../page-models/page-model';
import deviceFormPage from '../page-models/device-form-model';
import restClient from '../helpers/restclient';
import { getIndexOfDevice, sortByDeviceCapacity } from '../helpers/utils.js'

const faker = require('faker');

fixture`Create Device`
    .page('http:localhost:3001')

test('Test2 - Create devices', async t => {
    const systemName = 'Test-' + faker.random.alphaNumeric(8);
    const hddCapacity = '10';
    const deviceType = 'MAC';

    await t.click(page.addDeviceBtn)

    let getLocation = await page.getLocation();

    await t
        .expect(getLocation()).contains('/devices/add')
        .expect(deviceFormPage.title.textContent).eql('NEW DEVICE');

    await deviceFormPage.enterSystemName(systemName);
    await deviceFormPage.enterHddCapacity(hddCapacity);
    await deviceFormPage.selectDeviceType(deviceType);
    await deviceFormPage.submitNewDevice();

    getLocation = await page.getLocation();
    await t.expect(getLocation()).contains('http://localhost:3001/');

    let devices = await restClient.getDevices();
    let sortedDevices = sortByDeviceCapacity(devices);
    let index = getIndexOfDevice(sortedDevices, systemName);

    await t
        .expect(await page.isDeviceInfoVisible(index)).ok()
        .expect(await page.getDeviceName(index)).eql(sortedDevices[index].system_name)
        .expect(await page.getDeviceType(index)).eql(sortedDevices[index].type)
        .expect(await page.getDeviceCapacity(index)).eql(sortedDevices[index].hdd_capacity + ' GB');
});
