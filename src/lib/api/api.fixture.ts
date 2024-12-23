import { test as baseTest } from "../generic/fixtures";
import GenericAPIs from "../../actions/apiActions/genericAPIs";
import SampleAPIs from '../../actions/apiActions/sampleAPIs';
import { APIRequestContext } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const BASE_URL = process.env.BASE_URL || '';
const API_BASE_URL = process.env.API_BASE_URL || '';
const ORGANIZATION_ID = process.env.ORGANIZATION_ID || '';
const AUTHORIZATION = `Bearer ${process.env.AUTHORIZATION_TOKEN || ''}`;

export const testAPI = baseTest.extend<{
    genericAPIs: GenericAPIs;
    contractV2APIs: SampleAPIs;
    generateSampleObject: () => Promise<string>;
}>({
    genericAPIs: async ({}: {}, use) => {
        await use(new GenericAPIs());
    },
    contractV2APIs: async ({}: {}, use) => {
        await use(new SampleAPIs());
    },
    generateSampleObject: async ({ request, token }: { request: APIRequestContext; token: string }, use) => {
        const generateTitle = async (): Promise<string> => {
            const response = await request.post(`${API_BASE_URL}/creator/publishable/create`, {
                headers: {
                    accept: 'application/json, text/plain, */*',
                    authorization: token, // Use the token from the fixture
                    'content-type': 'application/json',
                    origin: BASE_URL,
                    'x-molten-organization': ORGANIZATION_ID
                },
                data: {
                    title: `[Auto] Title ${Math.random().toString(36).substring(2, 10)}`,
                    hierarchyTree: ['Film']
                }
            });

            if (!response.ok()) {
                throw new Error(`Failed to generate title. Status: ${response.status()}`);
            }

            const result = await response.json();
            return result?.result?.title || '[Auto] Title Fallback';
        };

        await use(generateTitle);
    }
});