import { ClientFunction, Selector } from 'testcafe';

class Page {
    constructor() {
        this.devices = Selector('div.list-devices').find('div.device-main-box');
        this.deviceName = 'div.device-info > span.device-name';
        this.deviceType = 'div.device-info > span.device-type';
        this.deviceCapacity = 'div.device-info > span.device-capacity';
        this.editDeviceButton = 'div.device-options > a.device-edit';
        this.removeDeviceButton = 'div.device-options > button.device-remove';
    }

    async refresh() {
        await ClientFunction(() => {
            document.location.reload();
        })();
    }
}

export default new Page();
