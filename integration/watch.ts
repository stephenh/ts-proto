const chokidar = require('chokidar');
const spawn = require('child_process').spawn;

main()

function main() {
    const yarn = process.platform === 'win32' ? 'yarn.cmd' : 'yarn'

    if (process.argv.includes('-h') || process.argv.includes('--help')) {
        console.log(`
Watches the integration directory for changes and regenerates .bin and .ts files.

Usage:
    $ yarn watch 
    $ ts-node watch.ts [options]
    
Options:
    -h, --help    Show this help message
    --polling     Use polling instead of native watchers
        `)
        process.exit(0)
    }
    const usePolling = process.argv.includes('--polling')

    process.chdir("integration");

    chokidar
      .watch("*/*.proto", { ignoreInitial: true, usePolling  })
      .on('all', yarnRunHandler(yarn, 'proto2bin'));

    chokidar
      .watch("*/*.proto", { ignoreInitial: true, usePolling })
      .on('all', yarnRunHandler(yarn, 'proto2pbjs'));

    chokidar
      .watch("*/*.bin", { ignoreInitial: true, usePolling })
      .on('all', yarnRunHandler(yarn, 'bin2ts'));
}

const colors = {
    none: '',
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
}

function yarnRunHandler(yarn: string, task: string) {
    return (event: "add" | "addDir" | "change" | "unlink" | "unlinkDir", path: string) => {
        if (event !== 'add' && event !== 'change') {
            return;
        }

        path = path.replace(/\\/g, "/"); // windows

        yarnRun(yarn, task, path);
    }
}

function yarnRun(yarn: string, task: string, path: string) {
    const yarnArgs = [task, path];

    console.log(formatLog(colors.green, task, path, `${yarn} ${yarnArgs.join(' ')}`));

    const yarnProcess = spawn(yarn, yarnArgs);
    yarnProcess.stdout.on('data', (data: Buffer) => console.log(formatLog(colors.none, task, path, data.toString())));
    yarnProcess.stderr.on('data', (data: Buffer) => console.error(formatLog(colors.red, task, path, data.toString())));
    yarnProcess.on('error', (err: Error) => console.error(formatLog(colors.red, task, path, err.message)));
    yarnProcess.on('close', (code: number) => {
        if (code !== 0) {
            console.error(formatLog(colors.red, task, path, `Exited with code ${code}`));
        }
    });
}

function formatLog(color: string, task: string, path: string, message: string) {
    return message
        .split('\n')
        .filter(line => line.length)
        .map(line => `${colors.reset}${path} ${colors.cyan}[${task}]${colors.reset} ${color}` + line)
        .join('\n')
      + colors.reset;
}
