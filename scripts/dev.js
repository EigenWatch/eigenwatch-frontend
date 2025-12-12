const prompts = require('prompts');
const { spawn } = require('child_process');

async function run() {
  const args = process.argv.slice(2);
  let app = args[0];

  if (!app) {
    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Select an application to run',
      choices: [
        { title: 'Web (port 3000)', value: 'web' },
        { title: 'Docs (port 3001)', value: 'docs' },
        { title: 'Dashboard (port 3002)', value: 'dashboard' },
      ],
      initial: 0
    });

    app = response.value;
  }

  if (app) {
    console.log(`Starting ${app}...`);
    const child = spawn('npx', ['turbo', 'run', 'dev', `--filter=${app}`], {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      process.exit(code);
    });
  } else {
    console.log('No application selected.');
  }
}

run();
