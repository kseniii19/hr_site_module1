
// window.addEventListener("load", () => {
    
//     // Регистрируем плагин один раз для всего файла
//     gsap.registerPlugin(ScrollTrigger);

   
//     // 1. АНИМАЦИЯ ЦИТАТЫ

//     const quote = document.getElementById("animated-quote");
//     if (quote) {
//         const wordsText = quote.textContent.trim().split(/\s+/); 
//         quote.innerHTML = ""; 

//         wordsText.forEach(word => {
//             quote.innerHTML += `<span class="word-mask"><span class="word-inner">${word}</span></span> `;
//         });

//         const wordElements = gsap.utils.toArray("#animated-quote .word-inner");

//         let tl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: ".section3",
//                 start: "top 80%",   
//                 end: "center 50%",  
//                 scrub: 1 
//             }
//         });

//         tl.from(wordElements, {
//             x: (index) => (index % 2 === 0) ? -150 : 150, 
//             opacity: 0,
//             ease: "none", 
//             stagger: 0.1  
//         });

//         tl.from(".text_sec3_mark", {
//             y: -50,
//             opacity: 0,
//             ease: "none"
//         }, "<"); 
//     }



//     // 2. ГОРИЗОНТАЛЬНАЯ ГАЛЕРЕЯ (АДАПТИВ СО СТРЕЛКАМИ)

//      const gallerySection = document.querySelector(".horizontal-gallery");
//     const track = document.querySelector(".gallery-track");
//     const items = gsap.utils.toArray(".gallery-item"); 

//     if (gallerySection && track) {
//         let mm = gsap.matchMedia();

//         // РЕЖИМ ДЕСКТОПА: от 1366px и шире (работает горизонтальный скролл)
//         mm.add("(min-width: 1366px)", () => {
//             gsap.set(gallerySection, { height: "75vw" });

//             let scrollTween = gsap.to(track, {
//                 x: () => -(track.scrollWidth - window.innerWidth),
//                 ease: "none",
//                 scrollTrigger: {
//                     trigger: gallerySection,
//                     start: "center 30%", 
//                     end: () => `+=${track.scrollWidth - window.innerWidth}`, 
//                     pin: true,        
//                     scrub: 1,         
//                     invalidateOnRefresh: true 
//                 }
//             });

//             items.forEach(item => {
//                 gsap.set(item, { y: () => item.offsetHeight * 0.25, rotation: 10 });

//                 let tl = gsap.timeline({
//                     scrollTrigger: {
//                         trigger: item,
//                         containerAnimation: scrollTween, 
//                         start: "left right", 
//                         end: "right left",  
//                         scrub: true,
//                         invalidateOnRefresh: true 
//                     }
//                 });

//                 tl.to(item, { y: 0, rotation: 0, ease: "sine.out", duration: 1 })
//                   .to(item, { y: () => item.offsetHeight * 0.25, rotation: -10, ease: "sine.in", duration: 1 });
//             });

//             return () => {
//                 gsap.set(gallerySection, { clearProps: "all" });
//                 gsap.set(items, { clearProps: "all" });
//             };
//         });

//         // РЕЖИМ ПЛАНШЕТА/МОБИЛЬНОГО: от 0px до 1365px (работают стрелочки)
//         mm.add("(max-width: 1365px)", () => {
//             // Сбрасываем десктопные эффекты
//             gsap.set(gallerySection, { clearProps: "all" });
//             gsap.set(items, { clearProps: "all" });
//             gsap.set(track, { x: 0 }); 

//             const prevBtn = document.querySelector('.arrow-prev');
//             const nextBtn = document.querySelector('.arrow-next');
            
//             let currentX = 0;

//             if (prevBtn && nextBtn) {
//                 // Клик вперед
//                 const moveNext = () => {

//                     const maxScroll = -(track.scrollWidth - window.innerWidth + window.innerWidth * 0.06);
//                     const step = window.innerWidth * 0.5; 
                    
//                     currentX -= step;
//                     if (currentX < maxScroll) currentX = maxScroll; 
                    
//                     gsap.to(track, { x: currentX, duration: 0.4, ease: "power2.out" });
//                 };

//                 // Клик назад
//                 const movePrev = () => {
//                     const step = window.innerWidth * 0.5;
                    
//                     currentX += step;
//                     if (currentX > 0) currentX = 0; // Стоп в начале
                    
//                     gsap.to(track, { x: currentX, duration: 0.4, ease: "power2.out" });
//                 };

//                 nextBtn.addEventListener('click', moveNext);
//                 prevBtn.addEventListener('click', movePrev);


//                 return () => {
//                     nextBtn.removeEventListener('click', moveNext);
//                     prevBtn.removeEventListener('click', movePrev);
//                     gsap.set(track, { clearProps: "all" });
//                 };
//             }
//         });
//     }




//     // 3. ИНФО-КАРТОЧКИ 

