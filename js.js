window.addEventListener("load", () => {

    gsap.registerPlugin(ScrollTrigger);


    // 1. ЗУМ В БЕЙДЖИК: ПЕРВЫЙ ЭКРАН -> ВТОРОЙ ЭКРАН

    const stage = document.querySelector(".zoom-stage");
    if (stage) {
        // Во сколько раз Марк на zoom_boy.svg крупнее, чем на boy_with_box.svg
        const ZOOM = 3.293;
        const zoomEase = "power2.inOut";

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: stage,
                start: "top top",
                end: "+=680%",
                pin: true,
                scrub: 1
            }
        });

        // Фон комнаты, заголовок и облака уходят в начале зума
        tl.to([".room", ".first-screen-text", ".thought"], {
            opacity: 0,
            duration: 0.3,
            ease: "none"
        }, 0);

        tl.to(".first-screen", {
            scale: ZOOM,
            duration: 1,
            ease: zoomEase
        }, 0);

        // Второй экран всё время совпадает с первым: в начале он уменьшен в ZOOM раз
        // вокруг той же точки и растёт с тем же ease, поэтому подмена картинки не видна
        tl.fromTo(".second-screen", {
            scale: 1 / ZOOM
        }, {
            scale: 1,
            duration: 1,
            ease: zoomEase
        }, 0);

        tl.to(".second-screen", {
            opacity: 1,
            duration: 0.3,
            ease: "power1.inOut"
        }, 0.65);

        // Убираем первый экран, когда второй уже почти непрозрачен,
        // чтобы его более толстые линии не выглядывали из-под zoom_boy
        tl.to(".first-screen .character", {
            opacity: 0,
            duration: 0.15,
            ease: "none"
        }, 0.85);

        tl.from(".badge", {
            opacity: 0,
            duration: 0.2,
            ease: "none"
        }, 0.9);


        // 2. ЗАТЕМНЕНИЕ И НАДПИСЬ «СПУСТЯ 2 МЕСЯЦА...»
        // Пауза 1.1–1.5, чтобы успеть прочитать бейджик

        tl.to(".zoom-stage .blackout", {
            opacity: 1,
            duration: 0.35,
            ease: "power1.inOut"
        }, 1.5);

        tl.from(".zoom-stage .blackout-text", {
            opacity: 0,
            y: "2vw",
            duration: 0.3,
            ease: "power2.out"
        }, 1.85);



        // 3. ПРОЯВЛЕНИЕ ТРЕТЬЕГО ЭКРАНА ИЗ ТЕМНОТЫ
        // Надпись успевает постоять 2.15–2.4, затем уходит, и экран светлеет

        tl.to(".zoom-stage .blackout-text", {
            opacity: 0,
            duration: 0.25,
            ease: "none"
        }, 2.4);

        tl.to(".third-screen", {
            autoAlpha: 1,
            duration: 0.45,
            ease: "power1.inOut"
        }, 2.6);

        // Первая плашка стоит, потом её плавно сменяет вторая
        addSlideChange(tl, ".story-card-search", 3.4);

        // Небольшой запас, чтобы вторая плашка постояла до конца закрепления
        tl.to({}, { duration: 0.3 });
    }


    // 4. ЧЕТВЁРТЫЙ ЭКРАН: ПЛАШКИ СМЕНЯЮТСЯ ПРИ СКРОЛЛЕ, А ПОСЛЕ
    // «ПРОЧИТАТЬ ПЕРЕПИСКУ» НОУТБУК ВЫДВИГАЕТСЯ И ВЫЕЗЖАЮТ СООБЩЕНИЯ
    // Одна шкала времени: 1 единица = 1 высота экрана скролла.
    // 0–1 — смена плашек, дальше — переписка. Пока кнопка не нажата,
    // закрепление длится только 1 экран, и страница дальше не листается.

    const fourthScreen = document.querySelector(".fourth-screen");
    if (fourthScreen) {
        const CARD_PART = 1;
        let chatOpen = false;

        let fourthTl = gsap.timeline({ paused: true });

        addSlideChange(fourthTl, ".story-card-offer", 0.3);

        // Ноутбук подъезжает к центру и немного увеличивается
        fourthTl.to(".chat-laptop", {
            xPercent: 18,
            yPercent: 6,
            scale: 1.25,
            duration: 1,
            ease: "power2.inOut"
        }, CARD_PART);

        // Правые сообщения выезжают из-за правого края экрана,
        // левые — из-за левого края голубой панели
        fourthTl.fromTo(".message-1", { xPercent: 125, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
        fourthTl.fromTo(".message-2", { xPercent: -182, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
        fourthTl.fromTo(".message-3", { xPercent: 125, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
        fourthTl.fromTo(".message-4", { xPercent: -182, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.4, ease: "power2.out" });

        // Пауза, чтобы переписка постояла
        fourthTl.to({}, { duration: 0.3 });

        // Затемнение и надпись «В зале ожидания:» — переход к пятому экрану
        fourthTl.to(".fourth-screen .blackout", {
            opacity: 1,
            duration: 0.35,
            ease: "power1.inOut"
        });

        fourthTl.from(".fourth-screen .blackout-text", {
            opacity: 0,
            y: "2vw",
            duration: 0.3,
            ease: "power2.out"
        });

        // Надпись стоит, затем уходит, и из темноты проявляется пятый экран
        fourthTl.to({}, { duration: 0.25 });

        fourthTl.to(".fourth-screen .blackout-text", {
            opacity: 0,
            duration: 0.25,
            ease: "none"
        });

        fourthTl.to(".fifth-screen", {
            autoAlpha: 1,
            duration: 0.45,
            ease: "power1.inOut"
        }, "+=0.05");

        // Небольшой запас, чтобы пятый экран постоял до конца закрепления
        fourthTl.to({}, { duration: 0.3 });

        const fullLength = fourthTl.duration();

        // Плавно догоняем нужное время, как scrub: 1
        const scrubTo = (time) => {
            gsap.to(fourthTl, { time: time, duration: 1, ease: "power1.out", overwrite: true });
        };

        ScrollTrigger.create({
            trigger: fourthScreen,
            start: "top top",
            end: () => "+=" + (chatOpen ? fullLength : CARD_PART) * 100 + "%",
            pin: true,
            onUpdate: (self) => {
                scrubTo(Math.max(0, self.scroll() - self.start) / window.innerHeight);
            }
        });

        const readChatBtn = document.querySelector(".read-chat-btn");
        if (readChatBtn) {
            readChatBtn.addEventListener("click", () => {
                readChatBtn.closest(".story-card").classList.add("is-hidden");
                chatOpen = true;
                // Закрепление удлиняется, и скролл дальше ведёт переписку
                ScrollTrigger.refresh();
            });
        }
    }


    // 5. НАЖАТИЕ НА ГЕРОЯ: ОТКРЫВАЕМ ЭКРАНЫ КАНДИДАТОВ И ПЛАВНО ПРОКРУЧИВАЕМ
    // К НУЖНОМУ, КАК ПО ЯКОРЮ: men2 -> «Кандидат 1», girl3 -> «Кандидат 2», boy1 -> «Кандидат 3»

    document.querySelectorAll(".candidate-link").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelectorAll(".candidate-screen").forEach((screen) => {
                screen.classList.add("is-open");
            });
            ScrollTrigger.refresh();

            const target = document.querySelector(link.getAttribute("href"));
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY,
                behavior: "smooth"
            });
        });
    });


    // 6. ПЕРЕХОДЫ «КАНДИДАТ 1» -> ПАВЕЛ -> «КАНДИДАТ 2» -> ЕЛЕНА (+ ПАЗЛЫ) -> «КАНДИДАТ 3» -> МАРК:
    // ЗАТЕМНЕНИЕ И ВЫСВЕТЛЕНИЕ ПРИ СКРОЛЛЕ
    // Экран темнеет и уходит вверх уже чёрным; следующий въезжает чёрным, закрепляется
    // и высветляется. На стыке всё чёрное.
    // Экраны скрыты до нажатия на men2 — позиции пересчитает ScrollTrigger.refresh() там же

    const candidate1 = document.querySelector(".candidate-1-screen");
    const pavelScreen = document.querySelector(".pavel-screen");
    const candidate2 = document.querySelector(".candidate-2-screen");
    const elenaScreen = document.querySelector(".elena-screen");

    // Высветление экрана, который въехал чёрным: закрепляем и убираем пелену
    const fadeInOnPin = (screen) => {
        gsap.to(screen.querySelector(".screen-fade-in"), {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: screen,
                start: "top top",
                end: "+=60%",
                pin: true,
                scrub: 1
            }
        });
    };

    // Экран-заставка «Кандидат N» въехал чёрным: в одном закреплении высветляется,
    // стоит и снова темнеет перед экраном самого кандидата
    const fadeInHoldOut = (screen) => {
        const fade = screen.querySelector(".screen-fade");
        gsap.timeline({
            scrollTrigger: {
                trigger: screen,
                start: "top top",
                end: "+=120%",
                pin: true,
                scrub: 1
            }
        })
            .to(fade, { opacity: 0, duration: 0.4, ease: "none" })
            .to({}, { duration: 0.2 })
            .to(fade, { opacity: 1, duration: 0.4, ease: "none" });
    };

    if (candidate1 && pavelScreen && candidate2) {
        // «Кандидат 1» закрепляется и темнеет
        gsap.to(candidate1.querySelector(".screen-fade"), {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
                trigger: candidate1,
                start: "top top",
                end: "+=60%",
                pin: true,
                scrub: 1
            }
        });

        fadeInOnPin(pavelScreen);

        // Павел длиннее экрана, поэтому без закрепления: темнеет, пока его низ
        // поднимается до середины окна, — дальше снизу уже идёт чёрный «Кандидат 2»
        gsap.to(".pavel-fade-out", {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
                trigger: pavelScreen,
                start: "bottom bottom",
                end: "bottom 50%",
                scrub: 1
            }
        });

        fadeInHoldOut(candidate2);

        if (elenaScreen) fadeInOnPin(elenaScreen);

        // Экран с пазлами длиннее окна: темнеет без закрепления, пока его низ
        // поднимается до середины окна, — снизу уже идёт чёрный «Кандидат 3»
        const pazlScreen = document.querySelector(".pazl-screen");
        const candidate3 = document.querySelector(".candidate-3-screen");
        if (pazlScreen && candidate3) {
            gsap.to(".pazl-fade-out", {
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: pazlScreen,
                    start: "bottom bottom",
                    end: "bottom 50%",
                    scrub: 1
                }
            });

            fadeInHoldOut(candidate3);

            const boyScreen = document.querySelector(".boy-screen");
            if (boyScreen) fadeInOnPin(boyScreen);
        }
    }


    // 7. ПОП-АП «ПРИНЯТЬ РЕШЕНИЕ»: ВОПРОС -> «ДА» / «НЕТ»
    // Кнопка на плашке кандидата передаёт его имя в data-candidate — поп-ап показывает его тексты

    const popup = document.querySelector(".decision-popup");
    if (popup) {
        const openPopup = (candidate) => {
            popup.dataset.candidate = candidate;
            popup.dataset.state = "ask";
            popup.classList.add("is-open");
            popup.setAttribute("aria-hidden", "false");
        };

        const closePopup = () => {
            popup.classList.remove("is-open");
            popup.setAttribute("aria-hidden", "true");
        };

        document.querySelectorAll(".decision-open").forEach((btn) => {
            btn.addEventListener("click", () => openPopup(btn.dataset.candidate));
        });

        popup.querySelectorAll(".decision-yes").forEach((btn) => {
            btn.addEventListener("click", () => {
                popup.dataset.state = "yes";
            });
        });

        popup.querySelectorAll(".decision-no").forEach((btn) => {
            btn.addEventListener("click", () => {
                popup.dataset.state = "no";
            });
        });

        popup.querySelector(".decision-close").addEventListener("click", closePopup);

        // Клик по затемнению вне плашки закрывает поп-ап
        popup.addEventListener("click", (e) => {
            if (!e.target.closest(".decision-box")) closePopup();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && popup.classList.contains("is-open")) closePopup();
        });
    }


    // Смена плашек: первая плавно гаснет, вторая так же плавно проявляется на её месте
    function addSlideChange(timeline, cardSelector, at) {
        // Вторая начинает проявляться, когда первая почти погасла, чтобы тексты не наслаивались
        timeline.to(cardSelector + " .story-slide-1", {
            autoAlpha: 0,
            duration: 0.3,
            ease: "power1.in"
        }, at);

        timeline.fromTo(cardSelector + " .story-slide-2", {
            autoAlpha: 0
        }, {
            autoAlpha: 1,
            duration: 0.3,
            ease: "power1.out"
        }, at + 0.25);
    }

});
