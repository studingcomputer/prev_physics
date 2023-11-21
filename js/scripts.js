/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.querySelector('.start-animation');
    const resetButton = document.createElement('button');
    resetButton.textContent = '초기화';
    resetButton.classList.add('btn', 'btn-secondary');
    resetButton.style.display = 'none'; // 초기에는 숨깁니다.

    const largeContainer = document.getElementById('largeContainer');
    const smallContainer = document.getElementById('smallContainer');
    const tempLarge = document.getElementById('tempLarge');
    const tempSmall = document.getElementById('tempSmall');
    const container = document.querySelector('.thermodynamics-animation');

    container.appendChild(resetButton); // 초기화 버튼 추가

    startButton.addEventListener('click', function() {
        tempLarge.disabled = true; // 온도 입력 비활성화
        tempSmall.disabled = true;
        startButton.style.display = 'none';
        let temperatureLarge = parseInt(tempLarge.value);
        let temperatureSmall = parseInt(tempSmall.value);
        var count = 0;

        let interval = setInterval(function() {
            if (Math.abs(temperatureLarge - temperatureSmall) > 0.001) {
                temperatureLarge += (temperatureSmall - temperatureLarge) / 10;
                temperatureSmall += (temperatureLarge - temperatureSmall) / 10;
                tempLarge.value = (temperatureLarge).toFixed(3);
                tempSmall.value = (temperatureSmall).toFixed(3);
                updateTemperatureDisplay();
            } else {
                clearInterval(interval);
                tempLarge.value = ((temperatureLarge + temperatureSmall) / 2).toFixed(3);
                tempSmall.value = ((temperatureLarge + temperatureSmall) / 2).toFixed(3);
                resetButton.style.display = 'block'; // 애니메이션이 끝나면 초기화 버튼을 보여줍니다.
            }
        }, 50);

        function updateTemperatureDisplay() {
            largeContainer.style.backgroundColor = calculateColor(temperatureLarge, temperatureSmall);
            smallContainer.style.backgroundColor = calculateColor(temperatureSmall, temperatureLarge);
        }

        function calculateColor(temperature, otherTemperature) {
            // 상대적인 온도에 따른 색상 계산
            if (temperature > otherTemperature) {
                // 더 뜨거운 경우 빨간색
                red = Math.max(153, 255 - 1.53 * count);
                green = Math.min(255, 3.825 * count);
                blue = Math.min(153, 2.295 * count);
            } else if (temperature < otherTemperature) {
                // 더 차가운 경우 파란색
                red = Math.min(153, 2.295 * count);
                green = Math.min(255, 3.825 * count);
                blue = Math.max(153, 255 - 1.53 * count);
            } else {
                // 같은 경우 초록색
                green = 255;
            }
            count++;
            return `rgb(${red}, ${green}, ${blue})`;
        }
    });

    resetButton.addEventListener('click', function() {
        // 모든 것을 초기 상태로 복구
        tempLarge.disabled = false; // 온도 입력 활성화
        tempSmall.disabled = false;
        tempLarge.value = '';
        tempSmall.value = '';
        largeContainer.style.backgroundColor = '';
        smallContainer.style.backgroundColor = '';
        resetButton.style.display = 'none'; // 초기화 버튼 숨기기
        startButton.style.display = 'block'; // 평형 시작 버튼 다시 보여주기
    });
});