//     const infoSection = document.querySelector(".section1_3");

//     if (infoSection) {
//         let mm = gsap.matchMedia();
    
//         mm.add("(min-width: 1366px)", () => {
//             let tl = gsap.timeline({
//                 scrollTrigger: {
//                     trigger: infoSection,
//                     start: "center center", 
//                     end: "+=200%", 
//                     pin: true,     
//                     scrub: 1,
//                     invalidateOnRefresh: true
//                 }
//             });

//             gsap.set('.card-1 .card_hidden_content', { height: "32vw", opacity: 1, marginTop: "2vw" });
//             gsap.set('.card-1', { opacity: 1 });
//             gsap.set('.card_2 .card_hidden_content, .card_3 .card_hidden_content', { height: 0, opacity: 0, marginTop: 0 });
//             gsap.set('.card_2, .card_3', { opacity: 0.3 }); 

//             tl.to('.card-1 .card_hidden_content', { height: 0, opacity: 0, marginTop: 0, duration: 1 }) 
//               .to('.card-1', { opacity: 0.3, duration: 1 }, "<") 
//               .to('.card_2', { opacity: 1, duration: 1 }, "<")   
//               .to('.card_2 .card_hidden_content', { height: "32vw", opacity: 1, marginTop: "2vw", duration: 1 }, "<"); 

//             tl.to('.card_2 .card_hidden_content', { height: 0, opacity: 0, marginTop: 0, duration: 1 }) 
//               .to('.card_2', { opacity: 0.3, duration: 1 }, "<") 
//               .to('.card_3', { opacity: 1, duration: 1 }, "<")   
//               .to('.card_3 .card_hidden_content', { height: "32vw", opacity: 1, marginTop: "2vw", duration: 1 }, "<"); 
//         });

//         mm.add("(max-width: 1365px)", () => {
//             let tl = gsap.timeline({
//                 scrollTrigger: {
//                     trigger: infoSection,
//                     start: "center center", 
//                     end: "+=200%", 
//                     pin: true,     
//                     scrub: 1,
//                     invalidateOnRefresh: true
//                 }
//             });

//             gsap.set('.card-1 .card_hidden_content', { height: "45vw", opacity: 1, marginTop: "2vw" });
//             gsap.set('.card-1', { opacity: 1 });
//             gsap.set('.card_2 .card_hidden_content, .card_3 .card_hidden_content', { height: 0, opacity: 0, marginTop: 0 });
//             gsap.set('.card_2, .card_3', { opacity: 0.3 }); 

//             tl.to('.card-1 .card_hidden_content', { height: 0, opacity: 0, marginTop: 0, duration: 1 }) 
//               .to('.card-1', { opacity: 0.3, duration: 1 }, "<") 
//               .to('.card_2', { opacity: 1, duration: 1 }, "<")   
//               .to('.card_2 .card_hidden_content', { height: "45vw", opacity: 1, marginTop: "2vw", duration: 1 }, "<"); 

//             tl.to('.card_2 .card_hidden_content', { height: 0, opacity: 0, marginTop: 0, duration: 1 }) 
//               .to('.card_2', { opacity: 0.3, duration: 1 }, "<") 
//               .to('.card_3', { opacity: 1, duration: 1 }, "<")   
//               .to('.card_3 .card_hidden_content', { height: "45vw", opacity: 1, marginTop: "2vw", duration: 1 }, "<"); 
//         });
//     }


    
//     // 4. КАТАЛОГ: ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ СЛОВА "КОЛЛЕКЦИИ"

//     const catalogHero = document.querySelector(".section2_1"); 
//     const catalogTrack = document.querySelector(".catalog_track");

//     if (catalogHero && catalogTrack) {
//         function getScrollAmount() {
//             let trackWidth = catalogTrack.scrollWidth;
//             return -(trackWidth - window.innerWidth);
//         }

//         let tween = gsap.to(catalogTrack, {
//             x: getScrollAmount,
//             ease: "none",
//             scrollTrigger: {
//                 trigger: catalogHero,
//                 start: "top top",     
//                 end: () => `+=${catalogTrack.scrollWidth}`, 
//                 pin: true,            
//                 scrub: 1,             
//                 invalidateOnRefresh: true 
//             }
//         });
//     }



//     // 5. БАЗА ДАННЫХ КОЛЛЕКЦИЙ ТОВАРОВ И КОРЗИНА

