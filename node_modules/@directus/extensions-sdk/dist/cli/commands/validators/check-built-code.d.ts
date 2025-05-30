import { type Ora } from 'ora';
import type { Report } from '../../types.js';
declare const checkBuiltCode: {
    name: string;
    handler: (spinner: Ora, reports: Array<Report>) => Promise<string>;
};
export default checkBuiltCode;
