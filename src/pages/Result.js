import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import { ResultData } from '../data/resultdata'
import KakaoShareButton from '../component/KakaoShareButton'
import {useNavigate, useSearchParams} from 'react-router-dom'
function Result(){
    const navigate=useNavigate()
    const [searchParams]=useSearchParams()
    const mbti=searchParams.get('mbti')
    const [result,setResult]=useState({}) //받아온(import) ResultData와 다름
    React.useEffect(()=>{
        const final=ResultData.find((s)=>s.best===mbti) //resultData의 각 요소를 순회하면서 Question.js에서 받아온 mbti에 해당하는값 찾아서(find) final변수에 저장
        setResult(final)
    },[mbti])
    return (
        <>
        <Wrapper>
           <Header>당신의 MBTI는 {mbti} 입니다.</Header>
           <Contents>
               <Title>당신과 잘 맞는 국가는 {result.name} 입니다.</Title>
               <LogoImage>
                   <img src={result.image} alt="" width={350} height={350} className='rounded-circle' />
               </LogoImage>
               <Desc>{result.desc}</Desc>
               <ButtonGroup>
                    <Button onClick={()=>navigate('/')} style={{marginRight:'10px'}}>테스트 다시하기</Button>
                    <KakaoShareButton data={result}/>
               </ButtonGroup>
           </Contents>
        </Wrapper>
       </>
    )
}

export default Result

const Wrapper=styled.div`
    height:100vh;
    width:100vw;
    color:white;
    overflow:hidden;
`
const Header=styled.div`
    font-size:2.2rem;
    display:flex;
    justify-content:center;
    align-items:center;
    @media screen and (max-width:600px){
        margin-top:30px;
        font-size:1.2rem
    }
    
`
const Title=styled.div`
    font-size:1.8rem;
    margin-top:40px;
    @media screen and (max-width:600px){
        font-size:1rem;
    }
`
const LogoImage=styled.div`
    margin-top:10px;
`

const Desc=styled.div`
    font-size:1.2rem;
    margin-top:20px;
    @media screen and (max-width:600px){
        width:90%;
        text-align:center;
        font-size:0.8rem;
        margin-bottom:10px;
    }
`
const Contents=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
`
const ButtonGroup=styled.div`
    display:flex;
    flex-direction:row;
`