//     const catalogProducts = {
//         "dune_yubka": { title: "Юбка «Песчаные дюны»", price: "5100 руб", img: "./img/foto1_1.svg", sizes: ["XS", "S", "M", "L"] },
//         "dune_dzhinsy": { title: "Джинсы «Песчаные дюны»", price: "4000 руб", img: "./img/foto1_2.svg", sizes: ["S", "M", "L", "XL"] }, 
//         "dune_sviter": { title: "Свитер «Песчаные дюны»", price: "4500 руб", img: "./img/foto1_3.svg", sizes: ["S", "M", "L", "XL"] },
//         "dune_rubashka": { title: "Рубашка «Песчаные дюны»", price: "5300 руб", img: "./img/foto1_4.svg", sizes: ["XS", "S", "M", "L"] },
//         "forest_zhiletka": { title: "Жилетка «Лесной массив»", price: "5000 руб", img: "./img/foto2_1.svg", sizes: ["XS", "S", "M", "L"] },
//         "forest_sviter": { title: "Свитер «Лесной массив»", price: "4500 руб", img: "./img/foto2_2.svg", sizes: ["S", "M", "L", "XL"] }, 
//         "forest_zhiletka1": { title: "Жилетка «Лесной массив»", price: "5400 руб", img: "./img/foto2_3.svg", sizes: ["XS", "S", "M", "L"] }, 
//         "forest_shapka": { title: "Шапка «Лесной массив»", price: "1500 руб", img: "./img/foto2_4.svg", sizes: ["One Size"] },
//         "stone_tolstovka": { title: "Толстовка на молнии", price: "5000 руб", img: "./img/foto3_1.svg", sizes: ["S", "M", "L", "XL"] },
//         "stone_kurtka": { title: "Кожаная куртка", price: "7500 руб", img: "./img/stone_kurtka.svg", sizes: ["S", "M", "L", "XL"] }, 
//         "stone_yubka": { title: "Юбка «Каменные своды»", price: "450 руб", img: "./img/foto3_3.svg", sizes: ["XS", "S", "M", "L"] }
//     };

//     const params = new URLSearchParams(window.location.search);
//     const id = params.get("id");
//     const product = catalogProducts[id];

//     if (product) {
//         const mainImg = document.querySelector(".dynamic_product_img");
//         if (mainImg) mainImg.src = product.img;

//         const mainTitle = document.querySelector(".dynamic_product_title");
//         if (mainTitle) mainTitle.textContent = product.title;

//         const mainPrice = document.querySelector(".dynamic_product_price");
//         if (mainPrice) mainPrice.textContent = product.price;

//         const cartBtn = document.querySelector(".add_to_cart_btn");
//         if (cartBtn) {
//             cartBtn.addEventListener("click", () => {
//                 window.location.href = "404.html"; 
//             });
//         }
        
//         const sizesContainer = document.querySelector(".dynamic_sizes_box");
//         if (sizesContainer) {
//             sizesContainer.innerHTML = ""; 
//             product.sizes.forEach(size => {
//                 const sizeBtn = document.createElement("button");
//                 sizeBtn.className = "size_item_btn";
//                 sizeBtn.textContent = size;
//                 sizeBtn.addEventListener("click", () => {
//                     document.querySelectorAll(".size_item_btn").forEach(b => b.classList.remove("active_size"));
//                     sizeBtn.classList.add("active_size");
//                 });
//                 sizesContainer.appendChild(sizeBtn);
//             });
//         }
//     }



// });


