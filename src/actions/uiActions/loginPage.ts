import { Page, Locator, expect } from "@playwright/test";
import { testUI } from '../../lib/ui/ui.fixture';
import { UIClient } from '../../lib/ui/uiClient'

export default class LoginScreen {
    private page: Page;
    private ui: UIClient;

    // Locators
    private usernameInput: Locator;
    private passwordInput: Locator;
    private floatButtonPlus: Locator;
    private signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ui = new UIClient(page);

        // Initialize locators
        this.usernameInput = page.locator('[placeholder="username"]');
        this.passwordInput = page.locator('[placeholder="password"]');
        this.floatButtonPlus = page.locator('#view-icon-project');
        this.signInButton = page.locator('[value="Sign In"]');
    }

    public async launchApplication(): Promise<void> {
        await testUI.step('Launch the application', async () => {
            await this.page.goto(process.env.BASE_URL + '/login');
        });
    }

    public async performLogin(username: string, password: string, isSuccess: boolean = true): Promise<void> {
        await testUI.step('Perform login with username and password', async () => {
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.signInButton.click();
            if (isSuccess) {
                await this.verifyLoginSuccess();
            }
        });
    }

    public async verifyLoginSuccess(): Promise<void> {
        await testUI.step('Verify successful login by checking visibility of the floating button and URL', async () => {
            const targetUrl = '';

            // Retry logic for navigation
            for (let attempt = 0; attempt < 3; attempt++) {
                try {
                    await this.page.waitForURL(targetUrl, { timeout: 60000 });
                    if (this.page.url() === targetUrl) break;
                } catch (error) {
                    if (attempt === 2) throw error; // Throw error after 3 failed attempts
                }
            }

            // Ensure the target element is visible
            await expect(this.floatButtonPlus).toBeVisible();
        });
    }
}