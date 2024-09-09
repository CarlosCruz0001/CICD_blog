const { exec } = require('child_process');

const port = 3001; // Defina a porta desejada aqui
exec(`PORT=${port} react-scripts start`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
