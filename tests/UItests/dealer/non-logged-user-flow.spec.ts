import { testUI } from "../../../src/lib/ui/ui.fixture";

testUI.describe("Non-logged user views AS24 home page", () => {

    testUI.beforeEach(async ({ homePage }) => {
        await homePage.launchApplication();
    });

    testUI("Verify that a user can successfully log in with valid credentials @Dealer @AS", async (
        {homePage, searchResultPage, productDetailPage, messageLeadPage }) => {
        await homePage.verifyHomePage();
        await homePage.sellerSearch();

        await searchResultPage.verifySearchResultPage();
        await searchResultPage.openFirstListing();

        await productDetailPage.verifyDetailPage();
        await productDetailPage.openMessageLead();

        await messageLeadPage.verifyMessageLead();
        await messageLeadPage.clickBack();
        await productDetailPage.verifyDetailPage();
    });
});