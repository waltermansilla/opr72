import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const srcDir = path.join(root, "public/videos-oficial");
const outDir = path.join(srcDir, "terminales-videos");
const ffmpeg = ffmpegInstaller.path;

const jobs = [
  {
    in: "rio-turbio.mp4",
    out: "rio-turbio.mp4",
    vf: "scale='min(720,iw)':-2",
    crf: 28,
    audio: "128k",
  },
  {
    in: "Puerto Buenos Aires, el puerto de todos.mp4",
    out: "puerto-buenos-aires.mp4",
    vf: "scale='min(960,iw)':-2",
    crf: 32,
    audio: "96k",
  },
  {
    in: "el-calamar-pesca-sustentable-de-uno-de-nuestros-recursos-marinos-mas-importantes-pescadecalamarenmarargentino.mp4",
    out: "pesca-calamar.mp4",
    vf: "scale='min(854,iw)':-2",
    crf: 33,
    audio: "96k",
  },
  {
    in: "video-apm.mp4",
    out: "video-apm.mp4",
    vf: "scale='min(1280,iw)':-2",
    crf: 28,
    audio: "128k",
  },
];

fs.mkdirSync(outDir, { recursive: true });

for (const job of jobs) {
  const input = path.join(srcDir, job.in);
  const output = path.join(outDir, job.out);

  if (!fs.existsSync(input)) {
    console.warn(`Skip (missing): ${job.in}`);
    continue;
  }

  const before = fs.statSync(input).size;
  console.log(`\n→ ${job.in} → terminales-videos/${job.out}`);

  execFileSync(
    ffmpeg,
    [
      "-y",
      "-i",
      input,
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      String(job.crf ?? 28),
      "-vf",
      job.vf,
      "-movflags",
      "+faststart",
      "-c:a",
      "aac",
      "-b:a",
      job.audio ?? "128k",
      output,
    ],
    { stdio: "inherit" },
  );

  const after = fs.statSync(output).size;
  console.log(
    `  ${(before / 1024 / 1024).toFixed(1)} MB → ${(after / 1024 / 1024).toFixed(1)} MB`,
  );
}

console.log("\nDone.");
