export type LayoutProps = {
    children: React.ReactNode;
    domain: string;
}

export async function loadLayout(template: string) {
    // Ensure the template path is valid and exists in your project structure
    if (!template) {
        throw new Error("Template name is required to load layout.");
    }

    // TypeScript cannot verify the structure of dynamically imported modules.
    // The shape of the imported module is enforced at runtime, so we use `as any` here.
    let mod: any;
    try {
        mod = await import(`@/templates/${template}/layout`);
    } catch (e) {
        mod = await import(`@/templates/default/layout`);
    }
    return mod.Layout as React.ComponentType<LayoutProps>;
}