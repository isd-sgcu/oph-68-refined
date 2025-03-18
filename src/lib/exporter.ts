export function downloadAsCsv(data: T[], filename: string, renameDict: Record<string, string>) {
	const replacer = (key: string, value: any) => (value === null ? '' : value);
	const header = Object.keys(data[0]).map((key) => renameDict[key] || key);
	const csv = data.map((row) =>
		header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(',')
	);
	csv.unshift(header.join(','));
	const csvArray = csv.join('\r\n');
	const blob = new Blob([csvArray], { type: 'text/csv' });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `${filename}.csv`;
	a.click();
	window.URL.revokeObjectURL(url);
}
