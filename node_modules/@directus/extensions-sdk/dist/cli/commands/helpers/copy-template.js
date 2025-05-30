import fse from 'fs-extra';
import path from 'path';
import getTemplatePath from '../../utils/get-template-path.js';
async function copyTemplateFile(templateFile, extensionPath, sourcePath) {
    if (sourcePath !== undefined) {
        const oldName = path.basename(templateFile.path);
        const newName = oldName.startsWith('_') ? `.${oldName.substring(1)}` : oldName;
        const targetPath = templateFile.type === 'config'
            ? path.join(extensionPath, newName)
            : path.resolve(extensionPath, sourcePath, newName);
        await fse.copy(templateFile.path, targetPath, { overwrite: false });
    }
}
async function getFilesInDir(templatePath) {
    if (!(await fse.pathExists(templatePath)))
        return [];
    const files = await fse.readdir(templatePath);
    return files.map((file) => path.join(templatePath, file));
}
async function getLanguageTemplateFiles(templateLanguagePath) {
    const [configFiles, sourceFiles] = await Promise.all([
        getFilesInDir(path.join(templateLanguagePath, 'config')),
        getFilesInDir(path.join(templateLanguagePath, 'source')),
    ]);
    const configTemplateFiles = configFiles.map((file) => ({ type: 'config', path: file }));
    const sourceTemplateFiles = sourceFiles.map((file) => ({ type: 'source', path: file }));
    return [...configTemplateFiles, ...sourceTemplateFiles];
}
async function getTypeTemplateFiles(templateTypePath, language) {
    const [commonTemplateFiles, languageTemplateFiles] = await Promise.all([
        getLanguageTemplateFiles(path.join(templateTypePath, 'common')),
        language ? getLanguageTemplateFiles(path.join(templateTypePath, language)) : null,
    ]);
    return [...commonTemplateFiles, ...(languageTemplateFiles ? languageTemplateFiles : [])];
}
async function getTemplateFiles(type, language) {
    const templatePath = getTemplatePath();
    const [commonTemplateFiles, typeTemplateFiles] = await Promise.all([
        getTypeTemplateFiles(path.join(templatePath, 'common'), language),
        getTypeTemplateFiles(path.join(templatePath, type), language),
    ]);
    return [...commonTemplateFiles, ...typeTemplateFiles];
}
export default async function copyTemplate(type, extensionPath, sourcePath, language) {
    const templateFiles = await getTemplateFiles(type, language);
    await Promise.all(templateFiles.map((templateFile) => copyTemplateFile(templateFile, extensionPath, sourcePath)));
}
