import {testAPI as baseTest} from '../api/api.fixture';
import LoginScreen from "../../actions/uiActions/loginPage";
import SamplePage from '../../actions/uiActions/samplePage'

export const testUI = baseTest.extend<{
    loginScreen: LoginScreen;
    samplePage: SamplePage;
}>({
    loginScreen: async ({page}, use) => {
        await use(new LoginScreen(page));
    },
    samplePage: async ({page}, use) => {
        await use(new SamplePage(page));
    }
});