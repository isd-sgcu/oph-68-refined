import type { Faculty, KnownSource, User } from '$lib/types';

export const interestedFaculties: Faculty[] = [
	{
		faculty: 'คณะนิเทศศาสตร์',
		first_interest: 7736,
		second_interest: 6722,
		third_interest: 7172
	},
	{ faculty: 'คณะแพทยศาสตร์', first_interest: 9398, second_interest: 5738, third_interest: 3835 },
	{ faculty: 'คณะเภสัชศาสตร์', first_interest: 5829, second_interest: 6130, third_interest: 5206 },
	{
		faculty: 'คณะวิศวกรรมศาสตร์',
		first_interest: 7702,
		second_interest: 4390,
		third_interest: 4515
	},
	{ faculty: 'คณะอักษรศาสตร์', first_interest: 6648, second_interest: 4783, third_interest: 4609 },
	{
		faculty: 'คณะทันตแพทยศาสตร์',
		first_interest: 5443,
		second_interest: 5521,
		third_interest: 3717
	},
	{ faculty: 'คณะจิตวิทยา', first_interest: 2689, second_interest: 4946, third_interest: 5973 },
	{
		faculty: 'คณะพาณิชยศาสตร์และการบัญชี',
		first_interest: 5233,
		second_interest: 4075,
		third_interest: 4027
	},
	{ faculty: 'คณะนิติศาสตร์', first_interest: 2896, second_interest: 3553, third_interest: 3963 },
	{
		faculty: 'คณะศิลปกรรมศาสตร์',
		first_interest: 2079,
		second_interest: 3782,
		third_interest: 3531
	},
	{ faculty: 'คณะวิทยาศาสตร์', first_interest: 1367, second_interest: 3334, third_interest: 3876 },
	{ faculty: 'คณะสหเวชศาสตร์', first_interest: 3213, second_interest: 2851, third_interest: 2379 },
	{
		faculty: 'คณะสถาปัตยกรรมศาสตร์',
		first_interest: 2364,
		second_interest: 2718,
		third_interest: 3043
	},
	{ faculty: 'คณะครุศาสตร์', first_interest: 2680, second_interest: 2297, third_interest: 2467 },
	{ faculty: 'คณะรัฐศาสตร์', first_interest: 1615, second_interest: 2720, third_interest: 2709 },
	{
		faculty: 'คณะสัตวแพทยศาสตร์',
		first_interest: 1923,
		second_interest: 2134,
		third_interest: 2668
	},
	{ faculty: 'คณะพยาบาลศาสตร์', first_interest: 1638, second_interest: 1744, third_interest: 1711 },
	{ faculty: 'คณะเศรษฐศาสตร์', first_interest: 667, second_interest: 1711, third_interest: 1911 },
	{
		faculty: 'คณะวิทยาศาสตร์การกีฬา',
		first_interest: 773,
		second_interest: 1215,
		third_interest: 1507
	},
	{
		faculty: 'สถาบันบัณฑิตบริหารธุรกิจศศินทร์แห่งจุฬาลงกรณ์มหาวิทยาลัย',
		first_interest: 434,
		second_interest: 482,
		third_interest: 446
	},
	{ faculty: 'สถาบันภาษาจุฬาฯ', first_interest: 71, second_interest: 304, third_interest: 496 },
	{
		faculty: 'วิทยาลัยปิโตรเลียมและปิโตรเคมี',
		first_interest: 54,
		second_interest: 351,
		third_interest: 459
	},
	{ faculty: 'สถาบันการขนส่ง', first_interest: 97, second_interest: 219, third_interest: 372 },
	{
		faculty: 'สถาบันขงจื่อแห่งจุฬาลงกรณ์มหาวิทยาลัย',
		first_interest: 72,
		second_interest: 220,
		third_interest: 255
	},
	{
		faculty: 'สถาบันวิจัยสิ่งแวดล้อมเพื่อความยั่งยืน',
		first_interest: 55,
		second_interest: 117,
		third_interest: 315
	},
	{
		faculty: 'สถาบันนวัตกรรมบูรณาการแห่งจุฬาลงกรณ์มหาวิทยาลัย',
		first_interest: 94,
		second_interest: 141,
		third_interest: 211
	},
	{
		faculty: 'สถาบันวิจัยเทคโนโลยีชีวภาพและวิศวกรรมพันธุศาสตร์',
		first_interest: 52,
		second_interest: 139,
		third_interest: 244
	},
	{
		faculty: 'วิทยาลัยวิทยาศาสตร์สาธารณสุข',
		first_interest: 50,
		second_interest: 142,
		third_interest: 228
	},
	{
		faculty: 'สถาบันวิจัยทรัพยากรทางน้ำ',
		first_interest: 38,
		second_interest: 124,
		third_interest: 216
	},
	{
		faculty: 'สำนักวิชาทรัพยากรการเกษตร',
		first_interest: 59,
		second_interest: 101,
		third_interest: 189
	},
	{ faculty: 'สถาบันวิจัยสังคม', first_interest: 18, second_interest: 60, third_interest: 200 },
	{ faculty: 'สถาบันวิจัยพลังงาน', first_interest: 12, second_interest: 88, third_interest: 168 },
	{ faculty: 'สถาบันเอเชียศึกษา', first_interest: 12, second_interest: 72, third_interest: 159 },
	{
		faculty: 'สถาบันวิจัยโลหะและวัสดุ',
		first_interest: 14,
		second_interest: 56,
		third_interest: 99
	},
	{ faculty: 'สถาบันไทยศึกษา', first_interest: 10, second_interest: 23, third_interest: 51 },
	{ faculty: 'บัณฑิตวิทยาลัย', first_interest: 5, second_interest: 13, third_interest: 41 },
	{
		faculty: 'สถาบันทรัพย์สินทางปัญญาแห่งจุฬาลงกรณ์มหาวิทยาลัย',
		first_interest: 4,
		second_interest: 19,
		third_interest: 32
	},
	{
		faculty: 'สถาบันภาษาไทยสิรินธรแห่งจุฬาลงกรณ์มหาวิทยาลัย',
		first_interest: 1,
		second_interest: 10,
		third_interest: 27
	},
	{ faculty: 'วิทยาลัยประชากรศาสตร์', first_interest: 2, second_interest: 2, third_interest: 20 }
];

export const mediaSources: KnownSource[] = [
	{
		source: 'Instagram (cu.openhouse)',
		count: 56375
	},
	{
		source: 'Facebook (OpenHouseCU)',
		count: 25834
	},
	{
		source: 'Other',
		count: 10876
	},
	{
		source: 'Dek-D.com',
		count: 5628
	},
	{
		source: 'Camphub.com',
		count: 5520
	}
];
