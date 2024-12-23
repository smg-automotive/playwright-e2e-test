import {Locator, Page} from "@playwright/test";
import {test} from "../generic/fixtures";
import {boxedStep} from "../generic/boxedStep";
import GenericConstants from "../../resources/consts/consts.generic";

export default class UIElementActions {
    protected locator: Locator;
    protected description: string;
    protected selector: string;

    constructor(private page: Page) {
    }

    public getLocator(): Locator {
        return this.locator.first();
    }

    public getLocators(): Locator {
        return this.locator;
    }

    public setElement(selector: string, description: string): UIElementActions {
        this.selector = selector;
        this.locator = this.page.locator(this.selector);
        this.description = description;
        return this;
    }

    public setLocator(locator: Locator, description: string): UIElementActions {
        this.locator = locator;
        this.description = description;
        return this;
    }

    @boxedStep
    public async fill(inputValue: string) {
        await test.step(`Entering Text on ${this.description} as ${inputValue}`, async () => {
            await this.getLocator().fill(inputValue, {timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return this;
    }

    @boxedStep
    public async clear() {
        await test.step(`Clear Text on ${this.description}`, async () => {
            await this.getLocator().clear({timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return this;
    }

    @boxedStep
    public async click() {
        await test.step(`Clicking on ${this.description}`, async () => {
            await this.getLocator().click({timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return this;
    }

    @boxedStep
    public async doubleClick() {
        await test.step(`Double Clicking ${this.description}`, async () => {
            await this.getLocator().dblclick({timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return this;
    }

    @boxedStep
    public async scrollIntoView() {
        await test.step(`Scroll to element ${this.description}`, async () => {
            await this.getLocator().scrollIntoViewIfNeeded({timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return this;
    }

    @boxedStep
    public async waitTillInvisible() {
        await test.step(`Waiting for ${this.description} to be invisible`, async () => {
            await this.getLocator().waitFor({state: "hidden", timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return this;
    }

    @boxedStep
    public async waitTillDetached() {
        await test.step(`Wait for ${this.description} to be detached from DOM`, async () => {
            await this.getLocator().waitFor({state: "detached", timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return this;
    }

    @boxedStep
    public async waitTillVisible(sec: number) {
        await test.step(`Wait for ${this.description} to be visible in DOM`, async () => {
            await this.getLocator().waitFor({state: "visible", timeout: sec * 1000});
        });
        return this;
    }

    @boxedStep
    public async waitForPresent() {
        await test.step(`Wait for ${this.description} to attach to DOM`, async () => {
            await this.getLocator().waitFor({state: "attached", timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return this;
    }

    @boxedStep
    public async hover() {
        await test.step(`Hovering on ${this.description}`, async () => {
            await this.getLocator().hover({force: true, timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return this;
    }

    @boxedStep
    public async getInputValue(): Promise<string> {
        let value: string = '';
        await test.step(`Getting input value of ${this.description}`, async () => {
            const element = this.getLocator();
            await element.waitFor();
            value = await element.inputValue({timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return value;
    }

    @boxedStep
    public async getTextContent(): Promise<string> {
        let content: string = '';
        await test.step(`Getting text content of ${this.description}`, async () => {
            const element = this.getLocator();
            await element.waitFor();
            content = (await element.textContent({timeout: GenericConstants.DEFAULT_TIMEOUT}))?.trim() ?? '';
        });
        return content;
    }

    @boxedStep
    public async getAttribute(attributeName: string): Promise<string> {
        let value: string = '';
        await test.step(`Getting attribute value of ${this.description}`, async () => {
            const element = this.getLocator();
            await element.waitFor();
            const attributeValue = await element.getAttribute(attributeName, {timeout: GenericConstants.DEFAULT_TIMEOUT});
            value = attributeValue ? attributeValue.trim() : '';
        });
        return value;
    }

    @boxedStep
    public async getInnerHTML(): Promise<string> {
        let text: string = '';
        await test.step(`Get innerHTML of ${this.description}`, async () => {
            const element = this.getLocator();
            await element.waitFor({timeout: GenericConstants.DEFAULT_TIMEOUT});
            text = (await element.innerHTML({timeout: GenericConstants.DEFAULT_TIMEOUT})).trim();
        });
        return text;
    }

    @boxedStep
    public async getInnerText(): Promise<string> {
        let text: string = '';
        await test.step(`Get inner text of ${this.description}`, async () => {
            const element = this.getLocator();
            await element.waitFor({timeout: GenericConstants.DEFAULT_TIMEOUT});
            text = (await element.innerText({timeout: GenericConstants.DEFAULT_TIMEOUT})).trim();
        });
        return text;
    }

    @boxedStep
    public async isEditable(): Promise<boolean> {
        let status: boolean = false;
        await test.step(`Checking if ${this.description} is editable`, async () => {
            const element = this.getLocator();
            await element.waitFor({timeout: GenericConstants.DEFAULT_TIMEOUT});
            status = await element.isEditable({timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return status;
    }

    @boxedStep
    public async isEnabled(): Promise<boolean> {
        let status = false;
        await test.step(`Checking if ${this.description} is enabled`, async () => {
            const element = this.getLocator();
            await element.waitFor({timeout: GenericConstants.DEFAULT_TIMEOUT});
            status = await element.isEnabled({timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return status;
    }

    @boxedStep
    public async isVisible(sec: number): Promise<boolean> {
        let visibility: boolean = false;
        await test.step(`Checking if ${this.description} is visible`, async () => {
            try {
                await this.getLocator().waitFor({timeout: sec * 1000});
                visibility = await this.getLocator().isVisible({timeout: GenericConstants.DEFAULT_TIMEOUT});
            } catch (error) {
                visibility = false;
            }
        });
        return visibility;
    }

    @boxedStep
    public async keyPress(key: string) {
        await test.step(`Pressing ${this.description}`, async () => {
            await this.getLocator().press(key, {timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
    }

    @boxedStep
    public async getAllTextContent(): Promise<string[]> {
        let content: string[] = [];
        await test.step(`Getting all the text content of ${this.description}`, async () => {
            const element = this.getLocators();
            await element.first().waitFor({timeout: GenericConstants.DEFAULT_TIMEOUT});
            content = await element.allTextContents();
            content = content.map(c => c.trim());
        });
        return content;
    }

    @boxedStep
    public async getCount(): Promise<number> {
        let count: number = 0;
        await test.step(`Getting the count of ${this.description}`, async () => {
            count = await this.getLocators().count();
        });
        return count;
    }

    @boxedStep
    public async mouseClick() {
        await test.step(`Clicking on ${this.description}`, async () => {
            await this.getLocator().scrollIntoViewIfNeeded();
            const box = await this.getLocator().boundingBox();
            if (box) {
                await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
            }
        });
        return this;
    }

    @boxedStep
    public async jsClick() {
        await test.step(`Clicking on ${this.description}`, async () => {
            const ele = this.getLocator();
            await ele.waitFor();
            await ele.evaluate((node: HTMLElement) => {
                node.click();
            });
        });
        return this;
    }

    @boxedStep
    public async selectFromDropdown(value: string) {
        await test.step(`Enter and Select from dropdown: ${this.description}`, async () => {
            await this.getLocator().click();
            await this.page.getByRole('searchbox', {name: 'Select box'}).fill(value, {timeout: GenericConstants.DEFAULT_TIMEOUT});
            await this.page.getByTitle(value, {exact: true}).first().click({timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return this;
    }

    @boxedStep
    public async selectFromDropdownValue(value: string) {
        await test.step(`Enter and Select from dropdown: ${this.description}`, async () => {
            await this.getLocator().click();
            await this.page.getByRole('searchbox', {name: 'Select box'}).fill(value, {timeout: GenericConstants.DEFAULT_TIMEOUT});
            await this.page.getByTitle(value).first().click({timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return this;
    }

    @boxedStep
    public async selectFromDropdownOptions(value: string) {
        await test.step(`Enter and Select from dropdown: ${this.description}`, async () => {
            await this.getLocator().click();
            await this.page.getByRole('option', {name: value}).first().click({timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return this;
    }

    @boxedStep
    public async selectFromDropdownOptionsByIndex(index: number) {
        await test.step(`Enter and Select from dropdown: ${this.description}`, async () => {
            await this.getLocator().click();
            await this.page.getByRole('option').nth(index).click({timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return this;
    }

    @boxedStep
    public async selectOption(value: string) {
        await test.step(`Selecting value ${value} from ${this.description} combobox`, async () => {
            await this.getLocator().selectOption(value);
        });
        return this;
    }

    @boxedStep
    public async uploadFile(fileName: string, usePath?: boolean) {
        await test.step(`Upload the file: ${this.description}`, async () => {
            const fileChooserPromise = this.page.waitForEvent('filechooser');
            await this.page.waitForTimeout(2000);
            await this.getLocator().click({timeout: GenericConstants.DEFAULT_TIMEOUT});
            const fileChooser = await fileChooserPromise;
            usePath ? await fileChooser.setFiles(fileName) : await fileChooser.setFiles(GenericConstants.UPLOAD_PATH + fileName, {timeout: GenericConstants.DEFAULT_TIMEOUT});
        });
        return this;
    }

    @boxedStep
    public async clickAndWaitForNewTabHR(): Promise<Page> {
        let newPage: Page = null as any;
        await test.step(`Clicking on ${this.description} and waiting for popup`, async () => {
            [newPage] = await Promise.all([
                this.page.waitForEvent('popup'),
                this.click()
            ]);
            await newPage.waitForLoadState();
        });
        return newPage;
    }

    @boxedStep
    public async clickAndWaitForAllXHRRequests() {
        await test.step(`Clicked on ${this.description} and waiting for all XHR requests to finish`, async () => {
            await this.getLocator().click({timeout: GenericConstants.DEFAULT_TIMEOUT});
            await this.page.waitForResponse(response => response.request().resourceType() === 'xhr', {timeout: GenericConstants.NETWORKS_CALLS_TIMEOUT});
        });
    }
}