window.addEventListener("load", () => {


    const burgerBtn = document.querySelector(".burger-menu-btn");
    const closeBtn = document.querySelector(".close-menu-btn");
    const mobilePanel = document.querySelector(".mobile-menu-panel");

    if (burgerBtn && mobilePanel && closeBtn) {
        // Клик на бургер-картинку
        burgerBtn.addEventListener("click", (e) => {
            e.preventDefault();
            mobilePanel.classList.add("is-open");
        });

        // Клик на крестик внутри меню
        closeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            mobilePanel.classList.remove("is-open");
        });
    }
    
    // Регистрируем плагин один раз для всего файла
    gsap.registerPlugin(ScrollTrigger);

   
    // 1. АНИМАЦИЯ ЦИТАТЫ
    const quote = document.getElementById("animated-quote");
    if (quote) {
        const wordsText = quote.textContent.trim().split(/\s+/); 
        quote.innerHTML = ""; 

        wordsText.forEach(word => {
            quote.innerHTML += `<span class="word-mask"><span class="word-inner">${word}</span></span> `;
        });

        const wordElements = gsap.utils.toArray("#animated-quote .word-inner");

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".section3",
                start: "top 80%",   
                end: "center 50%",  
                scrub: 1 
            }
        });

        tl.from(wordElements, {
            x: (index) => (index % 2 === 0) ? -150 : 150, 
            opacity: 0,
            ease: "none", 
            stagger: 0.1  
        });

        tl.from(".text_sec3_mark", {
            y: -50,
            opacity: 0,
            ease: "none"
        }, "<"); 
    }


  // ===================================================
    // 2. ГОРИЗОНТАЛЬНАЯ ГАЛЕРЕЯ (ФИКС СТРЕЛОК НА ТЕЛЕФОНЕ)
    // ===================================================
    const gallerySection = document.querySelector(".horizontal-gallery");
    const galleryTrack = document.querySelector(".gallery-track");
    const galleryItems = gsap.utils.toArray(".gallery-item"); 

    if (gallerySection && galleryTrack) {
        let mm = gsap.matchMedia();

        // ----------------------------------------------------
        // 1. ДЕСКТОПНАЯ АНИМАЦИЯ (от 1366px)
        // ----------------------------------------------------
        mm.add("(min-width: 1366px)", () => {
            gsap.set(gallerySection, { height: "75vw" });

            let scrollTween = gsap.to(galleryTrack, {
                x: () => -(galleryTrack.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: gallerySection,
                    start: "top -18%",
                    end: () => `+=${galleryTrack.scrollWidth - window.innerWidth}`, 
                    pin: true,        
                    scrub: 1,         
                    invalidateOnRefresh: true 
                }
            });

            galleryItems.forEach(item => {
                gsap.set(item, { y: () => item.offsetHeight * 0.25, rotation: 10 });

                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        containerAnimation: scrollTween, 
                        start: "left right", 
                        end: "right left",  
                        scrub: true,
                        invalidateOnRefresh: true 
                    }
                });

                tl.to(item, { y: 0, rotation: 0, ease: "sine.out", duration: 1 })
                  .to(item, { y: () => item.offsetHeight * 0.25, rotation: -10, ease: "sine.in", duration: 1 });
            });

            return () => {
                gsap.set(gallerySection, { clearProps: "all" });
                gsap.set(galleryItems, { clearProps: "all" });
            };
        });

        // ----------------------------------------------------
        // 2. АНИМАЦИЯ ДЛЯ АЙПАДА (от 453px до 1365px)
        // ----------------------------------------------------
        mm.add("(min-width: 453px) and (max-width: 1365px)", () => {
            gsap.set(gallerySection, { height: "75vw" });

            let scrollTween = gsap.to(galleryTrack, {
                x: () => -(galleryTrack.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: gallerySection,
                    start: "top top", 
                    end: () => `+=${galleryTrack.scrollWidth - window.innerWidth}`, 
                    pin: true,        
                    scrub: 1,         
                    invalidateOnRefresh: true 
                }
            });

            galleryItems.forEach(item => {
                gsap.set(item, { y: () => item.offsetHeight * 0.25, rotation: 10 });

                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        containerAnimation: scrollTween, 
                        start: "left right", 
                        end: "right left",  
                        scrub: true,
                        invalidateOnRefresh: true 
                    }
                });

                tl.to(item, { y: 0, rotation: 0, ease: "sine.out", duration: 1 })
                  .to(item, { y: () => item.offsetHeight * 0.25, rotation: -10, ease: "sine.in", duration: 1 });
            });

            return () => {
                gsap.set(gallerySection, { clearProps: "all" });
                gsap.set(galleryTrack, { clearProps: "all" });
                gsap.set(galleryItems, { clearProps: "all" });
            };
        });

        // ----------------------------------------------------
        // 3. ВОССТАНОВЛЕННЫЕ СТРЕЛКИ ДЛЯ ТЕЛЕФОНОВ (до 452px)
        // ----------------------------------------------------
        mm.add("(max-width: 452px)", () => {
            // Зачищаем десктопные наклоны картинок
            gsap.set(gallerySection, { clearProps: "all" });
            gsap.set(galleryItems, { clearProps: "all" });
            gsap.set(galleryTrack, { x: 0 }); 

            const prevBtn = document.querySelector('.arrow-prev');
            const nextBtn = document.querySelector('.arrow-next');
            
            let currentIndex = 0; 
            const totalItems = galleryItems.length;

            if (prevBtn && nextBtn) {
                const updateMobileGallery = () => {
                    // Точный шаг сдвига: ширина карточки 75vw + зазор gap 20vw = 95vw
                    const stepWidth = window.innerWidth * 0.95;
                    const targetX = -(currentIndex * stepWidth);
                    
                    gsap.to(galleryTrack, { 
                        x: targetX, 
                        duration: 0.4, 
                        ease: "power2.out" 
                    });
                };

                const moveNext = () => {
                    if (currentIndex < totalItems - 1) {
                        currentIndex++;
                        updateMobileGallery();
                    }
                };

                const movePrev = () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateMobileGallery();
                    }
                };

                nextBtn.addEventListener('click', moveNext);
                prevBtn.addEventListener('click', movePrev);

                const handleResize = () => updateMobileGallery();
                window.addEventListener('resize', handleResize);

                return () => {
                    nextBtn.removeEventListener('click', moveNext);
                    prevBtn.removeEventListener('click', movePrev);
                    window.removeEventListener('resize', handleResize);
                    gsap.set(galleryTrack, { clearProps: "all" });
                };
            }
        });
    }


