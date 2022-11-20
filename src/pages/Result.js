import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { ResultData } from '../data/resultdata'
function Result(){
    const navigate=useNavigate()
    const [searchParams]=useSearchParams()
    const mbti=searchParams.get('mbti')
    const [result,setResult]=useState({}) //받아온(import) ResultData와 다름
    React.useEffect(()=>{
        const final=ResultData.find((s)=>s.best===mbti)
        setResult(final)
    },[mbti])
    console.log(mbti)
    return (
        <>
        <Wrapper>
           <Header>나라로 알아보는 MBTI</Header>
           <Contents>
               <Title>당신과 잘 맞는 국가는 {result.name} 입니다.</Title>
               <LogoImage>
                   <img src={result.image} alt="" width={350} height={350} className='rounded-circle' />
               </LogoImage>
               <Desc>{result.desc}</Desc>
               <Button onClick={()=>navigate('/')}>테스트 다시하기</Button>
           </Contents>
        </Wrapper>
       </>
    )
}

export default Result

const Wrapper=styled.div`
    height:100vh;
    width:100%;
`
const Header=styled.div`
    font-size:40pt;
    display:flex;
    justify-content:center;
    align-items:center;
`
const Title=styled.div`
    font-size:30pt;
    margin-top:40px;
`
const LogoImage=styled.div`
    margin-top:10px;
`

const Desc=styled.div`
    font-size:20pt;
    margin-top:20px;
`
const Contents=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column
`