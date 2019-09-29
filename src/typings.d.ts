declare module "*.ico" {
    const url: string;
    export default url;
}

declare module "just-kebab-case" {
    export default function (str: string): string;
}
