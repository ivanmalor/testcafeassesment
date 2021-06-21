import { ClientFunction, Selector } from 'testcafe';

//CSS Selectors
const devicesCss = 'div.list-devices > div.device-main-box';
const deviceInfoCss = 'div.device-info';
const deviceOptionsCss = 'div.device-options';

class Page {
    constructor() {
        this.devices = Selector(devicesCss);
        this.deviceName = Selector(devicesCss).child(deviceInfoCss).child('span.device-name')
        this.deviceType = Selector(devicesCss).child(deviceInfoCss).child('span.device-type');
        this.deviceCapacity = Selector(devicesCss).child(deviceInfoCss).child('span.device-capacity');
        this.editDeviceBtn = Selector(devicesCss).child(deviceOptionsCss).child('a.device-edit');
        this.removeDeviceBtn = Selector(devicesCss).child(deviceOptionsCss).child('button.device-remove');
    }

    async isDeviceInfoVisible(number) {
        return await this.deviceName.nth(number).visible
            || this.deviceType.nth(number).visible
            || this.deviceCapacity.nth(number).visible;
    }
    async getDeviceName(number) {
        return await this.deviceName.nth(number).textContent
    }

    async getDeviceType(number) {
        return await this.deviceType.nth(number).textContent
    }

    async getDeviceCapacity(number) {
        return await this.deviceCapacity.nth(number).textContent
    }

    async deviceButtonsExists(number) {
        return await this.editDeviceBtn.nth(number).exists || this.removeDeviceBtn.nth(number).exists
    }

    async refresh() {
        await ClientFunction(() => {
            document.location.reload();
        })();
    }
}

export default new Page();
