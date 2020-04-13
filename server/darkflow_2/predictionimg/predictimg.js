const { PythonShell } = require("python-shell");

function predictimg(userNumber) {
  return new Promise((resolve, reject) => {
    const options = {
      mode: "json",
      pythonPath: "C:/ProgramData/Anaconda3/python.exe",
      pythonOptions: ["-u"],
      scriptPath: 'C:/hwcare/Health-care-KW-2019/server/darkflow_2'
    };

    const shell = new PythonShell("predict.py", options);
    const data = {
      userNumber
    };

    shell.send({
      ...data
    });

    let result;

    shell.on("message", ({ predicted }) => {
      result = predicted;
    });

    shell.on("close", () => {
      console.log("python code ended...");
      resolve(result);
    });

    shell.on("stderr", (stderr) => {
      reject(stderr);
    });

  });
}
module.exports.predictimg = predictimg; 