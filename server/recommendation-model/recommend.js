const { PythonShell } = require("python-shell");

function getListShape(list) {
  return [list.length, list[0].length];
}

function runRecommendationModel(preferenceList, userNumber) {
  const shape = getListShape(preferenceList);

  const options = {
    mode: "text",
    pythonPath: "/opt/anaconda3/envs/tf1/bin/python3",
    pythonOptions: ["-u"],
    scriptPath: __dirname,
    args: [preferenceList, shape, userNumber],
  };

  return new Promise((resolve, reject) => {
    let result_recommendation = [];
    PythonShell.run("recommend_test01.py", options, (err, result) => {
      if (err || result === undefined) reject(err);
      else result.forEach((v) => result_recommendation.push(Number(v)));
      resolve(result_recommendation);
      console.log(result_recommendation);
    });
  });
}

module.exports.recommend = runRecommendationModel;
