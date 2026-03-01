// ============================================================
//  FitQuest SaaS — Game Configuration & Logic Engine
// ============================================================

const GameConfig = {
    BASE_XP: 100,
    XP_MULTIPLIER: 1.45,

    // Quest categories
    CATEGORIES: [
        { id: 'all', label: 'Все', icon: '⚡' },
        { id: 'workout', label: 'Тренировка', icon: '🔥' },
        { id: 'hydration', label: 'Гидрация', icon: '💧' },
        { id: 'sleep', label: 'Сон', icon: '🌙' },
        { id: 'nutrition', label: 'Питание', icon: '🥗' },
        { id: 'cardio', label: 'Кардио', icon: '🏃' },
        { id: 'strength', label: 'Сила', icon: '🏋️' },
        { id: 'recovery', label: 'Восстановление', icon: '🧘' },
        { id: 'mindset', label: 'Майндсет', icon: '🧠' },
    ],

    // 35 quests across all categories — each with a real expert tip
    QUEST_POOL: [
        // === WORKOUTS OF THE DAY (HIGH XP, REAL ROUTINES) ===
        {
            id: 'wod_fullbody_1',
            category: 'workout',
            title: '🔥 Тренировка: Фулбоди с весом тела',
            desc: 'Базовая программа для всего тела: присед, отжимания, пресс',
            icon: '🦍',
            difficulty: 'hard',
            xp: 150,
            gold: 75,
            tip: {
                title: '🦍 Тренировка Дня: Фулбоди 30 мин',
                body: 'Выполни 4 круга без отдыха (отдых 1 мин между кругами): 15 приседаний, 10-15 отжиманий от пола (или с колен), 15 скручиваний на пресс, 30 сек планка. Эта тренировка задействует 80% мышц, повышает тестостерон и ускоряет метаболизм на 24 часа. Сохраняй темп!',
            }
        },
        {
            id: 'wod_legs_core',
            category: 'workout',
            title: '🔥 Тренировка: Железные ноги и Кор',
            desc: 'Взрывная тренировка на низ тела + глубокие мышцы пресса',
            icon: '🦵',
            difficulty: 'medium',
            xp: 120,
            gold: 60,
            tip: {
                title: '🦵 Тренировка Дня: Ноги + Пресс',
                body: 'Работай в формате суперсетов (2 упражнения подряд без отдыха): Суперсет 1 (Выпады по 12 на ногу + 20 скручиваний) х3 круга. Суперсет 2 (Ягодичный мостик 15 раз + Планка 45 сек) х3 круга. Ноги — самая большая мышечная группа, поэтому это сильнейший стимул для жиросжигания.',
            }
        },
        {
            id: 'wod_hiit_fatburn',
            category: 'workout',
            title: '🔥 Тренировка: Жиросжигающий HIIT',
            desc: 'Максимальный пульс и море пота за 20 минут',
            icon: '⚡',
            difficulty: 'hard',
            xp: 200,
            gold: 100,
            tip: {
                title: '⚡ Тренировка Дня: Убойный HIIT',
                body: 'Схема "Табата": 20 сек работы / 10 сек отдых. Упражнения: 1. Бёрпи. 2. Бег на месте с высоким подниманием колен. 3. Прыжки "Джеки". 4. Альпинист (бег в планке). Выполни по 2 раунда каждого упр-я в круге, всего 3 круга. Эффект "дожигания" калорий продлится весь следующий день!',
            }
        },
        {
            id: 'wod_chest_back',
            category: 'workout',
            title: '🔥 Тренировка: Широкая спина и грудь',
            desc: 'Антагонисты верха тела: тяни-толкай',
            icon: '💪',
            difficulty: 'hard',
            xp: 140,
            gold: 70,
            tip: {
                title: '💪 Тренировка Дня: Грудь + Спина',
                body: 'Чередуем жимовые и тяговые движения. Если есть турник: 5-8 подтягиваний (или австралийские подтягивания) чередуем с 15 отжиманиями. 4 подхода. Овальная тренировка верха сделает осанку ровной (тяга) и прокачает объемы (жим). Отдыхай 90 секунд между подходами.',
            }
        },
        {
            id: 'wod_cardio_5k',
            category: 'workout',
            title: '🔥 Тренировка: Кардио забег 5км',
            desc: 'Бег, эллипс или быстрая ходьба на дистанцию',
            icon: '🏃',
            difficulty: 'hard',
            xp: 160,
            gold: 80,
            tip: {
                title: '🏃 Тренировка Дня: Гонка на 5км',
                body: 'Задача — преодолеть 5 километров самым быстрым для тебя способом (бег > велосипед > эллипс > ходьба). Держи пульс в зоне 130-150 ударов в минуту. Это тренировка сердца (гипертрофия левого желудочка) и прямой удар по висцеральному жиру.',
            }
        },
        {
            id: 'wod_abs_15m',
            category: 'workout',
            title: '🔥 Тренировка: Идеальный пресс',
            desc: 'Специальная программа на кубики и удержание корсета',
            icon: '🎯',
            difficulty: 'medium',
            xp: 100,
            gold: 50,
            tip: {
                title: '🎯 Тренировка Дня: 15 минут пресса',
                body: '1 мин работы на каждое: 1. Обычные скручивания. 2. Велосипед (локоть к колену). 3. Подъём ног лежа. 4. Русские скручивания (касание пола сбоку). 5. Планка на локтях. Повторить цикл 3 раза (строго без отдыха между упражнениями, только между циклами по 30 сек). Будет гореть!',
            }
        },
        {
            id: 'wod_functional',
            category: 'workout',
            title: '🔥 Тренировка: Звериная функциональность',
            desc: 'Сложные координационные движения и баланс',
            icon: '🤸‍♂️',
            difficulty: 'hard',
            xp: 180,
            gold: 90,
            tip: {
                title: '🤸‍♂️ Тренировка Дня: Зверобаза',
                body: '30 сек ходьба медведем (на прямых руках и ногах), 15 выпрыгиваний из приседа, 20 выпадов с прыжком (прыжком меняем ногу). 4 круга. Такие функциональные движения тренируют фасции, ловкость, ЦНС и связки. Подходит для тех, кто хочет не просто выглядеть круто, но и двигаться так же.',
            }
        },

        // === HYDRATION ===
        {
            id: 'water_2l',
            category: 'hydration',
            title: 'Выпить 2 литра воды',
            desc: 'Базовая норма для большинства людей в обычный день',
            icon: '💧',
            difficulty: 'easy',
            xp: 20,
            gold: 10,
            tip: {
                title: '💧 Почему 2 литра?',
                body: 'Вода участвует в каждой метаболической реакции тела. Даже 2% обезвоживание снижает когнитивные функции на 20% и физическую силу на 7%. Лучше всего — пить по стакану каждые 90 минут, не дожидаясь жажды. Холодная вода (15°C) ускоряет всасывание, а тёплая — лучше для пищеварения.',
            }
        },
        {
            id: 'water_3l',
            category: 'hydration',
            title: 'Выпить 3 литра воды',
            desc: 'Повышенная норма в тренировочный день',
            icon: '🌊',
            difficulty: 'medium',
            xp: 35,
            gold: 18,
            tip: {
                title: '🌊 Повышенная гидрация в тренировочный день',
                body: 'В дни интенсивных тренировок потребность воды вырастает на 0.5–1л на каждый час активности. Добавьте щепотку морской соли или электролиты — это помогает удерживать жидкость в клетках и предотвращает судороги мышц.',
            }
        },
        {
            id: 'no_soda',
            category: 'hydration',
            title: 'Ни капли газировки',
            desc: 'Вместо сладких напитков — только вода, чай, кофе',
            icon: '🚫',
            difficulty: 'medium',
            xp: 30,
            gold: 15,
            tip: {
                title: '🥤 Скрытый сахар в напитках',
                body: 'Банка Cola (330 мл) = 35г сахара = 140 ккал пустых калорий. Сладкие напитки — главный источник избыточных калорий. Замените газировку на воду с лимоном или газированную воду без сахара. За 30 дней это даст дефицит ~4000 ккал — почти -500г жира.',
            }
        },
        {
            id: 'morning_water',
            category: 'hydration',
            title: 'Стакан воды утром натощак',
            desc: 'Запустить метаболизм первым делом после пробуждения',
            icon: '☀️',
            difficulty: 'easy',
            xp: 15,
            gold: 8,
            tip: {
                title: '☀️ Утренний запуск организма',
                body: 'За ночь тело теряет 300–500мл воды через дыхание и pot. Стакан воды утром реактивирует метаболизм, запускает выработку желудочного сока и помогает проснуться лучше, чем кофе. Добавьте сок лимона — получите витамин C и улучшите всасывание железа из завтрака.',
            }
        },

        // === SLEEP ===
        {
            id: 'sleep_8h',
            category: 'sleep',
            title: 'Сон 8 часов',
            desc: 'Оптимальное время сна для восстановления и похудения',
            icon: '🌙',
            difficulty: 'medium',
            xp: 40,
            gold: 20,
            tip: {
                title: '🌙 Сон = суперсила для похудения',
                body: 'Недосыпание на 1 час повышает грелин (гормон голода) на 15% и снижает лептин (гормон сытости). Результат: +300–500 ккал в виде тяги к сладкому на следующий день. Также во сне вырабатывается гормон роста — главный жиросжигатель тела. 8 часов сна = часть тренировки.',
            }
        },
        {
            id: 'sleep_schedule',
            category: 'sleep',
            title: 'Лечь до 23:00',
            desc: 'Соблюдать циркадный ритм для качественного сна',
            icon: '🕙',
            difficulty: 'medium',
            xp: 35,
            gold: 18,
            tip: {
                title: '⏰ Циркадный ритм — твой главный союзник',
                body: 'С 22:00 до 02:00 — пик выработки мелатонина и гормона роста. Если не спишь в это время, ты теряешь именно этот ценный период восстановления. Установите "цифровой комендантский час" за 30 минут до сна: никаких экранов, только книга или подкаст.',
            }
        },
        {
            id: 'no_phone',
            category: 'sleep',
            title: 'Телефон за 1ч до сна',
            desc: 'Убрать экраны минимум за час до отхода ко сну',
            icon: '📵',
            difficulty: 'hard',
            xp: 45,
            gold: 22,
            tip: {
                title: '📵 Синий свет — враг мелатонина',
                body: 'Синий свет смартфонов подавляет выработку мелатонина до 3 часов. Включите Night Mode или используйте очки с блокировкой синего света. Замените вечерний скроллинг на растяжку, медитацию или ведение дневника — это также снижает кортизол перед сном.',
            }
        },
        {
            id: 'meditation',
            category: 'sleep',
            title: '10 минут медитации перед сном',
            desc: 'Снизить стресс и подготовить нервную систему ко сну',
            icon: '🧘',
            difficulty: 'easy',
            xp: 25,
            gold: 12,
            tip: {
                title: '🧘 Медитация снижает кортизол',
                body: 'Регулярная медитация снижает уровень кортизола (гормона стресса) на 25–30%. Высокий кортизол = накопление жира в зоне живота. Попробуйте технику "4-7-8": вдох 4 секунды, задержка 7, выдох 8. Уже через 10 минут частота сердцебиения снижается на 10–15 уд/мин.',
            }
        },

        // === NUTRITION ===
        {
            id: 'calorie_deficit',
            category: 'nutrition',
            title: 'Считал калории + дефицит',
            desc: 'Быть в дефиците 300–500 ккал от нормы TDEE',
            icon: '📊',
            difficulty: 'medium',
            xp: 60,
            gold: 30,
            tip: {
                title: '📊 Дефицит калорий — единственный способ похудеть',
                body: 'Физика неизменна: чтобы терять жир, нужно тратить больше, чем потреблять. Оптимальный дефицит — 300–500 ккал/день (потеря 0.3–0.5 кг в неделю). Слишком большой дефицит (>1000 ккал) запускает катаболизм мышц. Используйте TDEE-калькулятор (TDEE.cc) для расчёта своей нормы.',
            }
        },
        {
            id: 'protein_goal',
            category: 'nutrition',
            title: 'Норма белка: 1.8–2г/кг',
            desc: 'Съесть достаточно белка для сохранения мышц',
            icon: '🥩',
            difficulty: 'medium',
            xp: 50,
            gold: 25,
            tip: {
                title: '🥩 Белок — краеугольный камень похудения',
                body: 'Белок сохраняет мышечную массу при дефиците, даёт насыщение на 2–3 часа и тратит 25–30% своих калорий на переваривание (термический эффект). На 1кг веса — 1.8–2г белка. Источники: куриная грудка (30г/100г), творог (18г/100г), рыба (20–25г/100г), яйца (6г/яйцо).',
            }
        },
        {
            id: 'no_snacks',
            category: 'nutrition',
            title: 'Без сладких снеков весь день',
            desc: 'Избежать печений, шоколадок, чипсов и подобного',
            icon: '🙅',
            difficulty: 'hard',
            xp: 55,
            gold: 28,
            tip: {
                title: '🍫 Как бороться с тягой к сладкому',
                body: 'Тяга к сахару — чаще сигнал обезвоженности или недостатка белка. Лайфхак: съешьте 20г протеина при первом позыве к сладкому, и тяга пройдёт через 15 минут. Также помогает горький шоколад 85%+ (2 дольки), греческий йогурт или горсть орехов как альтернатива.',
            }
        },
        {
            id: 'vegetables',
            category: 'nutrition',
            title: '5 порций овощей/фруктов',
            desc: 'Набрать норму клетчатки и микронутриентов',
            icon: '🥦',
            difficulty: 'medium',
            xp: 35,
            gold: 18,
            tip: {
                title: '🥦 Клетчатка — невидимый суперфуд',
                body: 'Клетчатка замедляет всасывание сахара, кормит полезные бактерии кишечника и создаёт чувство сытости без калорий. Норма — 25–35г/день. 1 порция = ваша ладонь овощей. Брокколи, шпинат, огурцы, помидоры — идеальные варианты для тех, кто в дефиците.',
            }
        },
        {
            id: 'no_late',
            category: 'nutrition',
            title: 'Последний приём пищи до 20:00',
            desc: 'Соблюдать интервал между ужином и сном',
            icon: '🕗',
            difficulty: 'medium',
            xp: 40,
            gold: 20,
            tip: {
                title: '⏰ Поздние приёмы пищи и жир',
                body: 'Дело не в "волшебном" ночном жиронакоплении — суть в том, что поздние перекусы обычно превышают дневной лимит калорий. Если ужинаете в 20:00, а завтракаете в 8:00 — у вас уже 12-часовое голодание. Это улучшает чувствительность к инсулину и ростовому гормону без строгого IF.',
            }
        },
        {
            id: 'meal_prep',
            category: 'nutrition',
            title: 'Приготовить еду заранее (мил-преп)',
            desc: 'Подготовить порции на 2–3 дня вперёд',
            icon: '🍱',
            difficulty: 'hard',
            xp: 70,
            gold: 35,
            tip: {
                title: '🍱 Мил-преп = ваша суперсила',
                body: 'Люди, которые готовят еду заранее, потребляют в среднем на 250 ккал меньше в день, потому что не делают спонтанных выборов в голодном состоянии. Воскресенье: 1 час на кухне → куриные грудки, варёная картошка, нарезанные овощи = готовые обеды на пн-ср.',
            }
        },

        // === CARDIO ===
        {
            id: 'steps_10k',
            category: 'cardio',
            title: '10 000 шагов',
            desc: 'Дневная норма активных шагов',
            icon: '🚶',
            difficulty: 'medium',
            xp: 50,
            gold: 25,
            tip: {
                title: '🚶 Ходьба — недооценённый жиросжигатель',
                body: '10 000 шагов сжигают 300–500 ккал (в зависимости от веса) без роста аппетита. В отличие от интенсивного кардио, ходьба не повышает кортизол и не усиливает голод. Пройдите пешком вместо метро одну остановку, ходите во время звонков — это легко набрать без "тренировки".',
            }
        },
        {
            id: 'cardio_30',
            category: 'cardio',
            title: '30 минут зон-2 кардио',
            desc: 'Умеренный темп: можно разговаривать, но трудновато',
            icon: '🏃',
            difficulty: 'medium',
            xp: 60,
            gold: 30,
            tip: {
                title: '❤️ Зона 2 — золотая зона жиросжигания',
                body: '"Зона 2" — 60–70% от max ЧСС (220 - ваш возраст). В этой зоне тело использует преимущественно жир как топливо. Её легко определить: вы дышите тяжелее, но можете произнести фразу. 30 мин пешей прогулки быстрым шагом, езда на велосипеде или бег трусцой — всё это зона 2.',
            }
        },
        {
            id: 'hiit',
            category: 'cardio',
            title: 'HIIT тренировка 20 минут',
            desc: 'Высокоинтенсивный интервальный тренинг',
            icon: '⚡',
            difficulty: 'hard',
            xp: 80,
            gold: 40,
            tip: {
                title: '⚡ HIIT: эффект дожигания жира (EPOC)',
                body: 'HIIT создаёт кислородный долг — EPOC (Excess Post-Exercise Oxygen Consumption). Тело продолжает сжигать калории повышенными темпами ещё 12–24 часа после тренировки. Схема: 30 сек максимум, 30 сек отдых, повторить 8–10 раз. Можно с бёрпи, прыжками, беговыми интервалами. Только не чаще 3 раз в неделю.',
            }
        },
        {
            id: 'swim',
            category: 'cardio',
            title: 'Поплавать 30+ минут',
            desc: 'Отличное кардио с минимальной нагрузкой на суставы',
            icon: '🏊',
            difficulty: 'medium',
            xp: 65,
            gold: 32,
            tip: {
                title: '🏊 Плавание — идеально для суставов',
                body: 'Плавание сжигает 400–700 ккал/час без ударной нагрузки на суставы. Вода создаёт сопротивление по всему телу, тренируя сразу 85% мышц. Особенно эффективно при проблемах с коленями или лишнем весе >100 кг, когда бег травмоопасен.',
            }
        },
        {
            id: 'cycling',
            category: 'cardio',
            title: 'Велопрогулка 45+ минут',
            desc: 'Езда на велосипеде или велотренажёре',
            icon: '🚴',
            difficulty: 'medium',
            xp: 60,
            gold: 30,
            tip: {
                title: '🚴 Велосипед: кардио без ударной нагрузки',
                body: 'Езда на велосипеде задействует квадрицепсы, ягодицы и кор. 45 минут в среднем темпе = 350–550 ккал. Важный момент: правильная высота сиденья (нога почти прямая в нижней точке) снижает риск болей в коленях. Добавьте подъёмы в горку для силового эффекта.',
            }
        },

        // === STRENGTH ===
        {
            id: 'gym',
            category: 'strength',
            title: 'Тренировка в зале',
            desc: 'Полноценная силовая тренировка 45–60 минут',
            icon: '🏋️',
            difficulty: 'hard',
            xp: 100,
            gold: 50,
            tip: {
                title: '💪 Мышцы — твоя фабрика жиросжигания',
                body: '1 кг мышц сжигает 13 ккал в покое в день vs 4 ккал для жира. Силовые тренировки повышают базальный обмен на 7–9%. Сосредоточьтесь на базовых упражнениях: присед, становая тяга, жим, подтягивания — они задействуют максимум мышечных групп и гормонального ответа.',
            }
        },
        {
            id: 'pushups_50',
            category: 'strength',
            title: '50 отжиманий (суммарно)',
            desc: 'Набрать 50 отжиманий любым разбивкой',
            icon: '💪',
            difficulty: 'medium',
            xp: 45,
            gold: 22,
            tip: {
                title: '💪 Прокачать грудь и трицепс без зала',
                body: 'Отжимания — одно из лучших упражнений для верха тела. Если сложно от пола — начните с наклонных (руки на журнальный стол). Ключ к прогрессу: каждую неделю добавляйте 5 повторений. Через 8 недель большинство людей переходят от 0 до 50+ подряд.',
            }
        },
        {
            id: 'squats_100',
            category: 'strength',
            title: '100 приседаний',
            desc: 'Набрать 100 приседаний с собственным весом',
            icon: '🦵',
            difficulty: 'medium',
            xp: 50,
            gold: 25,
            tip: {
                title: '🦵 Ноги — треть всей мышечной массы',
                body: 'Ноги — самая большая мышечная группа. Их тренировка создаёт максимальный гормональный ответ (тестостерон, гормон роста). Техника: стопы чуть шире плеч, колени не заходят за носки, спина прямая. Добавьте пульсирующие приседания для жжения.',
            }
        },
        {
            id: 'plank_3min',
            category: 'strength',
            title: 'Планка суммарно 3 минуты',
            desc: 'Удержать планку три минуты (можно несколько подходов)',
            icon: '🎯',
            difficulty: 'medium',
            xp: 40,
            gold: 20,
            tip: {
                title: '🎯 Планка формирует стальной кор',
                body: 'Планка тренирует поперечную мышцу живота — глубокий слой, который "втягивает" живот. 3 минуты в планке эффективнее 100 скручиваний для формирования плоского живота. Усложнение: поднимите попеременно ноги или добавьте боковую планку.',
            }
        },
        {
            id: 'pullups',
            category: 'strength',
            title: '10 подтягиваний',
            desc: 'Подтягивания на турнике или в зале',
            icon: '🤸',
            difficulty: 'hard',
            xp: 70,
            gold: 35,
            tip: {
                title: '🤸 Подтягивания — король упражнений',
                body: 'Подтягивания — лучший показатель функциональной силы. Если пока не можете — используйте резинку для вспомогательного веса. Техника: лопатки опустите вниз ещё до подъёма, тяните "локти в бёдра", не качайтесь. За 2 месяца реально начать с 0 до 5 чистых подтягиваний.',
            }
        },
        {
            id: 'home_workout',
            category: 'strength',
            title: 'Домашняя тренировка 25 минут',
            desc: 'Табата, круговая или HIIT-тренировка дома',
            icon: '🏠',
            difficulty: 'easy',
            xp: 40,
            gold: 20,
            tip: {
                title: '🏠 Зал дома: без оборудования',
                body: 'Отжимания + приседания + планка + берпи — этого достаточно для полноценной тренировки. Схема табата: 20 секунд работы / 10 секунд отдых / 8 раундов = 4 минуты одного упражнения. 4-5 упражнений = 20 минут эффективной тренировки всего тела.',
            }
        },

        // === RECOVERY ===
        {
            id: 'stretching',
            category: 'recovery',
            title: 'Растяжка 15 минут',
            desc: 'Статическая или динамическая растяжка',
            icon: '🤸‍♀️',
            difficulty: 'easy',
            xp: 25,
            gold: 12,
            tip: {
                title: '🤸‍♀️ Растяжка ускоряет восстановление',
                body: 'Растяжка после тренировки снижает концентрацию молочной кислоты и ускоряет восстановление на 20–30%. Держите каждое растяжение 30–60 секунд (не пульсируйте!). Уделите внимание бёдрам и грудным — это самые зажатые зоны у большинства людей.',
            }
        },
        {
            id: 'cold_shower',
            category: 'recovery',
            title: 'Контрастный душ',
            desc: '1 мин горячий — 1 мин холодный, 3 цикла',
            icon: '🚿',
            difficulty: 'hard',
            xp: 50,
            gold: 25,
            tip: {
                title: '🚿 Холодный душ и иммунная система',
                body: 'Контрастный душ повышает уровень норэпинефрина на 300%, что улучшает настроение и концентрацию. Также ускоряет кровоток в мышцах и снижает воспаление после тренировок (аналог ванны со льдом). Начните с 15 секунд холодной воды и увеличивайте каждую неделю.',
            }
        },
        {
            id: 'foam_roller',
            category: 'recovery',
            title: 'Самомассаж роллером 10 минут',
            desc: 'Миофасциальный релиз для болящих мышц',
            icon: '🔵',
            difficulty: 'easy',
            xp: 30,
            gold: 15,
            tip: {
                title: '🔵 Роллер = доступный массаж',
                body: 'Миофасциальный релиз роллером разрушает спайки в фасции и восстанавливает нормальную длину мышечного волокна. Медленно катайте по мышце, найдите болезненную точку и удержите давление 20–30 секунд. ИТ-тракт, икры, грудной отдел спины — приоритетные зоны.',
            }
        },
        {
            id: 'walk_nature',
            category: 'recovery',
            title: 'Прогулка на свежем воздухе 30 мин',
            desc: 'Активное восстановление и витамин D',
            icon: '🌿',
            difficulty: 'easy',
            xp: 25,
            gold: 12,
            tip: {
                title: '🌿 Природа снижает кортизол',
                body: 'Исследования показывают, что 20 минут среди деревьев снижают кортизол и адреналин значительно сильнее, чем прогулка по улице города. Витамин D, синтезируемый под солнцем, критичен для жиросжигания — его дефицит напрямую коррелирует с ожирением.',
            }
        },

        // === MINDSET ===
        {
            id: 'journal',
            category: 'mindset',
            title: 'Вести дневник прогресса',
            desc: 'Записать еду, тренировку и самочувствие',
            icon: '📓',
            difficulty: 'easy',
            xp: 20,
            gold: 10,
            tip: {
                title: '📓 Дневник = зеркало прогресса',
                body: 'Люди, ведущие пищевой дневник, худеют вдвое быстрее, чем те, кто не ведёт. Дело не в том, чтобы идеально записать — а в том, что ты осознаёшь свои выборы. Даже 5 минут вечером: "что съел, как тренировался, как чувствую себя" — этого достаточно.',
            }
        },
        {
            id: 'progress_photo',
            category: 'mindset',
            title: 'Фото прогресса (еженедельно)',
            desc: 'Сделать фото тела в одинаковом ракурсе',
            icon: '📸',
            difficulty: 'easy',
            xp: 25,
            gold: 12,
            tip: {
                title: '📸 Фото точнее весов',
                body: 'Вес на весах колеблется на 1–3 кг в зависимости от воды, соли и времени дня. Фото в один и тот же день недели, в одно время, при одном освещении — честное отражение прогресса. Через 4–6 недель изменения станут очевидны даже там, где весы "не двигались".',
            }
        },
        {
            id: 'no_binge',
            category: 'mindset',
            title: 'Не переел (без зажора)',
            desc: 'Остановиться в пределах своего дневного лимита',
            icon: '🧘',
            difficulty: 'hard',
            xp: 60,
            gold: 30,
            tip: {
                title: '🍽️ Как остановить переедание перед оно началось',
                body: 'Зажоры часто запускаются не реальным голодом, а эмоциями (скука, стресс) или "а вот теперь всё равно" после первого нарушения. Правило 80%: остановитесь, когда наелись на 80%. Мозгу нужно 20 минут, чтобы получить сигнал сытости. Ешьте медленно, без телефона.',
            }
        },
        {
            id: 'visualize',
            category: 'mindset',
            title: 'Визуализация цели 5 минут',
            desc: 'Живо представить себя с достигнутым результатом',
            icon: '🎯',
            difficulty: 'easy',
            xp: 15,
            gold: 8,
            tip: {
                title: '🎯 Нейронауки о визуализации',
                body: 'Мозг не различает яркое воображение от реального опыта — активируются те же нейронные цепи. Спортивные психологи сборных используют визуализацию как часть подготовки. Закройте глаза на 5 минут и детально представьте себя в целевом теле: что надеваете, как двигаетесь, как себя чувствуете.',
            }
        },
        {
            id: 'gratitude',
            category: 'mindset',
            title: '3 благодарности телу',
            desc: 'Записать 3 вещи, за которые благодарен своему телу',
            icon: '💙',
            difficulty: 'easy',
            xp: 15,
            gold: 8,
            tip: {
                title: '💙 Принятие тела ускоряет прогресс',
                body: 'Ненависть к своему телу — плохой мотиватор. Она создаёт стресс и часто ведёт к компенсаторному перееданию. Исследования показывают: люди с body-позитивным отношением к себе лучше придерживаются плана питания и чаще достигают цели. Запишите: "Я благодарен за то, что мои ноги несут меня" и т.д.',
            }
        },
    ],

    // Massive Rank progression up to Level 100
    RANKS: [
        { level: 1, title: 'Ленивый Кот 🐱', color: '#94a3b8' },
        { level: 3, title: 'Пробудившийся 🥱', color: '#cbd5e1' },
        { level: 5, title: 'Новичок на старте 🔰', color: '#4ade80' },
        { level: 8, title: 'Упорный Искатель 🧭', color: '#22c55e' },
        { level: 12, title: 'Ученик Зала 🥈', color: '#60a5fa' },
        { level: 15, title: 'Адепт Дисциплины ⏱️', color: '#3b82f6' },
        { level: 18, title: 'Разрушитель Леней 🔨', color: '#2563eb' },
        { level: 22, title: 'Железный Любитель 🏋️', color: '#facc15' },
        { level: 26, title: 'Опытный Атлет 🥇', color: '#f59e0b' },
        { level: 30, title: 'Воин Света ⚔️', color: '#d97706' },
        { level: 35, title: 'Мастер Стали 🗡️', color: '#a78bfa' },
        { level: 40, title: 'Архитектор Тела 📐', color: '#8b5cf6' },
        { level: 45, title: 'Гладиатор Арены 🏺', color: '#7c3aed' },
        { level: 50, title: 'Элита Фитнеса 💎', color: '#ec4899' },
        { level: 55, title: 'Киборг без устали 🤖', color: '#db2777' },
        { level: 60, title: 'Спартанец 🛡️', color: '#be185d' },
        { level: 65, title: 'Вестник Рельефа ⚡', color: '#f43f5e' },
        { level: 70, title: 'Титан Зала 🪨', color: '#e11d48' },
        { level: 75, title: 'Амбассадор Силы 🦾', color: '#be123c' },
        { level: 80, title: 'Легенда Спорта 🌠', color: '#0ea5e9' },
        { level: 85, title: 'Полубог Выносливости 🔥', color: '#f97316' },
        { level: 90, title: 'Олимпиец 🏔️', color: '#ea580c' },
        { level: 95, title: 'Владыка Метаболизма 👑', color: '#c2410c' },
        { level: 100, title: 'Бог Мистера Олимпии 🏆', color: '#ef4444' },
    ],

    // Enhanced Shop
    REWARDS: [
        { id: 'cheat_meal', title: 'Чит-мил 🍔', desc: 'Один приём пищи без подсчёта калорий', cost: 300, icon: '🍔', category: 'fun' },
        { id: 'rest_day', title: 'День отдыха 🛋️', desc: 'Официальный выходной без квестов', cost: 150, icon: '🛋️', category: 'fun' },
        { id: 'dessert', title: 'Любимый десерт 🍰', desc: 'Побалуйте себя заслуженным лакомством', cost: 200, icon: '🍰', category: 'fun' },
        { id: 'movie_night', title: 'Киновечер 🎬', desc: 'Вечер кино без чувства вины', cost: 100, icon: '🎬', category: 'fun' },
        { id: 'new_gear', title: 'Спортивная шмотка 👟', desc: 'Купите себе новую спортивную вещь', cost: 800, icon: '👟', category: 'upgrade' },
        { id: 'massage', title: 'Массаж 💆', desc: 'Заслуженный сеанс спортивного массажа', cost: 600, icon: '💆', category: 'upgrade' },
        { id: 'supplement', title: 'Протеин/добавки 🧪', desc: 'Позвольте себе купить протеин или BCAA', cost: 500, icon: '🧪', category: 'upgrade' },
        { id: 'sauna', title: 'Поход в баню/сауну 🔥', desc: 'Расслабление и восстановление в сауне', cost: 400, icon: '🔥', category: 'upgrade' },
        { id: 'class', title: 'Групповой класс 🤸', desc: 'Попробуйте новый формат: йога, бокс, пилатес', cost: 350, icon: '🤸', category: 'upgrade' },
        { id: 'gadget', title: 'Спортивный гаджет ⌚', desc: 'Умные часы, фитнес-браслет или приложение', cost: 1500, icon: '⌚', category: 'premium' },
        { id: 'retreat', title: 'Спа-уикенд 🌴', desc: 'Большая награда за большой прогресс', cost: 2000, icon: '🌴', category: 'premium' },
    ],
};

