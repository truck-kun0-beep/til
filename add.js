import fs from "fs";
import simpleGit from "simple-git";

const note = process.argv.slice(2).join(" ").trim();
if (!note) {
  console.log('Usage: node add.js "what you learned"');
  process.exit(1);
}

const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
const file = "til.md";

if (!fs.existsSync(file)) fs.writeFileSync(file, "# Today I Learned\n\n");
fs.appendFileSync(file, `- **${today}**: ${note}\n`);

const git = simpleGit();
try {
  await git.add([file]);
  await git.commit(`til: ${note}`);
  await git.push();
  console.log("Done, pushed:", note);
} catch (err) {
  console.error("Failed:", err.message);
}