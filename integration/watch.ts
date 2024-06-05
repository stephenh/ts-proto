const chokidar = require("chokidar");
const spawn = require("child_process").spawn;
type FsEvent = "add" | "addDir" | "change" | "unlink" | "unlinkDir";

const colors = {
  none: "",
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

main();

function main() {
  const yarn = process.platform === "win32" ? "yarn.cmd" : "yarn";
  const usePolling = process.argv.includes("--polling");
  const tests = process.argv.slice(2).filter((x) => !x.startsWith("-"));
  const watchOptions = { ignoreInitial: true, usePolling };

  if (process.argv.includes("-h") || process.argv.includes("--help")) showHelp();
  showSettings(tests);

  chokidar.watch("integration/*/*.proto", watchOptions).on("all", integrationHandler(yarn, "proto2ts"));
  chokidar.watch("integration/*/*.proto", watchOptions).on("all", integrationHandler(yarn, "proto2pbjs"));
  chokidar.watch("src/**/*.ts", watchOptions).on("change", srcHandler(yarn, "proto2ts", tests));

  setupKeys({
    [""]: () => yarnRun(yarn, "proto2ts", "enter"),
    ["q"]: () => process.exit(),
    ["\u0003"]: () => process.exit(), // ctrl-c
  });
}

function setupKeys(bindings: { [p: string]: () => void }) {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  Object.entries(bindings).forEach(([key, handler]) => {
    process.stdin.on("data", (data) => {
      if (data.toString().trim() === key) handler();
    });
  });
}

function showHelp() {
  console.log(`
Watches the integration directory for changes and regenerates .bin and .ts files.
Watches the src directory and regenerates given TEST files.

Usage:
    $ yarn watch [options] [TEST, TEST2, ...]
    $ ts-node watch.ts [options] [TEST, TEST2, ...]
    
Options:
    -h, --help    Show this help message.
    --polling     Use polling instead of native watchers.
    TEST          Regenerate the specified TEST(s) when implementation files change.
                  Equivalent to running 'yarn proto2ts TEST' manually each time.
    
Examples:
    $ yarn watch
    $ yarn watch --polling
    $ yarn watch simple struct`);
  process.exit(0);
}

function showSettings(tests: string[]) {
  console.log(`${colors.yellow}`);
  console.log(`Watching for changes:`);
  console.log("- integration/\tRegenerating integration/*/*.proto to .bin and .ts");
  if (tests.length) {
    console.log(`- src/\t\tRegenerating integration/{${tests.join(", ")}}/*.proto to .ts`);
  }
  console.log("\nPress enter to regenerate all integration tests.");
  console.log("Press ctrl+c or q to exit");
  console.log(colors.reset);
}

function integrationHandler(yarn: string, task: string) {
  return (event: FsEvent, triggerPath: string) => {
    if (event !== "add" && event !== "change") return;

    triggerPath = triggerPath.replace(/\\/g, "/"); // windows
    const relativePath = triggerPath.replace(/^integration\//, "");

    yarnRun(yarn, task, triggerPath, relativePath);
  };
}

function yarnRun(yarn: string, task: string, header: string, taskArgument?: string) {
  const yarnArgs = taskArgument ? [task, taskArgument] : [task];

  console.log(formatLog(colors.green, header, task, `${yarn} ${yarnArgs.join(" ")}`));

  const yarnProcess = spawn(yarn, yarnArgs);
  yarnProcess.stdout.on("data", (data: Buffer) => console.log(formatLog(colors.none, header, task, data.toString())));
  yarnProcess.stderr.on("data", (data: Buffer) => console.error(formatLog(colors.red, header, task, data.toString())));
  yarnProcess.on("error", (err: Error) => console.error(formatLog(colors.red, header, task, err.message)));
  yarnProcess.on("close", (code: number) => {
    if (code !== 0) {
      console.error(formatLog(colors.red, header, task, `Exited with code ${code}`));
    } else {
      console.log(formatLog(colors.green, header, task, "Done"));
    }
  });
}

function srcHandler(yarn: string, task: string, tests: string[]) {
  return async (triggerPath: string) => {
    triggerPath = triggerPath.replace(/\\/g, "/");
    if (tests.length === 0) {
      const notice = `Plugin modified! Press [enter] to regenerate all integration tests or run 'yarn watch [TEST, ...]'. See 'yarn watch --help'.`;
      console.log(formatLog(colors.yellow, triggerPath, "watch", notice));
    } else {
      yarnRun(yarn, task, triggerPath, tests.join(" "));
    }
  };
}

function formatLog(color: string, triggerPath: string, category: string, message: string) {
  return (
    message
      .split("\n")
      .filter((line) => line.length)
      .map((line) => `${colors.reset}${triggerPath} ${colors.cyan}[${category}]${colors.reset} ${color}` + line)
      .join("\n") + colors.reset
  );
}