// ============================================================
//  Game Logic Engine
// ============================================================
class GameLogic {
    constructor() {
        const savedState = StorageAPI.getGameState();
        this.state = savedState
            ? { ...this.getInitialState(), ...savedState }
            : this.getInitialState();

        // Backwards compat
        if (this.state.gold === undefined) this.state.gold = 0;
        if (this.state.totalXpEarned === undefined) this.state.totalXpEarned = 0;
        if (this.state.totalGoldEarned === undefined) this.state.totalGoldEarned = 0;
        if (this.state.purchasedRewards === undefined) this.state.purchasedRewards = [];
        if (this.state.completedAllDays === undefined) this.state.completedAllDays = 0;
        if (this.state.weeklyXp === undefined) this.state.weeklyXp = [0, 0, 0, 0, 0, 0, 0];
        if (this.state.questsCompletedTotal === undefined) this.state.questsCompletedTotal = 0;

        this.quests = StorageAPI.getQuestsState() || this.generateDailyQuests();
        this.checkNewDay();
    }

    getInitialState() {
        return {
            level: 1,
            xp: 0,
            gold: 0,
            streak: 0,
            totalDaysActive: 0,
            totalXpEarned: 0,
            totalGoldEarned: 0,
            purchasedRewards: [],
            completedAllDays: 0,
            weeklyXp: [0, 0, 0, 0, 0, 0, 0],
            questsCompletedTotal: 0,
        };
    }

