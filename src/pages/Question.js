import React, { useState } from 'react'
import styled from 'styled-components'
import styles from '../mobile/Question.module.css'
import {ProgressBar,Button} from 'react-bootstrap'
import {createSearchParams, useNavigate} from 'react-router-dom'
import {QuestionData} from '../data/questiondata'
import KakaoAdfit from '../component/KakoAdfit'

function Question(){
    const [questionNo,setQuestionNo]=useState(0)
    const [totalScore,setTotalScore]=useState([
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

    }
    
   
    return (
        <Wrapper>
            <ProgressBar variant="info" now={questionNo/QuestionData.length*100} style={{marginTop:'20px'}}/>
            <Title>{QuestionData[questionNo].id}. {QuestionData[questionNo].title}</Title>
            <ButtonGroup>
                <Button className={styles.btn} onClick={()=>handleClickButton(1,QuestionData[questionNo].type)} >{QuestionData[questionNo].answera}</Button>
                <Button className={styles.btn} onClick={()=>handleClickButton(0,QuestionData[questionNo].type)} style={{marginLeft:'20px'}}>{QuestionData[questionNo].answerb}</Button>
            </ButtonGroup>
            <KakaoAdfit style={{position:'relative',bottom:'0'}}/>
        </Wrapper>
    )
}

export default Question

const Wrapper=styled.div`
    height:100vh;
    width:100vw;
    color:white;
    overflow:hidden;
`
const Title=styled.div`
    font-size:1.8rem;
    text-align:center;
    margin-top:10px;
`
const ButtonGroup=styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    margin-top:100px;
`