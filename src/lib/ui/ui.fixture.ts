import {testAPI as baseTest} from '../api/api.fixture';
import HomePage from "../../actions/pageObjects/homePage";
import SearchResultPage from "../../actions/pageObjects/searchResultPage";
import ProductDetailPage from "../../actions/pageObjects/productDetailPage";
import MessageLeadPage from "../../actions/pageObjects/messageLeadPage";
import LoginPage from "../../actions/pageObjects/loginPage";
import InsertionPage from "../../actions/pageObjects/insertionPage";

export const testUI = baseTest.extend<{
    homePage: HomePage;
    searchResultPage: SearchResultPage;
    productDetailPage: ProductDetailPage;
    messageLeadPage: MessageLeadPage;
    loginPage: LoginPage;
    insertionPage: InsertionPage;
}>({
    homePage: async ({page}, use) => {
        await use(new HomePage(page));
    },
    searchResultPage: async ({page}, use) => {
        await use(new SearchResultPage(page));
    },
    productDetailPage: async ({page}, use) => {
        await use(new ProductDetailPage(page));
    },
    messageLeadPage: async ({page}, use) => {
        await use(new MessageLeadPage(page));
    },
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    insertionPage: async ({page}, use) => {
        await use(new InsertionPage(page));
    },
});