    // Select 1 Main Workout + 5-7 supporting quests
    generateDailyQuests() {
        const pool = [...GameConfig.QUEST_POOL];
        const shuffle = arr => arr.sort(() => Math.random() - 0.5);

        // Guaranteed 1 Main Workout Of The Day
        const workouts = shuffle(pool.filter(q => q.category === 'workout'));
        const mainWorkout = workouts[0];

        // Supporting habits
        const regularPool = pool.filter(q => q.category !== 'workout');
        const easy = shuffle(regularPool.filter(q => q.difficulty === 'easy')).slice(0, 3);
        const medium = shuffle(regularPool.filter(q => q.difficulty === 'medium')).slice(0, 3);
        const hard = shuffle(regularPool.filter(q => q.difficulty === 'hard')).slice(0, 1);

        return [mainWorkout, ...easy, ...medium, ...hard].map(q => ({ ...q, completed: false }));
    }

    checkNewDay() {
        const today = new Date().toDateString();
        const lastLogin = StorageAPI.getLastLoginDate();

        if (lastLogin !== today) {
            if (lastLogin) {
                const lastDate = new Date(lastLogin);
                const currDate = new Date(today);
                const diffDays = Math.round((currDate - lastDate) / (1000 * 60 * 60 * 24));

                if (diffDays > 1) {
                    this.state.streak = 0;
                } else {
                    const allCompleted = this.quests.every(q => q.completed);
                    if (allCompleted) {
                        this.state.streak += 1;
                        this.state.completedAllDays += 1;
                    }
                }
            }

            // Reset weekly XP on Monday
            const dayOfWeek = new Date().getDay(); // 0=Sunday
            const idx = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Mon=0
            if (idx === 0) {
                this.state.weeklyXp = [0, 0, 0, 0, 0, 0, 0];
            }

            this.quests = this.generateDailyQuests();
            StorageAPI.setLastLoginDate(today);
            this.state.totalDaysActive += 1;
            this.saveAll();
        }
    }

