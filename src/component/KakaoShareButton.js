import React from 'react'
import Button from 'react-bootstrap/Button'
const {Kakao}=window
const KakaoShareButton=()=>{
  const url='mbtiapp1.netlify.app'
  //const resultUrl=window.location.href

  React.useEffect(()=>{
    Kakao.cleanup()
    Kakao.init('a5fad39d7fc5d2f1636f6819bc3f353a')
    console.log(Kakao.isInitialized())
  },[])
    const shareKakao=()=>{
      Kakao.Share.createDefaultButton({
        container: '#kakaotalk-sharing-btn',
        objectType: 'feed',
        content: {
          title: '재미로 알아보는 국가별 MBTI',
          description: '나와 맞는 국가는 일본 입니다',
          imageUrl:
            'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
          },
        },
        buttons: [
          {
            title: '나도 테스트 하러가기',
            link: {
              mobileWebUrl: url,
              webUrl: 'https://developers.kakao.com',
            },
          },
          
        ],
      });
    }
  
    return (
       <Button onClick={shareKakao}>카카오톡 공유하기</Button>

    )
}

export default KakaoShareButton