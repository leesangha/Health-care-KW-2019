import recommendation_model_np as RM
import numpy as np
import json
import sys

# R = sys.argv[1].split(',')
# shape = sys.argv[2].split(',')
# shape = list(map(int, shape))
# R = np.array(R, dtype=np.float32).reshape([shape[0], shape[1]])

# model = RM.RecommendModel(R)
# model.train()

# result = model.predict(int(sys.argv[3]))
# for num in result:
#     print(num)


jsonString = sys.stdin.readline()
dict = json.loads(jsonString)

R = dict['preference']
userNumber = dict['userNumber']

R = np.array(R, dtype=np.float32)

model = RM.RecommendModel(R)
model.train()
predicted = list(model.predict(userNumber))

result = { "predicted": predicted }
print(json.dumps(result))