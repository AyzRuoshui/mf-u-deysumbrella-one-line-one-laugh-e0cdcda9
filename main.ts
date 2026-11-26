import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const MAX_CODEPOINTS = 140;
const ENTRY_FILENAME = "entry.txt";
const DEFAULT_OUT_PATH = "/output/entry.txt";

const JOKE_LINE =
  "My dentist asked how often I floss, and I heard myself say 'seasonally.'";

function readFlagValue(argv: string[], index: number, flag: string): string {
  const value = argv[index + 1];
  if (value === undefined || value.length === 0) {
    throw new Error(`Missing value for ${flag}.`);
  }
  return value;
}

/**
 * 解析命令行参数与环境变量，确定最终输出文件路径。
 */
function resolveOutputPath(argv: string[]): string {
  let explicitFile: string | undefined;
  let explicitDir: string | undefined;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--out" || arg === "--output" || arg === "-o") {
      explicitFile = readFlagValue(argv, i, arg);
      i += 1;
      continue;
    }
    if (arg.startsWith("-o=")) {
      explicitFile = arg.slice("-o=".length);
      if (!explicitFile) throw new Error("Missing value for -o=.");
      continue;
    }
    if (arg.startsWith("--out=")) {
      explicitFile = arg.slice("--out=".length);
      if (!explicitFile) throw new Error("Missing value for --out=.");
      continue;
    }
    if (arg.startsWith("--output=")) {
      explicitFile = arg.slice("--output=".length);
      if (!explicitFile) throw new Error("Missing value for --output=.");
      continue;
    }
    if (arg === "--out-dir") {
      explicitDir = readFlagValue(argv, i, arg);
      i += 1;
      continue;
    }
    if (arg.startsWith("--out-dir=")) {
      explicitDir = arg.slice("--out-dir=".length);
      if (!explicitDir) throw new Error("Missing value for --out-dir=.");
      continue;
    }
  }

  if (explicitFile) {
    const resolved = resolve(explicitFile);
    if (explicitFile.endsWith("/") || explicitFile.endsWith("\\")) {
      return join(resolved, ENTRY_FILENAME);
    }
    try {
      if (statSync(resolved).isDirectory()) {
        return join(resolved, ENTRY_FILENAME);
      }
    } catch {
      // 目标尚不存在时视为文件路径
    }
    return resolved;
  }

  if (explicitDir) {
    return join(resolve(explicitDir), ENTRY_FILENAME);
  }

  const envDir = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  if (envDir) {
    return join(resolve(envDir), ENTRY_FILENAME);
  }

  return DEFAULT_OUT_PATH;
}

/**
 * 校验单行文本是否满足比赛 Gate（1..140 Unicode 码点、非空、单行）。
 */
function validateEntryLine(line: string): number {
  if (!line || line.trim().length === 0) {
    throw new Error("Entry line must not be empty or whitespace-only.");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("Entry must be a single line without line breaks.");
  }
  const codepoints = Array.from(line).length;
  if (codepoints < 1 || codepoints > MAX_CODEPOINTS) {
    throw new Error(
      `Entry length (${codepoints} codepoints) exceeds 1..${MAX_CODEPOINTS} limit.`
    );
  }
  return codepoints;
}

function main(): void {
  const outPath = resolveOutputPath(process.argv.slice(2));
  const codepoints = validateEntryLine(JOKE_LINE);

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JOKE_LINE, "utf8");

  const bytes = Buffer.byteLength(JOKE_LINE, "utf8");
  console.log(
    `Wrote entry (${codepoints} chars, ${bytes} bytes) to ${outPath}`
  );
}

main();
