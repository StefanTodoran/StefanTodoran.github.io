import fse from "fs-extra";
import path from "path";
function getAllFiles(directory, recursive) {
    const files = fse.readdirSync(directory);
    const results = [];
    for (const file of files) {
        const filePath = path.join(directory.toString(), file);
        const fileStat = fse.statSync(filePath);
        if (recursive && fileStat.isDirectory()) {
            const sub = getAllFiles(filePath);
            results.push(...sub);
        }
        else if (fileStat.isFile()) {
            results.push(filePath);
        }
    }
    return results;
}
function calcSizeOfFiles(fileList) {
    let totalSize = 0;
    for (const filePath of fileList) {
        let stats;
        try {
            stats = fse.statSync(filePath);
        }
        catch (error) {
            console.log("(error) \x1b[91mfailed while calculating size:\x1b[0m\n" + error.message);
            throw new Error("FAILED");
        }
        totalSize += stats.size;
    }
    return totalSize;
}
function calcDirectorySize(directory) {
    const files = getAllFiles(directory, true);
    return calcSizeOfFiles(files);
}
async function main() {
    let src = "./dist/";
    let dest = "./docs/";
    if (process.cwd().includes("deployment")) {
        src = "." + src;
        dest = "." + dest;
    }
    const prevBuldSize = calcDirectorySize(dest) / 1000;
    console.log(`(setup) clearing ${dest} folder and contents`);
    fse.rmSync(dest, { recursive: true, force: true });
    console.log(`(setup) creating empty ${dest} folder`);
    fse.mkdirSync(dest);
    console.log(`(setup) creating CNAME and .nojekyll files in ${dest}`);
    fse.writeFile(dest + "CNAME", "todoran.dev");
    console.log(`(copy) copying ${src} folder and contents`);
    fse.copySync(src, dest, { overwrite: true, errorOnExist: true });
    console.log(`(result) \x1b[92mcopied all files successfully\x1b[0m\n`);
    const newBuildSize = calcDirectorySize(dest) / 1000;
    console.log(`(result) previous build size: \x1b[93m${prevBuldSize}\x1b[0m kb`);
    console.log(`(result) new build size: \x1b[93m${newBuildSize}\x1b[0m kb`);
    const change = Math.round((1 - (newBuildSize / prevBuldSize)) * 100);
    if (change == 0) {
        console.log(`(result) new build has \x1b[92midentical size\x1b[0m\n`);
    }
    else if (change > 0) {
        console.log(`(result) build shrunk by \x1b[92m${change}%\x1b[0m\n`);
    }
    else {
        console.log(`(result) new build is larger by \x1b[91m${change}%\x1b[0m\n`);
    }
}
console.log("STARTING PORTFOLIO SITE DEPLOYMENT ...\n");
main();
