import type { Locator, Page } from '@playwright/test';
import UIElementActions from './uiElementActions';
import GenericConstants from '../../resources/consts/consts.generic';
import { test } from '../generic/fixtures';
import { boxedStep } from '../generic/boxedStep';

export class UIClient {
  private elementAction: UIElementActions;

  constructor(private page: Page) {
    this.elementAction = new UIElementActions(page);
  }

  public getPage(): Page {
    return this.page;
  }

  public setPage(page: Page) {
    this.page = page;
    this.elementAction = new UIElementActions(page);
  }

  public closePage() {
    this.page.close();
  }

  public element(selectorOrLocator: string | Locator, description: string) {
    return typeof selectorOrLocator === 'string'
      ? this.elementAction.setElement(selectorOrLocator, description)
      : this.elementAction.setLocator(selectorOrLocator, description);
  }

  public getByRole(role: any, text: string) {
    return this.elementAction.setLocator(this.page.getByRole(role, { name: text }), `${role} with text ${text}`);
  }

  public getByRoleContainsText(role: any, text: string) {
    return this.elementAction.setLocator(this.page.getByRole(role, {}), `${role} with text ${text}`);
  }

  public getByText(text: string) {
    return this.elementAction.setLocator(this.page.getByText(text, { exact: true }), `text ${text}`);
  }

  @boxedStep
  public async goto(URL: string, description: string) {
    await test.step(`Navigate to ${description}`, async () => {
      await this.page.goto(URL);
    });
  }

  @boxedStep
  public async goBack(description: string) {
    await test.step(`Go to the previous ${description}`, async () => {
      await this.page.goBack();
    });
  }

  @boxedStep
  public async goForward(description: string) {
    await test.step(`Go to the next ${description}`, async () => {
      await this.page.goForward();
    });
  }

  @boxedStep
  public async pageRefresh() {
    await test.step(`Page Refresh`, async () => {
      await this.page.reload();
    });
  }

  @boxedStep
  public async keyPress(key: string, description: string) {
    await test.step(`Pressing ${description}`, async () => {
      await this.page.keyboard.press(key);
    });
  }

  @boxedStep
  public async waitForNavigation(url: string | RegExp | ((url: URL) => boolean)) {
    await test.step(`Waiting for navigation`, async () => {
      await this.page.waitForURL(url, { timeout: GenericConstants.DEFAULT_TIMEOUT });
    });
  }

  @boxedStep
  public async clickAndWaitForAllXHRRequests(locator: Locator, description: string) {
    await this.elementAction.setLocator(locator, description).click();
    await this.page.waitForResponse(response => response.request().resourceType() === 'xhr', { timeout: GenericConstants.NETWORKS_CALLS_TIMEOUT });
  }

  @boxedStep
  public async click(locator: Locator, description: string) {
    await this.elementAction.setLocator(locator, description).click();
  }

  @boxedStep
  public async waitForLoadState() {
    await test.step(`Waiting for load event`, async () => {
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForLoadState();
      await this.waitForDomContentLoaded()
      try {
        await this.page.waitForSelector('.image-group', { state: 'hidden', timeout: 10000 });
      } catch {
        await this.page.waitForSelector('.image-group', { state: 'detached', timeout: 10000 });
      }
    });
  }

  @boxedStep
  public async waitForDomContentLoaded() {
    await test.step(`Waiting for load event`, async () => {
      await this.page.waitForLoadState("domcontentloaded", { timeout: 10000 });
    });
  }

  @boxedStep
  public async switchToNewWindow(selector: string, description: string): Promise<Page> {
    let [newPage] = [this.page];
    await test.step(`Opening ${description} Window`, async () => {
      [newPage] = await Promise.all([
        this.page.context().waitForEvent("page"),
        await this.elementAction.setElement(selector, description).click(),
      ]);
      await newPage.waitForLoadState("domcontentloaded");
    });
    return newPage;
  }

  private async handleAlert(selector: string, description: string, message: Promise<string>) {
    await this.elementAction.setElement(selector, description).click();
    return message;
  }

  @boxedStep
  public async downloadFile(selector: Locator, description: string) {
    await test.step(`Downloading ${description} file`, async () => {
      const [download] = await Promise.all([
        this.page.waitForEvent('download'),
        await this.elementAction.setLocator(selector, description).click(),
      ]);
    });
  }

  @boxedStep
  public async pauseInSecs(sec: number) {
    return new Promise(resolve => setTimeout(resolve, sec * GenericConstants.ONE_THOUSAND));
  }

  @boxedStep
  public async waitForLoadingImage() {
    await test.step("Waiting for Loading Image to disappear", async () => {
      try {
        await this.page.locator(GenericConstants.LOADING_IMAGE).waitFor({ state: "visible", timeout: GenericConstants.ONE_THOUSAND * 3 });
      } catch (error) {}
      await this.page.locator(GenericConstants.LOADING_IMAGE).waitFor({ state: "hidden" });
      await this.pauseInSecs(0.5);
    });
  }

  @boxedStep
  public async clickAndSwitchWindow(role: string, text: string): Promise<Page> {
    return await test.step(`Clicking on ${text} and switching to new window`, async () => {
      const newPagePromise = this.page.waitForEvent('popup', { timeout: 30000 });
      await this.click(this.getByRole(role, text).getLocator(), text);
      return await newPagePromise;
    });
  }

  @boxedStep
  public async clickAndSwitchWindowByLocator(locator: Locator, description: string): Promise<Page> {
    return await test.step(`Clicking on ${description} and switching to new window`, async () => {
      const newPagePromise = this.page.waitForEvent('popup', { timeout: 30000 });
      await this.element(locator, description).click();
      return await newPagePromise;
    });
  }

  @boxedStep
  public async downloadFileAndSave(locator: Locator, description: string, fileName: string) {
    await test.step(`Downloading ${description} file`, async () => {
      const downloadPromise = this.page.waitForEvent('download');
      await this.elementAction.setLocator(locator, description).click();
      const download = await downloadPromise;
      fileName = fileName === '' ? download.suggestedFilename() : fileName;
      await download.saveAs(GenericConstants.DOWNLOAD_PATH + fileName);
    });
  }

  @boxedStep
  public async closeTabsAndSwitchBack(pages: Page[], originalIndex: number = 0) {
    const tabsToClose = pages.length - originalIndex - 1;
    for (let i = tabsToClose; i > 0; i--) {
      const pageToClose = pages.pop();
      if (pageToClose) await pageToClose.close();
    }
    const originalPage = pages[originalIndex];
    await originalPage.bringToFront();
    return originalPage;
  }

  @boxedStep
  public async selectFromDivDropdown(value: string) {
    await test.step(`Select from dropdown: ${value}`, async () => {
      await this.page.locator('div[role="option"]').filter({ has: this.page.getByText(value, { exact: true }) }).click({ timeout: GenericConstants.DEFAULT_TIMEOUT });
    });
    return this;
  }
}