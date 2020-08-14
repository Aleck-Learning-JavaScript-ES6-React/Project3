function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }    

    //Slider (var. 2) - карусель
    const current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector(container);

    let slideIndex = 1,
        offset = 0;

    total.textContent = getZero(slides.length);
    current.textContent = getZero(slideIndex);

    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = 'flex'; //выстраивание объектов вдоль горизонтальной оси
    slidesField.style.transition = '0.5s all'; //настройка стиля смены слайдов 

    slidesWrapper.style.overflow = 'hidden'; //Отображается только область внутри элемента, остальное будет скрыто. 

    slides.forEach(slide => {
        slide.style.width = width;
    });

    //Навигация для слайдов    
    slider.style.position = 'relative';

    const indicators = document.createElement('ol'), //Создаём нумерованный список 
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = ` 
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function sliderFocus() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        //if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            // offset += +width.slice(0, width.length - 2);
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (++slideIndex > slides.length) {
            slideIndex = 1;
        }
        current.textContent = getZero(slideIndex);

        sliderFocus();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            // offset = +width.slice(0, width.length - 2) * (slides.length - 1);
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            // offset -= +width.slice(0, width.length - 2);
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (--slideIndex === 0) {
            slideIndex = slides.length;
        }
        current.textContent = getZero(slideIndex);

        sliderFocus();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            // offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            current.textContent = getZero(slideIndex);

            sliderFocus();
        });
    });
}

export default slider;

/* //Slider (var. 1)
         const sliderTextCurrent = document.querySelector('#current'),
            sliderTextTotal = document.querySelector('#total'),
            slides = document.querySelectorAll('.offer__slide'),
            sliderPrev = document.querySelector('.offer__slider-prev'),
            sliderNext = document.querySelector('.offer__slider-next'),
            slidersTotal = slides.length;

        let sliderCount = 1;    
        
        //Функция показа слайда
        function showSlide() {
            slides.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show');
            });
            
            slides[sliderCount-1].classList.add('show');
            slides[sliderCount-1].classList.remove('hide');

            sliderTextCurrent.textContent = getZero(sliderCount);
        }  
        
        sliderTextTotal.textContent = getZero(slidersTotal);
        showSlide();  
        

        sliderPrev.addEventListener('click', (e) => {
            if (--sliderCount===0) {
                sliderCount=slidersTotal;
            }
            showSlide();
        });

        sliderNext.addEventListener('click', (e) => {
            if (++sliderCount>slidersTotal) {
                sliderCount=1;
            }
            showSlide();
        }); */