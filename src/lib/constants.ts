export const app = {
	name: 'CU Openhouse 2025 Dashboard',
	slugName: 'cuopenhouse25',
	description: "แดชบอร์ดแสดงข้อมูลสำหรับงาน CU Openhouse 2025",
	apiBaseUrl: 'https://api.cuopenhouse2025.com/api/',
	titleTemplate: (title: string) => `${title} | ${app.name}`
};

export const LOCALE = 'th-TH';
export const SHOW_MOCK_DATA = false;
export const REFETCH_INTERVAL = 1000 * 60 * 2; // 2 minutes
