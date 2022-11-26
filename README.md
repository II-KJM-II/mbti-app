# 재미로 알아보는 국가별 MBTI

주소:https://mbtiapp1.netlify.app/

## 1.개요
인프런에서 강의를 듣고 만든 MBTI 웹앱입니다. 12개의 질문을 선택하면 나의 MBTI와 함께 MBTI에 따른 나와 잘 맞는 국가가 나옵니다.
## 2.미리보기
이 사이트는 홈,질문,결과 세개의 경로로 이루어져 있습니다.
### - 홈 페이지
![1](https://user-images.githubusercontent.com/86513078/203896694-3c9b7851-3b56-4b10-b643-e13adfca8e4f.PNG)

사이트에 처음 들어가면 나오는 화면으로 테스트 시작 버튼을 누르면 질문 페이지로 넘어갑니다.

### - 질문 페이지
![2](https://user-images.githubusercontent.com/86513078/203896884-e1a69d54-a9a2-4567-a143-19cf4f70e22c.PNG)

질문페이지로 12개의 질문이 주어지고 본인에게 해당하는 것을 선택하면 됩니다.

### - 결과 페이지
![3](https://user-images.githubusercontent.com/86513078/203896983-524a0d0a-7f59-4714-bf95-5c763c60bbcc.PNG)

모든 질문 선택을 완료하면 나오는 페이지로 자신의 MBTI와 그에 따른 국가가 함께 나옵니다.<br> 원한다면 테스트를 다시 해볼수도 있고 결과를 카카오톡을 이용하여 친구들에게 공유 할 수도 있습니다.

## 3.코드

### App.js
```JS
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/question' element={<Question/>}/>
      <Route path='/result' element={<Result/>}/>
    </Routes>
         
  )
}
```
react-router-dom 사용하여 세개의 route(홈,질문,결과)로 구성

### Home.js(홈페이지)
```JS
function Home(){
    const navigate=useNavigate()
    const handleClickButton=()=>{ //버튼 클릭시 question화면으로 넘어감
        navigate('/question')
    }
    return (
        <>
         <Wrapper>
            <Header>재미로 알아보는 국가별 MBTI</Header>
            <Contents>
                <Title>나에게 맞는 국가는?</Title>
                <LogoImage>
                    <img src={img} alt=""/>
                </LogoImage>
                <Desc>MBTI를 기반으로 하는 나와 잘맞는 국가 찾기</Desc>
                <Button onClick={handleClickButton}>테스트 시작</Button>
            </Contents>
         </Wrapper>
        </>
    )
}
```
Button 컴포넌트는 bootstrap라이브러리,나머지 컴포넌트는 css in js 위해 styled-components 라이브러리 사용<br>
Button 컴포넌트 클릭시 handleClickButton 함수 실행되어 질문페이지로 이동

### Question.js
#### questiondata
```JS
export const QuestionData=[
    {
        id:1,
        title:'당신은 파티에서',
        answera:'낯선 사람을 포함해 많은 사람과 교류하는가',
        answerb:'아는 몇 사람하고만 교류 하는가',
        type:'EI'
    },
 ```
 - data.id : 아이디 값<br>
 - data.title : 문제의 제목<br>
 - data.answera : 첫번째 선택지<br>
 - data.answerb : 두번째 선택지<br>
 - data.type : 어떤 타입(EI,SN,TF,JP)인지<br>
 이런 형태의 배열 안에 객체 12개 존재하고 이 배열을 Question.js에서 받음<br>
 
#### 모든 질문지 선택 완료되지 않았을 때
```JS
    const [questionNo,setQuestionNo]=useState(0)
    const [totalScore,setTotalScore]=useState([ //어떤 타입의 버튼 클릭했는지
        {id:'EI',score:0},
        {id:'SN',score:0},
        {id:'TF',score:0},
        {id:'JP',score:0},

    ])
    const navigate=useNavigate()
    const handleClickButton=(no,type)=>{
        const newScore=totalScore.map((s)=>(
            s.id===type? { id: s.id, score: s.score+no } : s
        ))
        setTotalScore(newScore)
        if(QuestionData.length!==questionNo+1){ //질문 선택 아직 안끝났을 때
            setQuestionNo(questionNo+1)
        }
```
버튼 클릭시 어떤 타입의 버튼 클릭했는지 저장하는 handleClickButton 함수 실행됨<br>
첫번째 버튼 클릭시 totalScore.score 1 증가 <br>
두번째 버튼 클릭시 totalScore.score 0 증가(증가하지 않음)<br>
ex)모든 질문을 두번째 버튼으로 클릭하면 score는 증가하지 않으므로 totalScore의 값은<br>
```JS
{id:'EI',score:0},
{id:'SN',score:0},
{id:'TF',score:0},
{id:'JP',score:0},
```
#### 모든 질문지 선택 완료하였을 때
```JS
else{ //모든 문제 선택 끝났을때 결과 창으로 넘어가기 위함
            const mbti=newScore.reduce(
                (acc,cur) => 
                    acc+(cur.score>=2 ? cur.id.substring(0,1):cur.id.substring(1,2)),
                    ""
            )
            navigate({
                pathname:'/result',
                search:`?${createSearchParams({
                    mbti:mbti,
                })}` //mbti 정보 같이 보냄
            })
        }
``` 
어떤 요소의 totalScore.score값이 2 이상이라면 첫번째 버튼을 더 많이 클릭한 것이므로totalScore.id의 첫글자 가져오고<br> 2 미만이라면 두번째 버튼을 더 많이 클릭한 것이므로 totalScore.id의 두번째 글자 가져옴 최종적으로 자신의 MBTI 나옴<br>
### Result.js
#### resultdata.js
```JS
export const ResultData=[
    {
      id:1,
      name:'독일',
      best:'INTJ',
      desc:'두번이나 전 세계를 상대로 전쟁을 일으킨 전범국가입니다.',
      image:`${Germany}`
    },
```    
- data.id : 아이디 값<br>
- data.name : 국가의 이름<br>
- data.best : 국가의 MBTI<br>
- data.desc : 국가에 대한 설명<br>
- data.image : 국가 이미지<br>
이런 형태의 객체 16개 존재하고 이 배열을 Result.js에서 받음<br>
#### 결과
```JS
const [searchParams]=useSearchParams()
const mbti=searchParams.get('mbti') 
const [result,setResult]=useState({}) //받아온(import) ResultData와 다름
React.useEffect(()=>{
        const final=ResultData.find((s)=>s.best===mbti)
        setResult(final)
    },[mbti])
```
final 변수에 resultData의 각 요소를 순회하면서 Question.js에서 받아온 mbti에 해당하는값 찾아서(find) 저장

#### 결과화면의 버튼
```JS
<ButtonGroup>
      <Button onClick={()=>navigate('/')}>테스트 다시하기</Button>
      <KakaoShareButton data={result}/>
</ButtonGroup>
```
테스트 다시하기 버튼 누르면 홈화면 으로 되돌아감<br>
공유하기 버튼 누르면 카카오톡 api를 사용해 카카오톡 공유가능 최종결과인 result에 담긴 정보가 공유됨

## 4.기술스택
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/><img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white"/><img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white"/><img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white"/>
