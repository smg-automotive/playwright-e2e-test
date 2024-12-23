import { APIClient } from "../../lib/api/apiClient";

export default class GenericAPIs {
    readonly api: APIClient;
    API_BASE_URL = process.env.API_BASE_URL || '';

    constructor() {
    }
}
