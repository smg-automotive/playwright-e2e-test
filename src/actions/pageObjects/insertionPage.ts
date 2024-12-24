import { Page, Locator, expect } from "@playwright/test";
import { testUI } from '../../lib/ui/ui.fixture';
import { UIClient } from '../../lib/ui/uiClient';

export default class InsertionPage {
    private page: Page;
    private ui: UIClient;

    // Locators
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private signOutButton: Locator;
    private rootElement: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ui = new UIClient(page);

        // Initialize locators
        this.usernameInput = this.page.getByPlaceholder('Enter username/email id');

    }

    public async insertVehicle(): Promise<void> {
        await this.page.getByRole('link', { name: 'Platform logo' }).click();
        await this.page.getByRole('link', { name: 'Verkaufen' }).click();
        await this.page.getByRole('tab', { name: 'Marke und Modell' }).click();
        await this.page.getByRole('link', { name: 'Daten selbst erfassen' }).click({force: true});
        await this.page.waitForTimeout(2000)

        await this.page.getByLabel('Marke *').selectOption('ac');
        await this.page.getByLabel('Modell').selectOption('cobra');
        await this.page.getByLabel('Aufbau *').selectOption('bus');
        await this.page.getByLabel('Fahrzeugfarbe *').selectOption('anthracite');
        await this.page.getByLabel('Fahrzeugzustand *').selectOption('oldtimer');
        await this.page.locator('#firstRegistrationMonth').selectOption('1');
        await this.page.locator('#firstRegistrationYear').selectOption('2022');
        await this.page.getByLabel('Kilometer *').click();
        await this.page.getByLabel('Kilometer *').fill('10000');
        await this.page.getByLabel('Verkaufspreis - CHF *').click();
        await this.page.getByLabel('Verkaufspreis - CHF *').fill('9999');
        await this.page.getByRole('button', { name: 'Weiter' }).click();
        // await this.page.getByRole('button', { name: 'Fotos hochladen' }).click();

        await this.ui.clickAndWaitForAllXHRRequests( this.page.getByRole('button', { name: 'Weiter' }), '')
        await this.ui.clickAndWaitForAllXHRRequests( this.page.getByRole('button', { name: 'Weiter' }), '')
        await this.page.getByRole('button', { name: 'Weiter' }).click({force: true})

        await this.page.getByRole('button', { name: 'Vorschau' }).click({force: true});


    }
}