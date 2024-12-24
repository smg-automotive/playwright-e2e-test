import {Page, Locator, expect} from '@playwright/test';
import {UIClient} from "../../lib/ui/uiClient";

const SELECTORS = {
    sampleIcon: '#view-icon-contract',
};

export default class SearchResultPage {
    private page: Page;
    private ui: UIClient;

    // Locators
    private sampleLocator: Locator;


    constructor(page: Page) {
        this.page = page;
        this.ui = new UIClient(page);

        // Initialize locators
        this.sampleLocator = page.locator(SELECTORS.sampleIcon);
    }

    public async verifySearchResultPage(): Promise<void> {
        await expect(this.page.getByTestId('autoscout24-filters')).toMatchAriaSnapshot(`
    - group:
      - 'button "Make & Model: BMW M6"'
      - button "Reset"
    - group:
      - button "Year"
    - group:
      - button "Kilometers"
    - group:
      - button "Price"
    - group:
      - button "Body Type"
    - group:
      - button "Fuel"
    - group:
      - button "Transmission"
    - button "More filters"
    `);
        await expect(this.page.getByRole('main')).toMatchAriaSnapshot(`
    - button "previous page" [disabled]:
      - img "Chevron left small icon"
    - button "go to page 1 of 3"
    - button "go to page 2 of 3"
    - button "go to page 3 of 3"
    - button "next page":
      - img "Chevron right small icon"
    `);
    }

    public async openFirstListing(): Promise<void> {
        await this.page.waitForTimeout(2000);
        await this.page.locator('[aria-label="Carousel"]').first().dblclick({ force: true });
    }
}