import page from '../helpers/page-model';
import addDevicePage from '../helpers/add-device-page-model';

fixture`List of Devices`
    .page('http:localhost:3001')

    test('Test2 - Create devices', async t => {

        await t
        .click(page.addDeviceBtn)

        let getLocation = await page.getLocation();
        await t.expect(getLocation()).contains('/devices/add');

        await addDevicePage.enterSystemName('Test 1');
        await addDevicePage.enterHddCapacity('10');
        await addDevicePage.selectDeviceType('MAC');
        await addDevicePage.submitNewDevice();

        getLocation = await page.getLocation();
        await t.expect(getLocation()).contains('http://localhost:3001/');
    });
