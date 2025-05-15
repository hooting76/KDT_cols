// window.onload = () =>{
//     //innerHTML 할 선택자 지정
//     const listWrap = document.querySelector('.boardBot');

//     // 초기 실행: JSON 데이터 로드 및 이벤트 리스너 설정
//     // 자바스크립트 객체 표기법(JavaScript Object Notation)
//     fetch('js/goods.json')
//         .then(res => {
//             if(!res.ok){
//                 throw new Error(`연결중에 ${res.status} 에러가 발생했습니다.`);
//             }else{
//                 console.log("ok");
//                 return res.json();
//             };
//         }) // JSON 데이터 파싱
    
//         .then(data =>{
//             console.log(data);
//         });

// };