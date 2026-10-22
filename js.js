window.addEventListener("load", () => {

    gsap.registerPlugin(ScrollTrigger);


    // 1. ЗУМ В БЕЙДЖИК: ПЕРВЫЙ ЭКРАН -> ВТОРОЙ ЭКРАН

    const stage = document.querySelector(".zoom-stage");
    if (stage) {
        let mm = gsap.matchMedia();

        // десктоп и планшет: зум в бейджик, затем затемнение
        mm.add("(min-width: 451px)", () => {
            // Во сколько раз Марк на zoom_boy.svg крупнее, чем на boy_with_box.svg
            const ZOOM = 3.293;
            const zoomEase = "power2.inOut";
            // Длина зума в таймлайне: чем меньше, тем быстрее зум при скролле
            const Z = 0.5;
            // Всё после зума сдвигается на столько же раньше
            const AFTER = Z - 1;

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: stage,
                    start: "top top",
                    end: "+=600%",
                    pin: true,
                    scrub: 1
                }
            });

            // Фон комнаты, заголовок и облака уходят в начале зума
            tl.to([".room", ".room-mobile", ".first-screen-text", ".thought"], {
                opacity: 0,
                duration: 0.3 * Z,
                ease: "none"
            }, 0);

            tl.to(".first-screen", {
                scale: ZOOM,
                duration: Z,
                ease: zoomEase
            }, 0);

            // Второй экран всё время совпадает с первым: в начале он уменьшен в ZOOM раз
            // вокруг той же точки и растёт с тем же ease, поэтому подмена картинки не видна
            tl.fromTo(".second-screen", {
                scale: 1 / ZOOM
            }, {
                scale: 1,
                duration: Z,
                ease: zoomEase
            }, 0);

            tl.to(".second-screen", {
                opacity: 1,
                duration: 0.3 * Z,
                ease: "power1.inOut"
            }, 0.65 * Z);

            // Убираем первый экран, когда второй уже почти непрозрачен,
            // чтобы его более толстые линии не выглядывали из-под zoom_boy
            tl.to([".first-screen .character", ".boy-mobile"], {
                opacity: 0,
                duration: 0.15 * Z,
                ease: "none"
            }, 0.85 * Z);

            tl.from(".badge", {
                opacity: 0,
                duration: 0.2 * Z,
                ease: "none"
            }, 0.9 * Z);


            // 2. ЗАТЕМНЕНИЕ И НАДПИСЬ «СПУСТЯ 2 МЕСЯЦА...»
            // Пауза после зума, чтобы успеть прочитать бейджик

            tl.to(".zoom-stage .blackout", {
                opacity: 1,
                duration: 0.35,
                ease: "power1.inOut"
            }, 1.5 + AFTER);

            tl.from(".zoom-stage .blackout-text", {
                opacity: 0,
                y: "2vw",
                duration: 0.3,
                ease: "power2.out"
            }, 1.85 + AFTER);



            // 3. ПРОЯВЛЕНИЕ ТРЕТЬЕГО ЭКРАНА ИЗ ТЕМНОТЫ
            // Надпись немного стоит, затем уходит, и экран светлеет

            tl.to(".zoom-stage .blackout-text", {
                opacity: 0,
                duration: 0.25,
                ease: "none"
            }, 2.4 + AFTER);

            tl.to(".third-screen", {
                autoAlpha: 1,
                duration: 0.45,
                ease: "power1.inOut"
            }, 2.6 + AFTER);

            // Первая плашка стоит, потом её плавно сменяет вторая
            addSlideChange(tl, ".story-card-search", 3.4 + AFTER);

            // Небольшой запас, чтобы вторая плашка постояла до конца закрепления
            tl.to({}, { duration: 0.3 });
        });

        // телефон: зума и второго экрана нет, после первого экрана сразу затемнение
        mm.add("(max-width: 450px)", () => {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: stage,
                    start: "top top",
                    end: "+=460%",
                    pin: true,
                    scrub: 1
                }
            });

            tl.to(".zoom-stage .blackout", {
                opacity: 1,
                duration: 0.35,
                ease: "power1.inOut"
            }, 0.2);

            tl.from(".zoom-stage .blackout-text", {
                opacity: 0,
                y: "2vw",
                duration: 0.3,
                ease: "power2.out"
            }, 0.55);

            tl.to(".zoom-stage .blackout-text", {
                opacity: 0,
                duration: 0.25,
                ease: "none"
            }, 1.1);

            tl.to(".third-screen", {
                autoAlpha: 1,
                duration: 0.45,
                ease: "power1.inOut"
            }, 1.3);

            addSlideChange(tl, ".story-card-search", 2.1);

            tl.to({}, { duration: 0.3 });
        });
    }


    // 4. ЧЕТВЁРТЫЙ ЭКРАН: ПЛАШКИ СМЕНЯЮТСЯ ПРИ СКРОЛЛЕ, ПО «ПРОЧИТАТЬ ПЕРЕПИСКУ»
    // СТОЛ С НОУТБУКОМ СРАЗУ ВЫДВИГАЮТСЯ ВПЕРЁД, А СООБЩЕНИЯ ВЫЕЗЖАЮТ ПРИ СКРОЛЛЕ
    // Одна шкала времени: 1 единица = 1 высота экрана скролла.
    // 0–1 — смена плашек, дальше — переписка. Пока кнопка не нажата,
    // закрепление длится только 1 экран, и страница дальше не листается.

    // позиция скролла, где полностью виден экран со скамейкой (заполняется ниже)
    let getBenchTop = () => null;

    const fourthScreen = document.querySelector(".fourth-screen");
    if (fourthScreen) {
        const CARD_PART = 1;
        let chatOpen = false;

        let fourthTl = gsap.timeline({ paused: true });

        addSlideChange(fourthTl, ".story-card-offer", 0.3);

        // Небольшой зазор после кнопки, затем переписка
        fourthTl.to({}, { duration: 0.3 }, CARD_PART);

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

        const fourthTrigger = ScrollTrigger.create({
            trigger: fourthScreen,
            start: "top top",
            end: () => "+=" + (chatOpen ? fullLength : CARD_PART) * 100 + "%",
            pin: true,
            onUpdate: (self) => {
                scrubTo(Math.max(0, self.scroll() - self.start) / window.innerHeight);
            }
        });

        // скамейка проявилась полностью незадолго до конца закрепления
        getBenchTop = () => fourthTrigger.start + (fullLength - 0.15) * window.innerHeight;

        const readChatBtn = document.querySelector(".read-chat-btn");
        if (readChatBtn) {
            readChatBtn.addEventListener("click", () => {
                readChatBtn.closest(".story-card").classList.add("is-hidden");
                // по этому классу на телефоне исчезают ноутбук и стол
                fourthScreen.classList.add("is-chat-open");
                chatOpen = true;
                // Закрепление удлиняется, и скролл дальше ведёт переписку
                ScrollTrigger.refresh();

                // на телефоне сцена не двигается — подсказка сразу
                if (window.matchMedia("(max-width: 450px)").matches) {
                    fourthScreen.classList.add("is-hint-visible");
                    return;
                }

                // стол с ноутбуком выдвигаются к центру и увеличиваются вокруг центра ноутбука
                // (41.46% 46.66% кадра); «листай вниз!» — когда уже выдвинулись
                gsap.to(".chat-scene", {
                    xPercent: 8.58,
                    yPercent: 3.65,
                    scale: 1.25,
                    transformOrigin: "41.46% 46.66%",
                    duration: 1,
                    ease: "power2.inOut",
                    onComplete: () => fourthScreen.classList.add("is-hint-visible")
                });
            });
        }
    }


    // 5. НАЖАТИЕ НА ГЕРОЯ: ОТКРЫВАЕМ ЭКРАНЫ КАНДИДАТОВ И ПЛАВНО ПРОКРУЧИВАЕМ
    // К НУЖНОМУ, КАК ПО ЯКОРЮ: men2 -> «Кандидат 1», girl3 -> «Кандидат 2», boy1 -> «Кандидат 3»

    // таймлайны «Кандидата 2» и «Кандидата 3», которые въезжают чёрными (заполняются в блоке 6)
    const candidateFades = new Map();

    document.querySelectorAll(".candidate-link").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelectorAll(".candidate-screen").forEach((screen) => {
                screen.classList.add("is-open");
            });
            ScrollTrigger.refresh();

            const target = document.querySelector(link.getAttribute("href"));
            const pageFade = document.querySelector(".page-fade");

            // экран, который въезжает чёрным, открываем посередине закрепления — там он уже высветлен
            const holdTl = candidateFades.get(target);
            let top = target.getBoundingClientRect().top + window.scrollY;
            if (holdTl) {
                const st = holdTl.scrollTrigger;
                top = st.start + (st.end - st.start) * 0.5;
            }

            // по приходу сразу доводим высветление до конца, без догоняющего scrub
            const showOpened = () => {
                if (!holdTl) return;
                ScrollTrigger.update();
                const scrubTween = holdTl.scrollTrigger.getTween();
                if (scrubTween) scrubTween.progress(1);
                holdTl.progress(holdTl.scrollTrigger.progress);
            };

            // на телефоне экран темнеет, страница переходит к кандидату и высветляется
            if (pageFade && window.matchMedia("(max-width: 450px)").matches) {
                gsap.to(pageFade, {
                    autoAlpha: 1,
                    duration: 0.4,
                    ease: "power1.inOut",
                    onComplete: () => {
                        window.scrollTo({ top: top, behavior: "instant" });
                        showOpened();
                        gsap.to(pageFade, { autoAlpha: 0, duration: 0.6, delay: 0.15, ease: "power1.inOut" });
                    }
                });
                return;
            }

            // на десктопе плавно, после остановки скролла экран уже открыт
            let arrived = false;
            const onArrive = () => {
                if (arrived) return;
                arrived = true;
                window.removeEventListener("scrollend", onArrive);
                showOpened();
            };
            window.addEventListener("scrollend", onArrive);
            if (!("onscrollend" in window)) setTimeout(onArrive, 1500);

            window.scrollTo({ top: top, behavior: "smooth" });
        });
    });


    // 5.1 КНОПКА «К СПИСКУ КАНДИДАТОВ»: ВИДНА НА ПОСЛЕДНЕМ ЭКРАНЕ КАЖДОГО КАНДИДАТА, ВОЗВРАЩАЕТ К СКАМЕЙКЕ

    const backBtn = document.querySelector(".back-btn");
    if (backBtn) {
        // кнопка видна только на последнем экране каждого кандидата:
        // у Павла — стикеры, у Елены — пазлы, у Марка — доска с фактами
        const lastZones = () => {
            const zones = [];
            const pavel = document.querySelector(".pavel-screen");
            const sticks = document.querySelectorAll(".pavel-screen .stick");
            if (pavel && sticks.length) {
                const top = Math.min(...[...sticks].map((el) => el.getBoundingClientRect().top));
                zones.push({ top: top, bottom: pavel.getBoundingClientRect().bottom });
            }
            document.querySelectorAll(".pazl-screen, .boy-last-screen").forEach((el) => {
                const r = el.getBoundingClientRect();
                zones.push({ top: r.top, bottom: r.bottom });
            });
            return zones;
        };

        // после стикеров и пазлов экран темнеет, и въезжает чёрный «Кандидат 2» / «Кандидат 3»:
        // кнопка остаётся, пока он не высветлится (до метки lit в его таймлайне)
        const isDarkTransition = () => [".candidate-2-screen", ".candidate-3-screen"].some((sel) => {
            const screen = document.querySelector(sel);
            const tl = screen && candidateFades.get(screen);
            if (!tl) return false;
            const litAt = tl.labels.lit / tl.duration();
            return screen.getBoundingClientRect().top < window.innerHeight && tl.scrollTrigger.progress < litAt;
        });

        // зона считается открытой, когда занимает середину окна
        const updateBackBtn = () => {
            const opened = document.querySelector(".candidate-screen.is-open");
            const h = window.innerHeight;
            const inZone = lastZones().some((z) => z.top < h * 0.6 && z.bottom > h * 0.4);
            backBtn.classList.toggle("is-visible", Boolean(opened && (inZone || isDarkTransition())));
        };
        window.addEventListener("scroll", updateBackBtn, { passive: true });
        window.addEventListener("resize", updateBackBtn);

        backBtn.addEventListener("click", () => {
            const benchTop = getBenchTop();
            if (benchTop === null) return;
            const pageFade = document.querySelector(".page-fade");

            // на телефоне, как и при переходе к кандидату, — через затемнение
            if (pageFade && window.matchMedia("(max-width: 450px)").matches) {
                gsap.to(pageFade, {
                    autoAlpha: 1,
                    duration: 0.4,
                    ease: "power1.inOut",
                    onComplete: () => {
                        window.scrollTo({ top: benchTop, behavior: "instant" });
                        gsap.to(pageFade, { autoAlpha: 0, duration: 0.6, delay: 0.15, ease: "power1.inOut" });
                    }
                });
                return;
            }

            window.scrollTo({ top: benchTop, behavior: "smooth" });
        });
    }


    // 6. ПЕРЕХОДЫ «КАНДИДАТ 1» -> ПАВЕЛ -> «КАНДИДАТ 2» -> ЕЛЕНА (+ ПАЗЛЫ) -> «КАНДИДАТ 3» -> МАРК:
    // ЗАТЕМНЕНИЕ И ВЫСВЕТЛЕНИЕ ПРИ СКРОЛЛЕ
    // Экран темнеет и уходит вверх уже чёрным; следующий въезжает чёрным, закрепляется
    // и высветляется. На стыке всё чёрное.
    // Экраны скрыты до нажатия на men2 — позиции пересчитает ScrollTrigger.refresh() там же

    const candidate1 = document.querySelector(".candidate-1-screen");
    const pavelScreen = document.querySelector(".pavel-screen");
    const candidate2 = document.querySelector(".candidate-2-screen");
    const elenaScreen = document.querySelector(".elena-screen");

    // Высветление экрана, который въехал чёрным: закрепляем и убираем пелену.
    // На телефоне экраны ниже окна и показываются целиком ещё до закрепления,
    // поэтому пелена уходит, пока экран въезжает, без закрепления
    const fadeInOnPin = (screen, phone) => {
        gsap.to(screen.querySelector(".screen-fade-in"), {
            opacity: 0,
            ease: "none",
            scrollTrigger: phone ? {
                trigger: screen,
                start: "top bottom",
                end: "top 35%",
                scrub: 0.5
            } : {
                trigger: screen,
                start: "top top",
                end: "+=60%",
                pin: true,
                scrub: 1
            }
        });
    };

    // Экран-заставка «Кандидат N» въехал чёрным: высветляется, стоит и снова темнеет
    // перед экраном самого кандидата. На десктопе всё в одном закреплении,
    // на телефоне высветление начинается, пока экран въезжает снизу
    const fadeInHoldOut = (screen, phone) => {
        const fade = screen.querySelector(".screen-fade");
        let tl;
        if (phone) {
            const h = () => window.innerHeight;
            ScrollTrigger.create({
                trigger: screen,
                start: "top top",
                end: "+=90%",
                pin: true
            });
            // от «верх на 65% окна» до конца закрепления: 0.65 окна въезда + 0.9 закрепления
            tl = gsap.timeline({
                scrollTrigger: {
                    trigger: screen,
                    start: "top 65%",
                    end: () => "+=" + h() * 1.55,
                    scrub: 0.5
                }
            })
                .to(fade, { opacity: 0, duration: 0.5, ease: "none" })
                .addLabel("lit")
                .to({}, { duration: 0.6 })
                .to(fade, { opacity: 1, duration: 0.45, ease: "none" });
        } else {
            tl = gsap.timeline({
                scrollTrigger: {
                    trigger: screen,
                    start: "top top",
                    end: "+=120%",
                    pin: true,
                    scrub: 1
                }
            })
                .to(fade, { opacity: 0, duration: 0.4, ease: "none" })
                .addLabel("lit")
                .to({}, { duration: 0.2 })
                .to(fade, { opacity: 1, duration: 0.4, ease: "none" });
        }
        candidateFades.set(screen, tl);
    };

    if (candidate1 && pavelScreen && candidate2) {
        const fadesMm = gsap.matchMedia();
        fadesMm.add({ phone: "(max-width: 450px)", desktop: "(min-width: 451px)" }, (ctx) => {
            const phone = ctx.conditions.phone;
            // на телефоне экран темнеет быстрее, чтобы следующий не ждал в чёрном
            const outEnd = phone ? "bottom 65%" : "bottom 50%";

            // «Кандидат 1» закрепляется и темнеет
            gsap.to(candidate1.querySelector(".screen-fade"), {
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: candidate1,
                    start: "top top",
                    end: phone ? "+=45%" : "+=60%",
                    pin: true,
                    scrub: phone ? 0.5 : 1
                }
            });

            fadeInOnPin(pavelScreen, phone);

            // Павел длиннее экрана, поэтому без закрепления: темнеет, пока его низ
            // поднимается к середине окна, — дальше снизу уже идёт чёрный «Кандидат 2»
            gsap.to(".pavel-fade-out", {
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: pavelScreen,
                    start: "bottom bottom",
                    end: outEnd,
                    scrub: phone ? 0.5 : 1
                }
            });

            fadeInHoldOut(candidate2, phone);

            if (elenaScreen) fadeInOnPin(elenaScreen, phone);

            // Экран с пазлами длиннее окна: темнеет без закрепления, пока его низ
            // поднимается к середине окна, — снизу уже идёт чёрный «Кандидат 3»
            const pazlScreen = document.querySelector(".pazl-screen");
            const candidate3 = document.querySelector(".candidate-3-screen");
            if (pazlScreen && candidate3) {
                gsap.to(".pazl-fade-out", {
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: pazlScreen,
                        start: "bottom bottom",
                        end: outEnd,
                        scrub: phone ? 0.5 : 1
                    }
                });

                fadeInHoldOut(candidate3, phone);

                const boyScreen = document.querySelector(".boy-screen");
                if (boyScreen) fadeInOnPin(boyScreen, phone);
            }
        });
    }


    // 6.1 ФАКТ КРУПНО: НАЖАТИЕ НА ПАЗЛ ИЛИ СТИКЕР ЗАТЕМНЯЕТ ЭКРАН И ПОКАЗЫВАЕТ ЕГО КРУПНО

    const factZoom = document.querySelector(".fact-zoom");
    if (factZoom) {
        const factBox = factZoom.querySelector(".fact-zoom-box");

        const openFact = (el) => {
            factBox.innerHTML = "";
            const [kind, num] = el.dataset.fact.split("-");

            if (kind === "stick") {
                // копия стикера со страницы: картинка и наклонённый текст
                const copy = el.cloneNode(true);
                copy.removeAttribute("data-fact");
                copy.removeAttribute("role");
                copy.removeAttribute("tabindex");
                factBox.append(copy);
            } else {
                // отдельный кусочек adaptive_pazlN и его текст одной строкой, без переносов страницы
                const piece = document.createElement("div");
                piece.className = "zoom-pazl zoom-pazl-" + num;
                const img = document.createElement("img");
                img.src = "./img/adaptive_pazl" + num + ".svg";
                img.alt = "";
                const text = document.createElement("p");
                text.className = "zoom-pazl-text";
                text.textContent = el.querySelector(".pazl-text").textContent.replace(/\s+/g, " ").trim();
                piece.append(img, text);
                factBox.append(piece);
            }

            factZoom.classList.add("is-open");
            factZoom.setAttribute("aria-hidden", "false");
        };

        const closeFact = () => {
            factZoom.classList.remove("is-open");
            factZoom.setAttribute("aria-hidden", "true");
        };

        document.querySelectorAll("[data-fact]").forEach((el) => {
            el.addEventListener("click", () => openFact(el));
            el.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openFact(el);
                }
            });
        });

        // закрывается нажатием в любом месте затемнения (и на крестик) или Esc
        factZoom.addEventListener("click", closeFact);
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && factZoom.classList.contains("is-open")) closeFact();
        });
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
        // на телефоне первая плашка остаётся, а вторая появляется под ней
        if (!window.matchMedia("(max-width: 450px)").matches) {
            // Вторая начинает проявляться, когда первая почти погасла, чтобы тексты не наслаивались
            timeline.to(cardSelector + " .story-slide-1", {
                autoAlpha: 0,
                duration: 0.3,
                ease: "power1.in"
            }, at);
        }

        timeline.fromTo(cardSelector + " .story-slide-2", {
            autoAlpha: 0
        }, {
            autoAlpha: 1,
            duration: 0.3,
            ease: "power1.out"
        }, at + 0.25);
    }

});
