import { base } from "$app/paths"
export const app = {
	name: 'CU Openhouse 2025 Dashboard',
	slugName: 'cuopenhouse25',
	description: "แดชบอร์ดแสดงข้อมูลสำหรับงาน CU Openhouse 2025",
	image: `${base}/og-image.png`,
	url: "https://isd-sgcu.github.io/oph-68-refined/",
	apiBaseUrl: 'https://api.cuopenhouse2025.com/api/',
	titleTemplate: (title: string) => `${title} | ${app.name}`
};

export const LOCALE = 'th-TH';
export const SHOW_MOCK_DATA = false;
export const REFETCH_INTERVAL = 1000 * 60 * 2; // 2 minutes
