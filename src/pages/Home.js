import React from 'react'
import styled from 'styled-components'
import img from '../img/지구.jpg'
import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom'
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
                    <img src={img} alt="" width={350} height={350} className='rounded-circle' />
                </LogoImage>
                <Desc>MBTI를 기반으로 하는 나와 잘맞는 국가 찾기</Desc>
                <Button onClick={handleClickButton}>테스트 시작</Button>
            </Contents>
         </Wrapper>
        </>
    )
}

export default Home

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