import { type Ora } from 'ora';
import type { Report } from '../../types.js';
declare const checkReadMe: {
    name: string;
    handler: (spinner: Ora, reports: Array<Report>) => Promise<string>;
};
export default checkReadMe;
