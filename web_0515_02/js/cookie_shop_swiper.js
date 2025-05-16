let cookies = []; // 쿠키(들) 배열

// 생성자
function CookieProduct(cookie_image_files, cookie_text, cookie_price) {

    this.name = cookie_image_files;
    this.content = cookie_text;
    this.price = cookie_price;
}

// 문자열 대체 함수
function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

// 쿠키 순서 및 파일명 : 배열
let cookie_image_files = new Array;
let cookie_text = new Array;
let cookie_price = new Array;


// 메인(main)
window.onload = function() {

    //쿠키 리스트 호출 및 데이터 입력
    //innerHTML 할 선택자 지정
    let listWrap = document.querySelector('.boardBot');
    let slider_panel = document.querySelector("div#slider_panel");

    // 화면 가용공간(viewport) 높이 설정
    let sections = document.querySelectorAll("[id$=_section")
    for (let section of sections) {
        section.style.height = window.innerHeight;
    };   

    // 슬라이더 이미지(쿠키) 로딩(추가)
    let cookie_image = [];

    // 초기 실행: JSON 데이터 로드 및 이벤트 리스너 설정
    // 자바스크립트 객체 표기법(JavaScript Object Notation)
    fetch('js/goods.json')
        .then(res => {
            if(!res.ok){ // if res.ok === false
                throw new Error(`연결중에 ${res.status} 에러가 발생했습니다.`);
            }else{
                //console.log("ok");
                return res.json();
            };
        }) // JSON 데이터 파싱
    
        .then(async cookie_data_json => {  

            for(let idx=0; idx<cookie_data_json.length; idx++){
                // 각 배열에 순차적으로 json 데이터 저장
                cookie_image_files[idx]   = cookie_data_json[idx].name;
                cookie_text[idx]          = cookie_data_json[idx].txt;
                cookie_price[idx]         = cookie_data_json[idx].price;
                
                var tmp = await CookieProduct(cookie_image_files[idx], cookie_text[idx], cookie_price[idx]);
                cookie_image.push([this.name, this.content, this.price]);
            };//for         

            let tpl_str ='';
            let tpl_pn ='';

            for(let k=0; k<cookie_image.length; k++){
                // console.log(cookie_image[k][0]); name
                // console.log(cookie_image[k][1]); txt
                // console.log(cookie_image[k][2]); price

                // 슬라이드 요소 추가 템플릿
                tpl_str =
                    `<div class="swiper-slide">
                        
                        <div id="slider_text${k}" class="slider_text" style="color:yellow; z-index:10">

                            <span style="color:#fff; font-weight:bold; font-size:2em;">
                                ${cookie_image[k][0]}
                            </span>
                            
                            <br><br>

                            ${cookie_image[k][1]}

                            <br><br>

                            <b>￦ ${cookie_image[k][2]}</b>
                        </div>	
                        
                        <img src="./pic/${cookie_image[k][0]}.png" id="cookie_image${k}" class="cookie_image" />
                    </div>`;                
                    
                slider_panel.innerHTML += tpl_str;           
                
                // 우측 패녈 추가 템플릿
                tpl_pn = 
                    `<div class="row rowList">
                        <input type="text" name="goodsName_${k}" id="goodsName_${k}" value="${cookie_image[k][0]}" readonly>
                        <input type="number" name="goodsCost_${k}" id="goodsCost_${k}" value="${cookie_image[k][2]}" readonly>               
                        <input type="number" name="goodsCnt_${k}" id="goodsCnt_${k}" value="0" readonly>   
                        <input type="number" name="goodsTotal_${k}" id="goodsTotal_${k}" value="0" readonly>        
                    </div>`;
                
                listWrap.innerHTML += tpl_pn;
            }; 

            // 슬라이드에 커서가 올려저 있다면 슬라이드 자동재생 멈춤
            // 슬라이드 이미지 클릭시, 값을 계산해주는 기능
            let swiper_sld  = document.querySelectorAll('.swiper-slide');
            let inputSlt    = document.querySelectorAll('.rowList');
            let total_all   = document.querySelector('#TotalSum');

            swiper_sld.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    swiper.autoplay.stop();
                });
                element.addEventListener('mouseleave', () => {
                    swiper.autoplay.start();
                });
                element.addEventListener('click', () => {
                    let tit = element.querySelector('.slider_text').getAttribute("id"); //id 추출
                    tit = parseInt(tit.replace("slider_text","")); // 번호 추출

                    let input_cnt_slt = inputSlt[tit].querySelector(`#goodsCnt_${tit}`); // 갯수 추출
                    let input_cst     = inputSlt[tit].querySelector(`#goodsCost_${tit}`); // 가격 추출
                    let input_sum     = inputSlt[tit].querySelector(`#goodsTotal_${tit}`); // 한 상품에 대한 총 가격 추출

                    let val_num = parseInt(input_cnt_slt.value);
                    let bf_val = val_num; //이전값을 받아서 이를 인자로 전달하기 위함.

                    val_num++; // 이후 증가한 값을 저장

                    input_cnt_slt.value = val_num;

                    return val_list(input_cnt_slt.value, bf_val, input_cst.value, input_sum);
                    // val_list(현재값, 이전값, 가격, 상품값 표기 선택자);
                });

                function val_list(current, prev, cst, sum_Val){
                    //console.log(current); // 현재 상품 갯수
                    //console.log(prev);    // 이전 상품 갯수
                    //console.log(cst);     // 개당 상품 가격
                    //console.log(sum_Val);       // 갯수 * 상품 가격 합계

                    if(current !== prev){ // 값이 증가할때,
                        let gds_sum = current * cst;
                        sum_Val.value = parseInt(sum_Val.value) + parseInt(gds_sum);

                        return numbComm();
                    }else{//이전 값과 동일할때,
                        return;
                    };
                };

                // 합계금액을 문자로 잘라서 자릿수에 맞춰 쉼표 추가해주기
                function numbComm(){
                    let list_sum_all = 0;
                    for(let i=0; i<cookie_image.length; i++){
                        let list_sum = document.querySelector(`input#goodsTotal_${i}`);
                        //console.log(list_sum);
                        list_sum_all += parseInt(list_sum.value);
                    };
                    
                    //console.log(list_sum_all);

                    let str_vl = String(list_sum_all);
                    let formattedString = str_vl.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                    total_all.value = formattedString + ' ￦';

                    //console.log(formattedString);                         
                };
            }); // forEach end


        });//then





        const swiper = new Swiper('.swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
    
            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },
    
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
    
            slidesPerView: 2,
            spaceBetween: 10,
    
    
            // Responsive breakpoints
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is >= 640px
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
            }
        });
}; // window.onload 

