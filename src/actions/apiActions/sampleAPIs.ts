import { APIClient } from "../../lib/api/apiClient";

export default class SampleAPIs {
    readonly api: APIClient;
    API_BASE_URL = process.env.API_BASE_URL || '';

    constructor() {
    }

    async deleteContracts(request, authToken) {
        const BASE_URL = '';
        const AUTH_TOKEN = authToken;
        const headers = {
            accept: 'application/json, text/plain, */*',
            'authorization': AUTH_TOKEN,
            'content-type': 'application/json',
        };

        // Step 1: Fetch document IDs
        console.log('Fetching document IDs...');
        const fetchResponse = await request.post(`${this.API_BASE_URL}/v1/path...`, {
            headers,
            data: {
                query: {},
                select: null,
                expand: {},
            },
        });

        if (!fetchResponse.ok()) {
            console.error('Failed to fetch sample item:', fetchResponse.status());
            return;
        }

        const result = await fetchResponse.json();
        const documentIds = result?.documents?.map((doc: any) => doc.id) || [];

        if (documentIds.length === 0) {
            console.log('No documents found to delete.');
            return;
        }

        console.log(`Found ${documentIds.length} documents to delete.`);

        // Step 2: Delete documents
        for (const id of documentIds) {
            console.log(`Deleting document with ID: ${id}`);
            const deleteResponse = await request.delete(`${this.API_BASE_URL}/v1/sample/${id}`, { headers });

            if (deleteResponse.ok()) {
                console.log(`Successfully deleted document with ID: ${id}`);
            } else {
                console.error(`Failed to delete document with ID: ${id}. Status: ${deleteResponse.status()}`);
            }
        }
    }
}
