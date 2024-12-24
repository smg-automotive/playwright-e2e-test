import {Page, Locator, expect} from '@playwright/test';

const SELECTORS = {
    sampleIcon: '#view-icon-contract',
};

export default class MessageLeadPage {
    private page: Page;

    // Locators
    private sampleLocator: Locator;


    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.sampleLocator = page.locator(SELECTORS.sampleIcon);
    }

    public async verifyMessageLead(): Promise<void> {
        await this.page.getByRole('main').getByRole('link', { name: 'Contact' }).click();
        await expect(this.page.locator('form')).toMatchAriaSnapshot(`
    - group:
      - text: First name
      - textbox "First name"
    - group:
      - text: Last name
      - textbox "Last name"
    - group:
      - text: E-mail
      - textbox "E-mail"
    - group:
      - text: Phone number
      - textbox "Phone number"
    - text: Test drive
    - checkbox "Arrange a test drive"
    - text: Arrange a test drive
    - group:
      - text: Message
      - textbox "Message"
    - text: I would like to receive information about
    - group:
      - checkbox "Leasing"
      - text: Leasing
    - group:
      - checkbox "Payment in installments or credit"
      - text: Payment in installments or credit
    - group:
      - checkbox "Insurance"
      - text: Insurance
    - paragraph:
      - text: By sending your message, you accept the
      - link "terms and conditions"
      - text: and acknowledge the
      - link "privacy policy"
    - button "Send message"
    `);
    }

    public async clickBack(): Promise<void> {
        await this.page.getByRole('button', { name: 'Arrow left icon Back' }).click();
    }
}