// ===================================================
    // 3. ПОШАГОВОЕ РАСКРЫТИЕ КАРТОЧЕК (ФИКС ТРЕТЬЕЙ КАРТОЧКИ)
    // ===================================================
    const infoSection = document.querySelector(".section1_3");

    if (infoSection) {
        let mm = gsap.matchMedia();
    
        // ДЕСКТОПНАЯ АНИМАЦИЯ (от 1366px)
        mm.add("(min-width: 1366px)", () => {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: infoSection,
                    start: "center center", 
                    end: "+=200%", 
                    pin: true,     
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            });

            gsap.set('.card-1 .card_hidden_content', { height: "32vw", opacity: 1, marginTop: "2vw" });
            gsap.set('.card-1', { opacity: 1 });
            gsap.set('.card_2 .card_hidden_content, .card_3 .card_hidden_content', { height: 0, opacity: 0, marginTop: 0 });
            gsap.set('.card_2, .card_3', { opacity: 0.3 }); 

            tl.to('.card-1 .card_hidden_content', { height: 0, opacity: 0, marginTop: 0, duration: 1 }) 
              .to('.card-1', { opacity: 0.3, duration: 1 }, "<") 
              .to('.card_2', { opacity: 1, duration: 1 }, "<")   
              .to('.card_2 .card_hidden_content', { height: "32vw", opacity: 1, marginTop: "2vw", duration: 1 }, "<"); 

            tl.to('.card_2 .card_hidden_content', { height: 0, opacity: 0, marginTop: 0, duration: 1 }) 
              .to('.card_2', { opacity: 0.3, duration: 1 }, "<") 
              .to('.card_3', { opacity: 1, duration: 1 }, "<")   
              .to('.card_3 .card_hidden_content', { height: "32vw", opacity: 1, marginTop: "2vw", duration: 1 }, "<"); 
        });

        // ЕДИНЫЙ ИСПРАВЛЕННЫЙ АДАПТИВ ДЛЯ АЙПАДА (до 1365px)
        mm.add("(max-width: 1365px)", () => {
            // ИСПРАВЛЕНО: Вместо "auto" задаем точную высоту в vw под пропорции планшета
            const tabletCardHeight = "60vw"; 

            gsap.set('.card-1 .card_hidden_content', { height: tabletCardHeight, opacity: 1, marginTop: "4vw" });
            gsap.set('.card-1', { opacity: 1 });
            gsap.set('.card_2 .card_hidden_content, .card_3 .card_hidden_content', { height: 0, opacity: 0, marginTop: 0 });
            gsap.set('.card_2, .card_3', { opacity: 0.3 }); 

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: infoSection,
                    start: "center center", 
                    end: "+=300%", 
                    pin: true,     
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            });

            tl.to('.card-1 .card_hidden_content', { height: 0, opacity: 0, marginTop: 0, duration: 1 }) 
              .to('.card-1', { opacity: 0.3, duration: 1 }, "<") 
              .to('.card_2', { opacity: 1, duration: 1 }, "<")   
              .to('.card_2 .card_hidden_content', { height: tabletCardHeight, opacity: 1, marginTop: "4vw", duration: 1 }, "<"); 

            tl.to({}, { duration: 0.5 }); // Стабилизационная пауза

            tl.to('.card_2 .card_hidden_content', { height: 0, opacity: 0, marginTop: 0, duration: 1 }) 
              .to('.card_2', { opacity: 0.3, duration: 1 }, "<") 
              .to('.card_3', { opacity: 1, duration: 1 }, "<")   
              .to('.card_3 .card_hidden_content', { height: tabletCardHeight, opacity: 1, marginTop: "4vw", duration: 1 }, "<"); 

            tl.to({}, { duration: 0.5 });

            return () => {
                gsap.set('.card_hidden_content', { clearProps: "all" });
                gsap.set('.info_card', { clearProps: "all" });
            };
        });
    }

    // 4. КАТАЛОГ: ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ СЛОВА "КОЛЛЕКЦИИ"
    const catalogHero = document.querySelector(".section2_1"); 
    const catalogTrack = document.querySelector(".catalog_track");

    if (catalogHero && catalogTrack) {
        function getScrollAmount() {
            let trackWidth = catalogTrack.scrollWidth;
            return -(trackWidth - window.innerWidth);
        }

        let tween = gsap.to(catalogTrack, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: catalogHero,
                start: "top top",     
                end: () => `+=${catalogTrack.scrollWidth}`, 
                pin: true,            
                scrub: 1,             
                invalidateOnRefresh: true 
            }
        });
    }


    // 5. БАЗА ДАННЫХ КОЛЛЕКЦИЙ ТОВАРОВ И КОРЗИНА
    const catalogProducts = {
        "dune_yubka": { title: "Юбка «Песчаные дюны»", price: "5100 руб", img: "./img/foto1_1.svg", sizes: ["XS", "S", "M", "L"] },
        "dune_dzhinsy": { title: "Джинсы «Песчаные дюны»", price: "4000 руб", img: "./img/foto1_2.svg", sizes: ["S", "M", "L", "XL"] }, 
        "dune_sviter": { title: "Свитер «Песчаные дюны»", price: "4500 руб", img: "./img/foto1_3.svg", sizes: ["S", "M", "L", "XL"] },
        "dune_rubashka": { title: "Рубашка «Песчаные дюны»", price: "5300 руб", img: "./img/foto1_4.svg", sizes: ["XS", "S", "M", "L"] },
        "forest_zhiletka": { title: "Жилетка «Лесной массив»", price: "5000 руб", img: "./img/foto2_1.svg", sizes: ["XS", "S", "M", "L"] },
        "forest_sviter": { title: "Свитер «Лесной массив»", price: "4500 руб", img: "./img/foto2_2.svg", sizes: ["S", "M", "L", "XL"] }, 
        "forest_zhiletka1": { title: "Жилетка «Лесной массив»", price: "5400 руб", img: "./img/foto2_3.svg", sizes: ["XS", "S", "M", "L"] }, 
        "forest_shapka": { title: "Шапка «Лесной массив»", price: "1500 руб", img: "./img/foto2_4.svg", sizes: ["One Size"] },
        "stone_tolstovka": { title: "Толстовка на молнии", price: "5000 руб", img: "./img/foto3_1.svg", sizes: ["S", "M", "L", "XL"] },
        "stone_kurtka": { title: "Кожаная куртка", price: "7500 руб", img: "./img/foto3_2.svg", sizes: ["S", "M", "L", "XL"] }, 
        "stone_yubka": { title: "Юбка «Каменные своды»", price: "450 руб", img: "./img/foto3_3.svg", sizes: ["XS", "S", "M", "L"] }
    };

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const product = catalogProducts[id];

    if (product) {
        const mainImg = document.querySelector(".dynamic_product_img");
        if (mainImg) mainImg.src = product.img;

        const mainTitle = document.querySelector(".dynamic_product_title");
        if (mainTitle) mainTitle.textContent = product.title;

        const mainPrice = document.querySelector(".dynamic_product_price");
        if (mainPrice) mainPrice.textContent = product.price;

        const cartBtn = document.querySelector(".add_to_cart_btn");
        if (cartBtn) {
            cartBtn.addEventListener("click", () => {
                window.location.href = "404.html"; 
            });
        }
        
        const sizesContainer = document.querySelector(".dynamic_sizes_box");
        if (sizesContainer) {
            sizesContainer.innerHTML = ""; 
            product.sizes.forEach(size => {
                const sizeBtn = document.createElement("button");
                sizeBtn.className = "size_item_btn";
                sizeBtn.textContent = size;
                sizeBtn.addEventListener("click", () => {
                    document.querySelectorAll(".size_item_btn").forEach(b => b.classList.remove("active_size"));
                    sizeBtn.classList.add("active_size");
                });
                sizesContainer.appendChild(sizeBtn);
            });
        }
    }


