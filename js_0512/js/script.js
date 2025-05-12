// window 객체는 내장객체(브라우저 내장객체)
// 별도로 window 에 대해 객체 선언을 안해줘도 사용 가능하다.

window.onload = () =>{
    // to do
    const close_btn = document.getElementById("modal_close_btn");
    let modal = document.querySelector('.modal');
    let open_modal = document.querySelector(".open_modal");

    close_btn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    open_modal.addEventListener("click", () => {
        modal.style.display = "block";
    });

};