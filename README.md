# 2019 광운대학교 산학연계SW 프로젝트

광운대학교 산학연계SW 프로젝트로 진행되는 AI를 활용한 건강식단 프로그램입니다. 

#### Requirement
* Node.js
* python3
  * numpy

#
#### 아나콘다 이용 시
아나콘다 설치 경로 내부의 파이썬 경로를 확인해야합니다.

해당 경로는 이후 `server/recommendation-model/recommend.js` 에서 options의 pythonPath로 설정해주어야합니다.

일반적인 아나콘다 설치 경로는 다음과 같습니다.

* OSX `/opt/anaconda3/env/[DIRECTORY]/bin/python`
* Window `C:/Users/[YOURNAME]/anaconda3/envs/[DIRECTORY]/python`


#### VSCode 이용 시
VSCode에서 실행되는 터미널 환경에서 파이썬이 올바르게 동작해야합니다.

1. 아나콘다로 파이썬 환경 구축 시

git bash 터미널 실행 후, 홈 디렉토리로 이동해서 .bashrc를 생성해주세요
```bash
cd ~
code .bashrc
```

아래 코드를 추가하고 저장해주세요. 해당 터미널 환경에서 아나콘다가 활성화할 수 있도록 하는 bash 파일입니다.

아나콘다 설치 경로에 따라 해당 파일이 없을 수 있습니다.
```bash
source ~/anaconda3/etc/profile.d/conda.sh
```
로컬 서버를 실행시킬 때, 아나콘다 가상 환경을 activate 시켜주세요.

#
#### 사용 방법
`server/recommendation-model/recommned.js` 에서 
> pythonPath: '/opt/anaconda3/envs/tf1/bin/python3'

해당 부분을 자신이 구축한 파이썬 경로로 지정해주세요.

1. 로컬 서버 실행
```shell
node server/server.js
```
2. 리액트 앱 실행
```npm
npm start
```
