# solved.ac-profile-card

Generates a profile card for solved.ac.

[solved.ac](https://solved.ac)에서 제공하는 백준 프로필을 예쁘게 카드 형태로 표시해줍니다.

## 기본 사용법

> 다음과 같이 사용하여 자신의 백준 아이디로 프로필 카드를 생성할 수 있습니다.

params: `username`

- `![](https://boj.profilecard.kr/info?username=백준아이디)`

- `<img src="https://boj.profilecard.kr/info?username=백준아이디" />`

### 사용 예시

params: `username`

- ex) `![](https://boj.profilecard.kr/info?username=test1234)`

- ex) `<img src=https://boj.profilecard.kr/info?username=test1234" />`

## 배경색 커스텀

> 배경 색상을 커스텀하려면 bgc1, bgc2, bgc3 파라미터를 사용하여 Hex 색상 코드를 설정할 수 있습니다.

params: `username`, `bgc1`, `bgc2`, `bgc3`

- `![](https://boj.profilecard.kr/info?username=백준아이디&bgc1=Hex코드&bgc2=Hex코드&bgc3=Hex코드)`

- `<img src="https:/boj.profilecard.kr/info?username=백준아이디&bgc1=Hex코드&bgc2Hex코드&bgc3=Hex코드" />`

### 커스텀 예시

- ex) `![](https://boj.profilecard.kr/info?username=test1234&bgc1=322653&bgc2=8062D6&bgc3=9288F8)`

- ex) `<img src="https://boj.profilecard.kr/info?username=test1234&bgc1=322653&bgc2=8062D6&bgc3=9288F8" />`

# 티어 별 디자인 예시

> 티어 별 디자인 예시입니다.

<img src="https://boj.profilecard.kr/info?username=cki86201" />
<img src="https://boj.profilecard.kr/info?username=alex9801&bgc1=FF0060&bgc2=FFD93D&bgc3=F6F1E9" />
<img src="https://boj.profilecard.kr/info?username=hckim96&bgc1=311D3F&bgc2=A076F9&bgc3=D7BBF5" />
<img src="https://boj.profilecard.kr/info?username=cdt416z&bgc1=54B435&bgc2=82CD47&bgc3=F0FF42" />
<img src="https://boj.profilecard.kr/info?username=eunhxa&bgc1=00FFD1&bgc2=00D7FF&bgc3=72FFFF" />
<img src="https://boj.profilecard.kr/info?username=wjdrh0222&bgc1=6096B4&bgc2=5800FF&bgc3=222831" />
<img src="https://boj.profilecard.kr/info?username=k4n9jun3&bgc1=FF55BB&bgc2=DEFCF9&bgc3=D800A6" />
