export type Translation = {
    key: string;
    description?: string;
    translations: Record<string, string>;
}

export type UpsertTranslation = {
    projectId: number;
    translations: Translation[];
}