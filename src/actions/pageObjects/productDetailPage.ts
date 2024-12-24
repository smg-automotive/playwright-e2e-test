import {Page, Locator, expect} from '@playwright/test';
import * as punycode from "node:punycode";

const SELECTORS = {
    sampleIcon: '#view-icon-contract',
};

export default class ProductDetailPage {
    private page: Page;

    // Locators
    private sampleLocator: Locator;


    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.sampleLocator = page.locator(SELECTORS.sampleIcon);
    }

    public async verifyDetailPage(): Promise<void> {
        await expect(this.page.getByRole('main')).toMatchAriaSnapshot(`- paragraph: /CHF \\d+'\\d+\\.–/`);
        await expect(this.page.getByRole('main')).toMatchAriaSnapshot(`
    - paragraph: /CHF \\d+'\\d+\\.–/
    - link /Calculator icon CHF \\d+\\.– per month with leasing contract/:
      - img "Calculator icon"
    - link "Check Shield icon Calculate insurance premium":
      - img "Check Shield icon"
    `);

        await expect(this.page.getByRole('main')).toMatchAriaSnapshot(`
    - img "Calendar icon"
    - paragraph: /\\d+\\.\\d+/
    - img "Car icon"
    - paragraph: Sedan
    - img "Road icon"
    - paragraph: /\\d+'\\d+ km/
    - img "Gas station icon"
    - paragraph: Petrol
    - img "Transmission icon"
    - paragraph: Automated (AMT)
    - img "Vehicle power icon"
    - paragraph: /\\d+ PS \\(\\d+ kW\\)/
    - img "Drive type icon"
    - paragraph: Rear-wheel drive
    - img "Consumption icon"
    - paragraph: /\\d+\\.\\d+ l\\/\\d+ km/
    `);
        await expect(this.page.getByRole('button', { name: 'Arrow down icon Show all' })).toBeVisible();
        await expect(this.page.locator('#expandable-equipment')).toMatchAriaSnapshot(`
    - heading "Optional equipment" [level=3]
    - list:
      - listitem: Aktivsitze für Fahrer und Beifahrer
      - listitem: "Assist: Rückfahrkamera"
      - listitem: "/BMW Garantie: 3 Jahre oder \\\\d+'\\\\d+ km Gratis-Service: \\\\d+ Jahre oder \\\\d+'\\\\d+ km \\\\(ab 1\\\\. Inv\\\\.\\\\)/"
      - listitem: BMW Individual Dachhimmel Alcantara
      - listitem: BMW Individual Dachhimmel Alcantara Anthrazit
      - listitem: BMW Individual Sonnenschutzverglasung
      - listitem: Bang & Olufsen Soundsystem
      - listitem: Driving Assistant
      - listitem: Entertainment-Paket
      - listitem: Exterieur Line Aluminium satiniert
    `);

    }

    public async openMessageLead(): Promise<void> {
        await this.page.getByRole('main').getByRole('link', { name: 'Contact' }).click();
    }

    public async verifyListingPreview(): Promise<void> {
        await expect(this.page.getByRole('heading', { name: 'AC' })).toBeVisible();
        await expect(this.page.getByText('CHF 9\'999.–').first()).toBeVisible();
    }
}