    getRankInfo(level) {
        let rank = GameConfig.RANKS[0];
        for (const r of GameConfig.RANKS) {
            if (level >= r.level) rank = r;
            else break;
        }
        return rank;
    }

    getNextRankInfo(level) {
        for (const r of GameConfig.RANKS) {
            if (r.level > level) return r;
        }
        return null;
    }

    getRankTitle(level) {
        return this.getRankInfo(level).title;
    }

    getXpForNextLevel(level) {
        return Math.floor(GameConfig.BASE_XP * Math.pow(GameConfig.XP_MULTIPLIER, level - 1));
    }

    addXp(amount) {
        this.state.xp += amount;
        this.state.totalXpEarned += amount;

        // Track weekly XP
        const dayOfWeek = new Date().getDay();
        const idx = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        this.state.weeklyXp[idx] = (this.state.weeklyXp[idx] || 0) + amount;

        let leveledUp = false;
        let oldLevel = this.state.level;

        let xpNeeded = this.getXpForNextLevel(this.state.level);
        while (this.state.xp >= xpNeeded) {
            this.state.xp -= xpNeeded;
            this.state.level += 1;
            leveledUp = true;
            xpNeeded = this.getXpForNextLevel(this.state.level);
        }

        this.saveAll();
        return { leveledUp, oldLevel, newLevel: this.state.level, currentXp: this.state.xp, xpNeeded: this.getXpForNextLevel(this.state.level) };
    }

