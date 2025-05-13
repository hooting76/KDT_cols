window.onload = function() {	

    // 피자 원본 파일들
    // let pizza = ['pizza1.png', 
    // 			    'pizza2.png', 
    // 			    'pizza3.png', 
    // 			    'pizza4.png'];
    
    let pizza = new Array();
    pizza[0] = 'pizza1.png';
    pizza[1] = 'pizza2.png';
    pizza[2] = 'pizza3.png';
    pizza[3] = 'pizza4.png';
    
    // 화면 가용공간(viewport) 높이 설정
    let wrap = document.getElementById("wrap");
    let left_menu = document.getElementById("left_menu");
    let center_dish = document.getElementById("center_dish");
    let pizza_menu = document.getElementById("pizza_menu");
    let knife_box = document.getElementById("knife_box");
    let fork_box = document.getElementById("fork_box");
    let main_dish_img = document.querySelector("#main_dish img");
    
    // 참고) viewport 단위를 사용하지 않고
    // javascript로 전체 화면 viewport(실제 컨텐츠 출력공간) 설정하는 방법

    // wrap.style.height = window.innerHeight + "px";
    // left_menu.style.height = window.innerHeight + "px";
    // center_dish.style.height = window.innerHeight + "px";
    
    // 좌측 메뉴에 요리 추가
    for (let i=0; i<pizza.length; i++){
        let dish_code = 
            `<div class='pizza'><img src='pic/small/small_pizza${i+1}.png' id='pizza${i+1}'></div>`;
        
        pizza_menu.innerHTML += dish_code;
    }; // 

    // 좌측 피자 메뉴 등록 및 CSS 적용
    let pizzas = document.querySelectorAll(".pizza");

    for (let pizza of pizzas) {
        pizza.style.padding = "10px"; 
        pizza.style.width = "250px";
        pizza.style.height = "100px";
        pizza.style.display = "flex";
        pizza.style.alignItems = "center";
        pizza.style.justifyContent = "center";
    };

    // 피자 메뉴 이벤트 설정
    let pizza_menu_btns = document.querySelectorAll("img[id^=pizza]");

    for (let pizza_menu_btn of pizza_menu_btns) {
        pizza_menu_btn.onclick = function(e) {

            let selected_pizza = e.target.src;
            selected_pizza = selected_pizza.replace("small_", "").replace("/small/", "/original/");
            main_dish_img.src = selected_pizza;
    
            alert("피자 먹자 !");				
            
            // 포크/나이프 등장
            fork_box.style.visibility = "visible";
            knife_box.style.visibility = "visible";
            
        }; // handler
    
    }; // for

    // 나이프/포크를 건드리게 되면 그만 먹는 것으로 간주하여 이벤트 처리
    knife.onclick = function() {

        // 식사중 그만 먹을지 점검!
        if (confirm("피자를 맛있게 먹고 있습니다. 그만 드시겠습니까?")) {

            alert("잘 먹었습니다.");

            // 포크와 나이프를 치운다.
            console.log("자리 정리");
            fork_box.style.visibility = "hidden";
            knife_box.style.visibility = "hidden";

            // 피자 접시를 비운다.
            main_dish_img.src = "";  
        }; 

    }; //
    
    fork.onclick = function() {

        // 식사중 그만 먹을지 점검!
        if (confirm("피자를 맛있게 먹고 있습니다. 그만 드시겠습니까?")) {

            alert("잘 먹었습니다.");

            // 포크와 나이프를 치운다.
            console.log("자리 정리");
            fork_box.style.visibility = "hidden";
            knife_box.style.visibility = "hidden";

            // 피자 접시를 비운다.
            main_dish_img.src = "";  
        }; 

    };

} // window.onload