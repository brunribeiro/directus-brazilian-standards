import { execa } from 'execa';
export default async function getPackageVersion(name, tag = 'latest') {
    const npmView = await execa('npm', ['view', name, '--json']);
    const packageInfo = JSON.parse(npmView.stdout);
    return packageInfo['dist-tags'][tag];
}
