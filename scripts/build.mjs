import fs from "fs";
import path from "path";

const root = process.cwd();
const distPath = root + "/dist";
const version = Math.floor(Date.now() / 1000);
/**
 * @type {{ folder: string; files: { name: string; src: string, isFolder?: boolean }[] }[]}
 */
const build = [
	{
		folder: distPath + "/styles",
		files: [
			{ name: "web.min.css", src: root + "/styles" },
			{ name: "custom.bootstrap.min.css", src: root + "/styles" },
			{ name: "animate.min.css", src: root + "/styles/libs" },
		],
	},
	{
		folder: distPath + "/js",
		files: [
			{ name: "index.js", src: root + "/js" },
			{ name: "bootstrap.min.js", src: root + "/js" },
		],
	},
	{
		folder: distPath + "/fonts",
		files: [
			{ name: "Athelas", src: root + "/fonts", isFolder: true },
			{ name: "Bebas_Neue", src: root + "/fonts", isFolder: true },
		],
	},
	{
		folder: distPath + "/images",
		files: [{ name: "", src: root + "/images", isFolder: true }],
	},
	{
		folder: distPath + "/svgs",
		files: [{ name: "", src: root + "/svgs", isFolder: true }],
	},
	{
		folder: null,
		files: [{ name: "", src: root + "/public", isFolder: true }],
	},
];

if (!fs) {
	throw new Error("fs not exist in this context");
}

fs.rmSync(distPath, {
	recursive: true,
	force: true,
});

fs.mkdirSync(distPath, {
	recursive: true,
});

build.forEach((d) => {
	fs.mkdirSync(d.folder ?? distPath, { recursive: true });
	d.files.forEach((f) => {
		if (f.isFolder) {
			fs.cpSync(f.src, d.folder ?? distPath, { recursive: true });
		} else {
			fs.copyFileSync(path.join(f.src, f.name), path.join(d.folder ?? distPath, f.name));
		}
	});
});

const htmlFile = root + "/index.html";

let content = fs.readFileSync(htmlFile, { encoding: "utf-8" });

content = content.replaceAll("public/", "/").replace(/(href|src)="([^"]+\.(?:css|js))"/g, (_, attr, url) => {
	if (url.startsWith("http")) {
		return `${attr}="${url}"`;
	}

	return `${attr}="${url}?v=${version}"`;
});

fs.writeFileSync(distPath + "/index.html", content);
