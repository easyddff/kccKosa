document.addEventListener('DOMContentLoaded', () => {
    // 가격과 수량을 업데이트하는 함수
    function updateCart() {
        const cartItems = document.querySelectorAll('#cart_list_detail > li'); // 카트의 모든 품목 선택
        const subTotalElem = document.getElementById('sub_total'); // 서브 총합
        const totalElem = document.getElementById('total_price'); // 전체 총합
        const deliveryPriceElem = document.getElementById('delivery_price'); // 배송비
        let subTotal = 0; // 서브 총합 초기화

        cartItems.forEach(item => {
            const priceElem = item.querySelector('.list_price'); // 가격
            const quantityElem = item.querySelector('.cart_num'); // 수량
            const totalElem = item.querySelector('.list_total'); // 총 가격
            
            const price = parseInt(priceElem.innerText.replace('$', '')); // 가격 값
            const quantity = parseInt(quantityElem.innerText); // 수량 값
            const total = price * quantity; // 품목 총 가격

            totalElem.innerText = `$${total.toFixed(2)}`; // 총 가격 업데이트
            subTotal += total; // 서브 총합에 추가
        });

        const deliveryPrice = parseInt(deliveryPriceElem.innerText.replace('$', '')); // 배송비 값
        subTotalElem.innerText = `$${subTotal.toFixed(2)}`; // 서브 총합 업데이트
        totalElem.innerText = `$${(subTotal + deliveryPrice).toFixed(2)}`; // 전체 총합 업데이트
    }
    
    //=====================================================================================================


    // 각 품목의 버튼을 설정하는 함수
    function setupCartItem(item) {
        const plusButton = item.querySelector('.plus'); // 증가 버튼
        const minusButton = item.querySelector('.minus'); // 감소 버튼
        const removeButton = item.querySelector('button:not(.plus):not(.minus)'); // 제거 버튼
        const quantityElem = item.querySelector('.cart_num'); // 수량
        quantityElem.innerText = 1; // 기본 수량을 1로 설정

        // 증가 버튼 클릭 시
        plusButton.addEventListener('click', function () {
            let quantity = parseInt(quantityElem.innerText); // 현재 수량 가져오기
            quantityElem.innerText = quantity + 1; // 수량 증가
            updateCart(); // 카트 업데이트
        });

        // 감소 버튼 클릭 시
        minusButton.addEventListener('click', function () {
            let quantity = parseInt(quantityElem.innerText); // 현재 수량 가져오기
            if (quantity > 1) {
                quantityElem.innerText = quantity - 1; // 수량 감소
                updateCart(); // 카트 업데이트
            }
        });

        // 제거 버튼 클릭 시
        removeButton.addEventListener('click', function () {
            item.remove(); // 품목 제거
            updateCart(); // 카트 업데이트

            
        });
    }

    // 페이지 로드 시 기존 품목들 설정
    const cartItems = document.querySelectorAll('#cart_list_detail > li');
    cartItems.forEach(item => setupCartItem(item));

    // 모든 품목 제거 버튼 클릭 시
    document.getElementById('all_delete').addEventListener('click', function () {
        document.querySelectorAll('#cart_list_detail > li').forEach(item => item.remove()); // 모든 품목 제거
        updateCart(); // 카트 업데이트
    });

    updateCart(); // 페이지 로드 시 카트 초기화
});