// 6. БЛОК ЛАБОРАТОРИИ: ДЕСКТОПНЫЙ 3D СКРОЛЛ (2.5 ОБОРОТА) + АДАПТИВ СО СТРЕЛКАМИ
    if (document.getElementById("lab-page")) {
        const carouselSection = document.getElementById('events-carousel-block');
        const labTrack = document.querySelector('.carousel-track');
        const originalCards = gsap.utils.toArray('.carousel-track .event-card');
        
        const prevBtn = document.querySelector('.lab-prev');
        const nextBtn = document.querySelector('.lab-next');

        if (labTrack && originalCards.length > 0) {
            let mm = gsap.matchMedia();

            // ----------------------------------------------------
            // ДЕСКТОПНЫЙ КОНТЕКСТ (от 1366px и выше)
            // ----------------------------------------------------
            mm.add("(min-width: 1366px)", () => {
                // Клонируем элементы с небольшим запасом, чтобы при скролле не оголялся пустой задний план
                for (let i = 0; i < 3; i++) {
                    originalCards.forEach(card => {
                        const cloneBefore = card.cloneNode(true);
                        const cloneAfter = card.cloneNode(true);
                        cloneBefore.classList.add('lab-clone');
                        cloneAfter.classList.add('lab-clone');
                        labTrack.appendChild(cloneAfter);
                        labTrack.insertBefore(cloneBefore, labTrack.firstChild);
                    });
                }

                const allCards = gsap.utils.toArray('.event-card');
                
                // Настройка закольцованного бесконечного движения трека
                const loopProgress = gsap.to(labTrack, {
                    xPercent: -100, 
                    ease: "none",
                    paused: true,
                    repeat: -1
                });

                // Стартуем ровно из середины, чтобы первая карточка была по центру (как на Скриншоте 2)
                let startProgress = 0.5; 
                loopProgress.progress(startProgress);

                let stInstance = ScrollTrigger.create({
                    trigger: carouselSection,
                    start: "top top",
                    end: "+=7500", // Скорректировали длину скролла под 2.5 оборота, чтобы скорость была комфортной
                    pin: true,     // Блокируем вертикальный скролл страницы
                    scrub: true,
                    onUpdate: (self) => {
                        // Множитель 0.25 заставляет карусель провернуться ровно на 2.5 круга при self.progress от 0 до 1
                        let p = startProgress + (self.progress * 0.25);
                        loopProgress.progress(p);
                        
                        // Рассчитываем 3D-объем в реальном времени для всех видимых карточек
                        allCards.forEach(card => {
                            const rect = card.getBoundingClientRect();
                            const cardCenter = rect.left + rect.width / 2;
                            const screenCenter = window.innerWidth / 2;
                            
                            const distanceFromCenter = (cardCenter - screenCenter) / screenCenter;
                            const clampedDistance = Math.min(Math.max(distanceFromCenter, -1), 1);
                            
                            gsap.set(card, {
                                rotateY: clampedDistance * -35, 
                                scale: 1 - Math.abs(clampedDistance) * 0.15, 
                                opacity: 1 - Math.abs(clampedDistance) * 0.4, 
                                overwrite: "auto"
                            });
                        });
                    }
                });

                // Очистка при ресайзе обратно в мобильную версию
                return () => {
                    document.querySelectorAll('.lab-clone').forEach(clone => clone.remove());
                    if (stInstance) stInstance.kill();
                    gsap.set(labTrack, { clearProps: "all" });
                };
            });

            // ----------------------------------------------------
            // МОБИЛЬНЫЙ КОНТЕКСТ (до 1365px включительно)
            // ----------------------------------------------------
            mm.add("(max-width: 1365px)", () => {
                gsap.set(labTrack, { x: 0 }); 

                let currentIdx = 0; 

                const updateMobilePosition = () => {
                    const gap = parseInt(window.getComputedStyle(labTrack).gap) || 20;
                    const cardWidth = originalCards[0].offsetWidth;
                    const targetX = -(currentIdx * (cardWidth + gap));
                    
                    gsap.to(labTrack, { 
                        x: targetX, 
                        duration: 0.4, 
                        ease: "power2.out" 
                    });
                };

                const moveNext = (e) => {
                    if (e) e.stopPropagation();
                    if (currentIdx < originalCards.length - 1) {
                        currentIdx++;
                        updateMobilePosition();
                    }
                };

                const movePrev = (e) => {
                    if (e) e.stopPropagation();
                    if (currentIdx > 0) {
                        currentIdx--;
                        updateMobilePosition();
                    }
                };

                if (prevBtn && nextBtn) {
                    prevBtn.addEventListener('click', movePrev);
                    nextBtn.addEventListener('click', moveNext);
                }

                window.addEventListener('resize', updateMobilePosition);

                return () => {
                    if (prevBtn && nextBtn) {
                        prevBtn.removeEventListener('click', movePrev);
                        nextBtn.removeEventListener('click', moveNext);
                    }
                    window.removeEventListener('resize', updateMobilePosition);
                    gsap.set(labTrack, { clearProps: "all" });
                };
            });
        }
    }





