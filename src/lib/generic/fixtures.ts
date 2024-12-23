import {test as baseTest, APIResponse, expect} from '@playwright/test';
import {APIClient} from "../api/apiClient";
import {UIClient} from "../ui/uiClient";

const USER_EMAIL = process.env.AUTO_CONTRACT_TYPE_USER_EMAIL || '';
const USER_PWD = process.env.AUTO_CONTRACT_TYPE_USER_PASSWORD || '';
const API_BASE_URL = process.env.API_BASE_URL || '';
const RANDOM = (length: number) =>
    Array.from({ length }, () =>
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
            Math.floor(Math.random() * 62)
        )
    ).join('');

export const test = baseTest.extend<{
    apiClient: APIClient;
    uiClient: UIClient;
    token: string;
    titleName: string;
    contractTypeName: string;
    contractNameVer1: string;
    contractNameVer2: string;
}>({
    token: async ({ request }, use) => {
        console.log('Getting token...');
        const response = await request.post(`${API_BASE_URL}/general/user/id_login`, {
            data: { identifier: USER_EMAIL, password: USER_PWD, includeTokens: true },
        });
        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        await use(`Bearer ${data.result.RefreshAuthorization}`);
    },
    apiClient: async ({ token }, use) => {
        const baseUrl = API_BASE_URL;
        const headers = {
            Authorization: token, // Use the token fixture
            'Content-Type': 'application/json',
        };
        const apiClient = new APIClient(baseUrl, headers);
        await use(apiClient);
    },
    uiClient: async ({page}, use) => {
        await use(new UIClient(page));
    }
});

export {APIResponse, expect};