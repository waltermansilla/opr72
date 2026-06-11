import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const previewDir = path.join(
  root,
  "public/videos-oficial/terminales-videos/previews-videos",
);
const imgDir = path.join(root, "public/images-oficial");

const MAX_EDGE = 720;
const JPEG_QUALITY = 68;

/** @type {{ in: string; out: string; dir: string; remove?: string[] }[]} */
const jobs = [
  {
    in: "puerto-bsas.jpg",
    out: "puerto-bsas.jpg",
    dir: previewDir,
  },
  {
    in: "calamar.jpg",
    out: "calamar.jpg",
    dir: previewDir,
  },
  {
    in: "apm.png.webp",
    out: "apm.jpg",
    dir: previewDir,
    remove: ["apm.png.webp"],
  },
  {
    in: "galeria-3.jpeg",
    out: "rio-turbio.jpg",
    dir: previewDir,
    sourceDir: imgDir,
  },
];

function compress(input, output) {
  execFileSync(
    "sips",
    [
      "-Z",
      String(MAX_EDGE),
      "-s",
      "format",
      "jpeg",
      "-s",
      "formatOptions",
      String(JPEG_QUALITY),
      input,
      "--out",
      output,
    ],
    { stdio: "inherit" },
  );
}

fs.mkdirSync(previewDir, { recursive: true });

for (const job of jobs) {
  const sourceDir = job.sourceDir ?? job.dir;
  const input = path.join(sourceDir, job.in);
  const output = path.join(job.dir, job.out);

  if (!fs.existsSync(input)) {
    console.warn(`Skip (missing): ${job.in}`);
    continue;
  }

  const before = fs.statSync(input).size;
  const tmp = `${output}.tmp.jpg`;
  compress(input, tmp);
  fs.renameSync(tmp, output);
  const after = fs.statSync(output).size;

  console.log(
    `\n→ ${job.in} → ${path.basename(job.dir)}/${job.out}\n  ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB`,
  );

  for (const file of job.remove ?? []) {
    const toRemove = path.join(job.dir, file);
    if (fs.existsSync(toRemove) && toRemove !== output) {
      fs.unlinkSync(toRemove);
      console.log(`  removed ${file}`);
    }
  }
}

console.log("\nDone.");
