import recommendation_model_np as RM
import numpy as np
import sys

R = sys.argv[1].split(',')
shape = sys.argv[2].split(',')
shape = list(map(int, shape))
R = np.array(R, dtype=np.float32).reshape([shape[0], shape[1]])

model = RM.RecommendModel(R)
model.train()

result = model.predict(int(sys.argv[3]))
for num in result:
    print(num)