// ==========================================
    // ДИНАМИЧЕСКИЙ МАКЕТ СТРАНИЦЫ СОБЫТИЯ
    // ==========================================
    const labEventsData = {
        "master": {
            title: "Мастер-класс по вышивке",
            desc1: "Это интенсивное занятие, направленное на работу руками. Вы освоите наши фирменные техники фактуризации и научитесь переводить природные паттерны в современный текстильный дизайн. Итогом мастер-класса станет готовое изделие — базовый лонгслив или плотный шоппер (на ваш выбор), кастомизированный созданным вами рельефом.",
            desc2: "В основе нашего бренда лежит сложная работа с материалом. На этом практическом воркшопе мы открываем наши внутренние процессы и показываем, как плоская ткань превращается в объемную, тактильную форму.",
            img1: "./img/img1_1_event.svg", 
            img2: "./img/img1_2_event.svg", 
            img3: "./img/img1_3_event.svg"   
        },
        "show": {
            title: "Показ новой коллекции",
            desc1: "Как рождается вещь? Из идеи, вдохновения природой и сотен экспериментов в нашей лаборатории. На этом показе мы хотим приоткрыть завесу наших внутренних процессов и показать, как рождается фирменный рельеф «Тектуры». Это не просто классическое дефиле, а живое погружение в нашу текстильную лабораторию.",
            desc2: "Прямо на площадке мы покажем, как плоская ткань в руках мастера превращается в объемный живой рельеф. Вам стоит сюда прийти, чтобы вживую примерить вещи из новой коллекции, пообщаться с командой в неформальной атмосфере и увидеть изнутри, как рождается настоящая текстура.",
            img1: "./img/img2_1_event.svg",
            img2: "./img/img2_2_event.svg",
            img3: "./img/img2_3_event.svg"
        },
        "casting": {
            title: "Кастинг в команду",
            desc1: "Совсем скоро мы презентуем нашу новую коллекцию, и сейчас мы в поиске парней и девушек, которые станут частью этого важного для нас события. Наш показ пройдет в формате уютной и живой презентации прямо в нашем пространстве. Нам не важны строгие модельные стандарты или большой опыт. Нам гораздо важнее ваша естественность, харизма и то, как вы чувствуете себя в объемной одежде.",
            desc2: "Как откликнуться: Напишите нам в сообщения свой рост, параметры и прикрепите пару простых, честных фото (портрет и в полный рост при хорошем свете, без макияжа и фильтров). Будем очень рады знакомству!",
            img1: "./img/img3_1_event.svg",
            img2: "./img/img3_2_event.svg",
            img3: "./img/img3_3_event.svg"
        }
    };

    // Читаем ID из параметров URL
    const eventParams = new URLSearchParams(window.location.search);
    const eventId = eventParams.get("id");
    
    // СТРАХОВКА: Если зашли напрямую или ID не найден, принудительно открываем "master"
    let currentEvent = labEventsData[eventId];
    if (!currentEvent) {
        currentEvent = labEventsData["master"];
    }

    // Подставляем данные на странице event.html
    const titleEl = document.querySelector(".dynamic_event_title");
    if (titleEl) titleEl.textContent = currentEvent.title;

    const desc1El = document.querySelector(".dynamic_event_desc_1");
    const desc2El = document.querySelector(".dynamic_event_desc_2");
    if (desc1El) desc1El.textContent = currentEvent.desc1;
    if (desc2El) desc2El.textContent = currentEvent.desc2;

    const img1El = document.querySelector(".dynamic_event_img_1");
    const img2El = document.querySelector(".dynamic_event_img_2");
    const img3El = document.querySelector(".dynamic_event_img_3");
    
    if (img1El) img1El.src = currentEvent.img1;
    if (img2El) img2El.src = currentEvent.img2;
    if (img3El) img3El.src = currentEvent.img3;


    // ==========================================
    // ЛОГИКА КЛИКА НА КНОПКИ ГЛАВНОЙ СТРАНИЦЫ
    // ==========================================
    const eventButtons = document.querySelectorAll(".section_three_events .svg_but");
    if (eventButtons.length > 0) {
        eventButtons.forEach(button => {
            button.addEventListener("click", () => {
                const id = button.getAttribute("data-id");
                if (id) {
                    window.location.href = `event.html?id=${id}`;
                }
            });
        });
    }







