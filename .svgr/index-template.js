// @ts-check

const path = require('path');

/** @type {import('./svgr.types').SvgrIndexTemplate} */
const svgrIndexTemplate = (filePaths) => {

	const icons = [];
	for (const filePath of filePaths) {
		const fileName = path.basename(filePath, path.extname(filePath));
		const componentName = `${fileName.replace('.icon', '')}Icon`;
		icons.push({ fileName, componentName, });
	}
	const imports = icons.map(icon => `import ${icon.componentName} from './${icon.fileName}';`).join('\n');
	const iconObject = `const icons: Record<string, (props: React.SVGProps<SVGSVGElement>) => JSX.Element> = {\n${icons.map(icon => `${icon.componentName.replace('Icon', '')}: ${icon.componentName},`).join('')}\n};`;
	const defaultExport = `export default icons;`;
	const exports = `export {\n${icons.map(icon => icon.componentName).join(',\n')}\n};`;

	return [
		imports,
		iconObject,
		defaultExport,
		exports,
	].join('\n\n');

};

module.exports = svgrIndexTemplate;