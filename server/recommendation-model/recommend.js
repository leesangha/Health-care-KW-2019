const { PythonShell } = require("python-shell");

function recommend(preferenceList, userNumber) {
  return new Promise((resolve, reject) => {
    const options = {
      mode: "json",
      pythonPath: "/opt/anaconda3/envs/maet/bin/python3",
      pythonOptions: ["-u"],
      scriptPath: __dirname
    };
  
    const shell = new PythonShell("recommend_test01.py", options);
    const data = {
      preference: preferenceList,
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

module.exports.recommend = recommend;