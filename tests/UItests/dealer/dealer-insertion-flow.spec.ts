import { testUI } from "../../../src/lib/ui/ui.fixture";

testUI.describe("Dealer Insert Vehicle", () => {

    testUI.beforeEach(async ({ homePage }) => {
        await homePage.launchApplication();
    });

    testUI("Verify Insertion Flow @Dealer @AS", async (
        {loginPage, insertionPage, productDetailPage }) => {
        await loginPage.login();
        await insertionPage.insertVehicle();
        await productDetailPage.verifyListingPreview();
    });
});