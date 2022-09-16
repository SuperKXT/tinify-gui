import z from 'zod';

export const configStoreSchema = z.strictObject({
	isDarkMode: z.boolean(),
});

export type ConfigStore = z.infer<typeof configStoreSchema>;