import {Page, Locator, expect} from '@playwright/test';
import {testUI} from "../../lib/ui/ui.fixture";

const SELECTORS = {
    sampleIcon: '#view-icon-contract',
};

export default class HomePage {
    private page: Page;

    // Locators
    private sampleLocator: Locator;


    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.sampleLocator = page.locator(SELECTORS.sampleIcon);
    }

    public async launchApplication(): Promise<void> {
        await testUI.step('Launch the application', async () => {
            await this.page.goto(process.env.BASE_URL);
        });
    }

    public async verifyHomePage(): Promise<void> {
        await this.page.getByRole('button', {name: 'Akzeptieren'}).click();
        await expect(this.page.locator('[id="__next"]')).toMatchAriaSnapshot(`
    - link "Platform logo":
      - img "Platform logo"
    - text: Search
    - img "Chevron down small icon"
    - link "Sell"
    - link "Estimate"
    - link "Assure"
    - link "Electromobility"
    - link "Comparison tool (0)":
      - img "Compare icon"
    - text: Login
    - img "Avatar icon"
    - button "EN"
    `);
        await expect(this.page.getByRole('main')).toMatchAriaSnapshot(`
    - heading /Search in \\d+'\\d+ vehicles/ [level=1]:
      - img
    - tablist:
      - tab "Car icon Car" [selected]:
        - img "Car icon"
        - paragraph: Car
      - tab "Camper icon Camper":
        - img "Camper icon"
        - paragraph: Camper
      - tab "Utility vehicle icon Utility":
        - img "Utility vehicle icon"
        - paragraph: Utility
      - tab "Truck icon Truck":
        - img "Truck icon"
        - paragraph: Truck
      - tab "Trailer icon Trailer":
        - img "Trailer icon"
        - paragraph: Trailer
      - tab "Motorcycle icon Motorcycle Arrow diagonal icon":
        - img "Motorcycle icon"
        - paragraph: Motorcycle
        - img "Arrow diagonal icon"
    - group:
      - button "Make & Model"
    - group:
      - button "Year"
    - group:
      - button "Price"
    - link /\\d+'\\d+ results/
    - link "Advanced Search Icon Advanced search":
      - img "Advanced Search Icon"
    `);
        await expect(this.page.getByRole('main')).toMatchAriaSnapshot(`
    - heading "Your recently viewed Cars listings" [level=2]
    - paragraph:
      - text: No visited listings yet. Start your
      - link "search"
      - text: now.
    `);
        await expect(this.page.getByRole('main')).toMatchAriaSnapshot(`
    - img "Private seller illustration"
    - img
    - text: New AutoScout24 Direct
    - heading "Sell ​​your car to a dealer quickly and safely" [level=3]
    - link "Create auction"
    - paragraph: AutoScout24 Direct is non-binding and free of charge
    `);
        await expect(this.page.getByRole('main')).toMatchAriaSnapshot(`
    - img
    - text: Professional advisor
    - heading "With know-how to your dream vehicle" [level=2]
    - link "Battery icon Electromobility Guide":
      - img "Battery icon"
    - link "Document check icon Car buying guide":
      - img "Document check icon"
    - link "Steering wheel icon Auto Highlights & Tests":
      - img "Steering wheel icon"
    - link "Car condition icon New or used car":
      - img "Car condition icon"
    - link "Credit icon Overview of car financing":
      - img "Credit icon"
    - link "Document icon Purchase contract & checklists":
      - img "Document icon"
    - img "Magazine Illustration"
    `);

        await expect(this.page.getByRole('main')).toMatchAriaSnapshot(`
    - img
    - text: Professional advisor
    - heading "With know-how to your dream vehicle" [level=2]
    - link "Battery icon Electromobility Guide":
      - img "Battery icon"
    - link "Document check icon Car buying guide":
      - img "Document check icon"
    - link "Steering wheel icon Auto Highlights & Tests":
      - img "Steering wheel icon"
    - link "Car condition icon New or used car":
      - img "Car condition icon"
    - link "Credit icon Overview of car financing":
      - img "Credit icon"
    - link "Document icon Purchase contract & checklists":
      - img "Document icon"
    - img "Magazine Illustration"
    `);
        await this.page.getByRole('main').locator('div').filter({hasText: 'Dealers near youFirst take a'}).nth(1).click();
        await expect(this.page.getByRole('main')).toMatchAriaSnapshot(`
    - img "FinanceScout24 Logo"
    - heading "Financing and insuring made easy" [level=3]
    - link "Compare financing Arrow right icon":
      - img "Arrow right icon"
    - img "Person comparing insurances"
    `);
        await expect(this.page.getByRole('main')).toMatchAriaSnapshot(`
    - img "MotoScout24 Logo"
    - heading "Find your dream motorcycle just around the corner" [level=3]
    - link "Search motorcycles Arrow right icon":
      - img "Arrow right icon"
    - img "2 people next to a motorcycle"
    `);
        await this.page.getByRole('tab', { name: 'Camper icon Camper' }).click();
        await expect(this.page.getByRole('main')).toMatchAriaSnapshot(`
    - heading "Your recently viewed Campers listings" [level=2]
    - paragraph:
      - text: No visited listings yet. Start your
      - link "search"
      - text: now.
    `);
        await this.page.getByRole('tab', { name: 'Utility vehicle icon Utility' }).click();
        await expect(this.page.getByRole('main')).toMatchAriaSnapshot(`
    - heading "Your recently viewed Utility vehicles listings" [level=2]
    - paragraph:
      - text: No visited listings yet. Start your
      - link "search"
      - text: now.
    `);
        await this.page.getByRole('tab', { name: 'Truck icon Truck' }).click();
        await expect(this.page.getByRole('main')).toMatchAriaSnapshot(`
    - heading "Your recently viewed Trucks listings" [level=2]
    - paragraph:
      - text: No visited listings yet. Start your
      - link "search"
      - text: now.
    `);
        await this.page.getByRole('tab', { name: 'Trailer icon Trailer' }).click();
        await expect(this.page.getByRole('main')).toMatchAriaSnapshot(`
    - heading "Your recently viewed Trailers listings" [level=2]
    - paragraph:
      - text: No visited listings yet. Start your
      - link "search"
      - text: now.
    `);
        await expect(this.page.getByRole('tab', { name: 'Motorcycle icon Motorcycle' })).toBeVisible();
    }

    public async sellerSearch(): Promise<void> {
        await this.page.getByRole('tab', { name: 'Car icon Car' }).click();
        await this.page.getByRole('button', { name: 'Make & Model' }).click();
        await this.page.getByLabel('BMW').click();
        await this.page.getByRole('button', { name: 'M6' }).click();
        await expect(this.page.getByLabel('Make & Model1Close iconReset')).toMatchAriaSnapshot(`
    - banner:
      - paragraph: Make & Model 1
      - button "Close"
      - button "Reset"
    - list:
      - listitem:
        - button "Make BMW"
        - button "Model M6"
        - button "Version"
    - button "Add vehicle"
    - contentinfo:
      - button "Apply filter"
    `);
        await this.page.getByRole('button', { name: 'Apply filter' }).click();
        await expect(this.page.getByRole('link', { name: 'results' })).toBeVisible();
        await this.page.getByRole('link', { name: 'results' }).click();
    }
}