    toggleQuest(questId) {
        const quest = this.quests.find(q => q.id === questId);
        if (!quest) return null;

        quest.completed = !quest.completed;

        let xpGained = 0;
        let goldGained = 0;
        let levelData = null;

        if (quest.completed) {
            const streakBonus = Math.floor(quest.xp * (this.state.streak * 0.05));
            xpGained = quest.xp + streakBonus;
            goldGained = quest.gold;

            this.state.gold += goldGained;
            this.state.totalGoldEarned += goldGained;
            this.state.questsCompletedTotal += 1;
            levelData = this.addXp(xpGained);
        } else {
            xpGained = 0;
            goldGained = 0;
            this.state.xp = Math.max(0, this.state.xp - quest.xp);
            this.state.gold = Math.max(0, this.state.gold - quest.gold);
            levelData = { leveledUp: false, newLevel: this.state.level, currentXp: this.state.xp, xpNeeded: this.getXpForNextLevel(this.state.level) };
        }

        this.saveAll();
        return { quest, xpGained, goldGained, levelData };
    }

    buyReward(rewardId) {
        const reward = GameConfig.REWARDS.find(r => r.id === rewardId);
        if (!reward) return { success: false };
        if (this.state.gold < reward.cost) return { success: false, reason: 'not_enough_gold' };

        this.state.gold -= reward.cost;
        this.state.purchasedRewards.push({ id: rewardId, date: new Date().toISOString() });
        this.saveAll();
        return { success: true, reward };
    }

    getUsername() {
        return StorageAPI.getUsername();
    }

    setUsername(name) {
        StorageAPI.saveUsername(name);
    }

    getCompletionRate() {
        const total = this.quests.length;
        const done = this.quests.filter(q => q.completed).length;
        return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
    }

    saveAll() {
        StorageAPI.saveGameState(this.state);
        StorageAPI.saveQuestsState(this.quests);
    }
}
