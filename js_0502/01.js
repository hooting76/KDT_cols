window.onload = function(){
    // window.alert("asdf"); // 내장 함수 : 팝업 오픈
    // window 객체 소속의 메서드
    // window 객체 : 웹 브라우저 자신
    // => 매서드 호출시 소속 객체 무표기 가능


    let head = document.querySelector("#head"); // valid 
    let search = document.getElementById('search');
    
    // document.querySelector(1234) // 문법 x : invalid // 자료형이 안맞음
    // 문법이 있다면 문법대로 해주는게 맞는것.

    head.addEventListener('click',() => {
        //alert("asdf");
        head.style.color = 'red';
    });

    search.addEventListener('input',() => {
        let tmp_value = search.value;
        console.log(tmp_value);
    });

    // 매개변수(parameter, 형식인자, 가인자) : selectors
    // 매개변수(parameter, 형식인자, 가인자) 부(part) : (selectors : string)
    // string(문자열) => 자료형
    // 실인자(argument, 인수) : "#head"

    // undefined : "자료형이 정의되지 않은" 것(변수)에 대한 리터럴(literal, 값)
    
};




