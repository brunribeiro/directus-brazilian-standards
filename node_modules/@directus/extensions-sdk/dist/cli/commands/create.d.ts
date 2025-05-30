type CreateOptions = {
    language?: string;
    install?: boolean;
};
export default function create(type: string, name: string, options: CreateOptions): Promise<void>;
export {};
