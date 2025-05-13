window.onload = function(){
  let names = [];               // 전체 데이터 리스트 저장
  const indexMap = new Map();   // 초성 인덱스 Map 객체
  
  // 초성 추출 함수
  function getChosung(text) {
    const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
    let result = '';
    for (let char of text) {
      const code = char.charCodeAt(0) - 44032; // 한글 유니코드 시작값 기준
      if (code >= 0 && code <= 11171) {
        const cho = Math.floor(code / 588);
        result += CHO[cho]; // 초성만 추출
      } else {
        result += char; // 한글 외 문자는 그대로
      }
    }
    return result;
  }
  
  // 데이터 기반으로 초성 인덱스(Map)를 생성하는 함수
  function indexData() {
    indexMap.clear(); // 기존 Map 초기화
    names.forEach(item => {
      const cho = getChosung(item.name); // 이름에서 초성 추출
      indexMap.set(cho, (indexMap.get(cho) || []).concat(item)); // Map에 저장
    });
  }
  
  // 검색어 입력과 카테고리 선택 시 실행되는 검색 함수
  function searchNames(query) {
    const list = document.getElementById("resultList");
    const category = document.getElementById("categoryFilter").value;
    list.innerHTML = ''; // 결과 영역 초기화
  
    //if (!query) return; // 검색어가 없으면 출력 안함
  
    const isChosung = /^[ㄱ-ㅎ]+$/.test(query); // 초성만으로 구성되었는지 검사
  
    const results = []; // 필터링된 결과 리스트
    let itemCnt = 0; // 결과 리스트 갯수 카운트
    names.forEach(item => {
      const matchTarget = isChosung ? getChosung(item.name) : item.name; // 검색 대상 선택
      const matched = matchTarget.includes(query); // 검색어 포함 여부 확인
      const categoryMatch = category === "all" || item.category === category; // 카테고리 일치 여부
  
      if (matched && categoryMatch){
        results.push(item); // 조건 만족 시 결과 추가
        itemCnt++;
      }else{itemCnt = itemCnt;}
    });
   
    // 검색요소가 있고 없고에 따라 예외 처리하기.
    if(itemCnt == 0){ // 입력을 했지만 해당 요소가 없을때
      const el_isNull = document.createElement("li");
      el_isNull.className = "el_isNull";
      el_isNull.innerHTML = "해당 검색 내용이 존재하지 않습니다.";
      list.appendChild(el_isNull); // 결과 리스트에 항목 추가
    }else if(!query){//입력값 자체가 없을때
      const el_isNull = document.createElement("li");
      el_isNull.className = "el_isNull";
      el_isNull.innerHTML = "검색을 시도해 보세요.";
      list.appendChild(el_isNull); // 결과 리스트에 항목 추가        
    }else{
      results.forEach(item => {// 입력도 했고, 일치하는 요소가 있을때
        const li = document.createElement("li");
        li.innerHTML = `${item.name} <span>(${item.category})</span>`;
        list.appendChild(li); // 결과 리스트에 항목 추가
      });
    }
  }
  
  // JSON 데이터에서 카테고리 옵션을 동적으로 생성하는 함수
  function updateCategoryOptions() {
    const select = document.getElementById("categoryFilter");
    const categories = new Set(names.map(n => n.category));
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      select.appendChild(option); // 필터 옵션에 카테고리 추가
    });
  }
  
  // 초기 실행: JSON 데이터 로드 및 이벤트 리스너 설정
  // 자바스크립트 객체 표기법(JavaScript Object Notation)
  fetch('names.json')
    .then(res => {
      if(!res.ok){
        throw new Error(`연결중에 ${res.status} 에러가 발생했습니다.`);
      }
      return res.json();
    }) // JSON 데이터 파싱
    .then(data => {
      names = data;          // 전체 데이터 저장
      indexData();           // 초성 인덱스 생성
      updateCategoryOptions(); // 카테고리 옵션 업데이트
  
      // 검색어 입력 이벤트 연결
      document.getElementById("searchInput")
        .addEventListener("input", e => searchNames(e.target.value.trim()));
  
      // 카테고리 변경 이벤트 연결
      document.getElementById("categoryFilter")
        .addEventListener("change", () => {
          const query = document.getElementById("searchInput").value.trim();
          searchNames(query); // 검색어 그대로 다시 검색
        });
    });
    
};