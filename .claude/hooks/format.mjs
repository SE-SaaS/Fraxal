/**
 * Formats whatever file Claude just edited.
 *
 * Runs as a PostToolUse hook: Claude Code pipes the tool call in as JSON on
 * stdin. Failures are swallowed on purpose — a formatter falling over should
 * never block an edit that already succeeded.
 */
import { execFileSync } from "node:child_process";

const FORMATTABLE = /\.(ts|tsx|js|jsx|mjs|cjs|json|css|md|mdx)$/;

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  try {
    const file = JSON.parse(raw || "{}")?.tool_input?.file_path;
    if (!file || !FORMATTABLE.test(file)) return;
    execFileSync("npx", ["prettier", "--write", "--ignore-unknown", file], {
      stdio: "ignore",
      shell: true,
    });
  } catch {
    // Intentionally silent.
  }
});
