import { Page, Locator, expect } from '@playwright/test';
import { UIClient } from "../../lib/ui/uiClient";

const SELECTORS = {
    sampleIcon: '#view-icon-contract',
};

export default class SamplePage {
    private page: Page;
    private ui: UIClient;

    private sampleLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ui = new UIClient(page);

        this.sampleLocator = page.locator(SELECTORS.sampleIcon);
    }

    public async openContractApp(): Promise<void> {
        await this.sampleLocator.click();
        await this.ui.waitForLoadState();
    }
}

