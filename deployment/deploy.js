import fse from "fs-extra";
async function main() {
    let src = "./dist/";
    let dest = "./docs/";
    if (process.cwd().includes("deployment")) {
        src = "." + src;
        dest = "." + dest;
    }
    console.log(`(setup) clearing ${dest} folder and contents`);
    fse.rmSync(dest, { recursive: true, force: true });
    console.log(`(setup) creating empty ${dest} folder`);
    fse.mkdirSync(dest);
    console.log(`(setup) creating CNAME and .nojekyll files in ${dest}`);
    fse.writeFile(dest + "CNAME", "todoran.dev");
    console.log(`(copy) copying ${src} folder and contents`);
    fse.copySync(src, dest, { overwrite: true, errorOnExist: true });
    console.log(`(result) \x1b[92mcopied all files successfully\x1b[0m\n`);
}
console.log("STARTING PORTFOLIO SITE DEPLOYMENT ...\n");
main();
