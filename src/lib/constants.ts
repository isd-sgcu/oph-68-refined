export const app = {
	name: 'CU Openhouse 2025',
	slugName: 'cuopenhouse25',
	description: "A project to refine the CU Openhouse 2025 project's data",
	apiBaseUrl: 'https://api.cuopenhouse2025.com/api/' ?? 'http://localhost:3000',
	titleTemplate: (title: string) => `${title} | ${app.name}`
};

export const LOCALE = 'th-TH';
export const SHOW_MOCK_DATA = false;
export const REFETCH_INTERVAL = 1000 * 60 * 2; // 2 minutes
