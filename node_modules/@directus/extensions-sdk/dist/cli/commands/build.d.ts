type BuildOptions = {
    type?: string;
    input?: string;
    output?: string;
    watch?: boolean;
    minify?: boolean;
    sourcemap?: boolean;
};
export default function build(options: BuildOptions): Promise<void>;
export {};
