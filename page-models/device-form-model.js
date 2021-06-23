import { Selector, t } from 'testcafe';

class DeviceFormPage {
    constructor() {
        this.title = Selector('div.device-form > h3');
        this.systemNameField = Selector('#system_name');
        this.systemCapacityField = Selector('#hdd_capacity');
        this.deviceTypeSelect = Selector('#type');
        this.deviceTypeOption = Selector('option');
        this.saveDeviceBtn = Selector('button.submitButton').withExactText('SAVE');
    }

    async enterSystemName (name) {
        await t.typeText(this.systemNameField, name);
    }

    async enterHddCapacity(capacity) {
        await t.typeText(this.systemCapacityField, capacity);
    }

    async selectDeviceType(type) {
        await t
            .click(this.deviceTypeSelect)
            .click(this.deviceTypeOption.withText(type));
    }

    async submitNewDevice() {
        await t.click(this.saveDeviceBtn);
    }
}

export default new DeviceFormPage();