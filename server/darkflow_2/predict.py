from darkflow.net.build import TFNet
import cv2
import json
import sys
'''
jsonString = sys.stdin.readline()
jsonDict = json.loads(jsonString)
userNumber = jsonDict['userNumber']
#print(userNumber)
'''
userNumber = 2
options = {"model" : 'C:/hwcare/Health-care-KW-2019/server/darkflow_2/cfg/tiny-yolo-voc-3c.cfg'
, "load" :  38735
, "threshold":0.2, "labels":"C:/hwcare/Health-care-KW-2019/server/darkflow_2/labels.txt" }
tfnet = TFNet(options)
imgcv = cv2.imread("")
result = tfnet.return_predict(imgcv)
print(result)

# 사진 추가 -> db 저장 -> python 코드로 판별 ->음식 결과 정보 반환 -> 데이터를 db에서 읽도록 변환 -> 음식정보 읽어오기  
