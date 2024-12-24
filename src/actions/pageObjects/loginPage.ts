import { Page, Locator, expect } from "@playwright/test";
import { testUI } from '../../lib/ui/ui.fixture';
import { UIClient } from '../../lib/ui/uiClient';

export default class LoginPage {
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

    public async login(): Promise<void> {
        await this.page.getByRole('button', {name: 'Akzeptieren'}).click();
        await this.page.getByText('Login').click();
        await expect(this.page.locator('section')).toMatchAriaSnapshot(`
    - img "Login Illustration"
    - heading "Melden Sie sich in Ihrem Konto an" [level=1]
    - paragraph: Nur ein Login für beide Welten
    - text: E-Mail-Adresse
    - textbox "E-Mail-Adresse"
    - text: Passwort
    - textbox "Passwort"
    - button "Passwort anzeigen"
    - paragraph:
      - link "Passwort vergessen?"
    - button "Fortfahren"
    - paragraph:
      - text: Sie haben noch kein Konto?
      - link "Registrieren"
    `);
        await this.page.getByLabel('E-Mail-Adresse').click();
        await this.page.getByLabel('E-Mail-Adresse').fill('viet.nguyen@swissmarketplace.group');
        await this.page.getByLabel('E-Mail-Adresse').press('Tab');
        await this.page.getByLabel('Passwort').fill('Smg@1990');
        await this.page.getByRole('button', { name: 'Fortfahren' }).click();
    }
}