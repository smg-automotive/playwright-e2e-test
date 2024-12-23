import { testUI } from "../../src/lib/ui/ui.fixture";

testUI.describe('Contract Type Scenarios', () => {
    testUI.slow()
    const USER_EMAIL = process.env.AUTO_CONTRACT_TYPE_USER_EMAIL || '';
    const USER_PWD = process.env.AUTO_CONTRACT_TYPE_USER_PASSWORD || '';

    testUI.beforeEach(async ({ loginScreen }) => {
        await loginScreen.launchApplication();
        await loginScreen.performLogin(USER_EMAIL, USER_PWD);
    });

    testUI('Contract Type creation', { tag: '@tag' }, async ({ samplePage, generateSampleObject }) => {
        const titleName = await generateSampleObject();
        console.log(`Generated Title Name: ${titleName}`);

        await samplePage.openContractApp();
    });
});