// =========================================================================
// 3. ЛОГИКА МОДАЛЬНОГО ОКНА ЗАПИСИ (ПОПАП)
// =========================================================================
const modalOverlay = document.getElementById("bookingModal");
const openModalBtn = document.querySelector(".event_page_btn .svg_but");
const closeModalBtn = document.getElementById("closeModalBtn");

const bookingForm = document.getElementById("bookingForm");
const modalError = document.getElementById("modalError");

const closeModal = () => {
    if (modalOverlay) {
        modalOverlay.classList.remove("is-active");
        document.body.style.overflow = ""; 
        
        if (bookingForm) bookingForm.reset();
        
        document.querySelectorAll(".select-option-btn").forEach(btn => {
            btn.classList.remove("is-selected");
        });
    }
};

if (openModalBtn && modalOverlay) {
    openModalBtn.addEventListener("click", () => {
        modalOverlay.classList.add("is-active");
        document.body.style.overflow = "hidden"; 
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

const setupToggleButtons = (gridSelector) => {
    const buttons = document.querySelectorAll(`${gridSelector} .select-option-btn`);
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("is-selected"));
            button.classList.add("is-selected");
        });
    });
};

setupToggleButtons(".date-grid");
setupToggleButtons(".time-grid");

// =========================================================================
// 4. МГНОВЕННОЕ ЗАКРЫТИЕ ПРИ ОТПРАВКЕ (БЕЗ ОШИБОК И ПРОВЕРОК)
// =========================================================================
if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault(); 
        
        closeModal(); 
        
        setTimeout(() => {
            alert("Вы успешно записались!");
        }, 100);
    });
}




// =========================================================================
// 5. ОБРАБОТКА И ОТПРАВКА ФОРМЫ НА СТРАНИЦЕ КОНТАКТОВ
// =========================================================================
const contactForm = document.getElementById("contactForm");
const contactToast = document.getElementById("contactToast");

if (contactForm && contactToast) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Запрещаем перезагрузку страницы

        // 1. Делаем плашку "Мы скоро вам ответим!" видимой
        contactToast.classList.add("is-visible");

        // 2. Сбрасываем текст в полях ввода
        contactForm.reset();

        // 3. Через 3 секунды плавно прячем плашку обратно
        setTimeout(() => {
            contactToast.classList.remove("is-visible");
        }, 3000);
    });
}

 });