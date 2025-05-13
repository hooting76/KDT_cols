window.onload = () => {
    let pizza_menu = document.getElementById("pizza_menu");
    let knife_box = document.getElementById("knife_box");
    let fork_box = document.getElementById("fork_box");
    let main_dish_img = document.querySelector("#main_dish img");
    
    // let pizza = new Array();

    // pizza 배열에 맞게 배열에 값을 넣으며, 리터럴 템플릿으로 태그 동적 생성하기
    for(let i=0; i<4; i++){
        pizza_menu.innerHTML += `<div class='pizza'><img src='pic/small/small_pizza${i+1}.png' id='pizza${i+1}'></div>`;
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
            fork_box.style.display = "block";
            knife_box.style.display = "block";
        }; // handler
    }; // for end

    // 나이프/포크를 건드리게 되면 그만 먹는 것으로 간주하여 이벤트 처리

    fork_box.onclick = function() {
        // 식사중 그만 먹을지 점검!
        if (confirm("피자를 맛있게 먹고 있습니다. 그만 드시겠습니까?")) {

            alert("잘 먹었습니다.");

            // 포크와 나이프를 치운다.
            console.log("자리 정리");
            fork_box.style.display = "none";
            knife_box.style.display = "none";

            // 피자 접시를 비운다.
            main_dish_img.src = "";  
        };      
    };

    knife_box.onclick = function() {
        // 식사중 그만 먹을지 점검!
        if (confirm("피자를 맛있게 먹고 있습니다. 그만 드시겠습니까?")) {

            alert("잘 먹었습니다.");

            // 포크와 나이프를 치운다.
            console.log("자리 정리");
            fork_box.style.display = "none";
            knife_box.style.display = "none";

            // 피자 접시를 비운다.
            main_dish_img.src = "";  
        };      
    };


   
};
