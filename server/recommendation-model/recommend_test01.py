import recommendation_model_np as RM
import numpy as np
import json
import sys

jsonString = sys.stdin.readline()
jsonDict = json.loads(jsonString)

R = jsonDict['preference']
userNumber = jsonDict['userNumber']

R = np.array(R, dtype=np.float32)

model = RM.RecommendModel(R)
model.train()
predicted = list(model.predict(userNumber))

result = {"predicted": predicted}
print(json.dumps(result))
