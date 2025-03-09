import { env } from '$env/dynamic/public'

export const app = {
  name: "CU Openhouse 2025",
  description: "A project to refine the CU Openhouse 2025 project's data",
  apiBaseUrl: env.PUBLIC_API_BASE_URL ?? "http://localhost:3000",
  titleTemplate: (title: string) => `${title} | ${app.name}`,
}
