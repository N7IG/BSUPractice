var newsHandler = (function () {
tagArray = ["тэг", "космос", "SpaceX", "МКС", "новость", "мир", "интересное", "DDOS", "wat"];

var articles;

//= [
//   {
//    id: 'post',
//    tags: ["тэг", "космос", "SpaceX", "МКС"],
//    img: 'https://img.tyt.by/360x240c/n/it/07/6/dracon_mks_1.jpg',
//    title: 'Корабль Dragon пристыковался к МКС с опозданием на сутки',
//    summary: 'Запущенный вместе с ракетой Falcon 9 космический грузовик Dragon американской компании SpaceX прибыл к Международной космической станции (МКС) на день позже запланированной даты.',
//    createdAt: new Date('March 06, 2016 22:58:00'),
//    author: 'admino',
//    content: '19 февраля ракета-носитель Falcon 9 с космическим кораблем Dragon стартовала с мыса Канаверал для доставки груза на МКС. На борту корабля находится багаж для обеспечения жизнедеятельности команды космической станции, а также оборудование для проведения научных экспериментов. Среди прочего Dragon должен доставить на МКС для опытов супербактерию, особенность которой заключается в устойчивости к действию антибиотиков.'
//   },
//   {
//     id: '2',
//     tags: ["тэг", "новость", "мир", "интересное"],
//     img: 'https://img.tyt.by/360x240c/n/zamirovskiy/0f/1/3_velkom_10032016_zam_tutby_phsl.jpg',
//     title: 'Мобильный интернет velcom работал со сбоями из-за DDOS-атаки',
//     summary: 'Абоненты velcom в соцсетях пожаловались на проблемы в работе мобильного интернета. В компании подтвердили: на сети оператора произошла DDOS-атака.',
//     createdAt: new Date('March 06, 2017 22:59:00'),
//     author: 'admin',
//     content: 'Сегодня утром в Twitter появились жалобы от абонентов из Минска и Жлобина. «Впервые за последние пару месяцев перезагрузил телефон. Не помогает. Будто обрывы сети постоянно», — написал один из пользователей.По данным оператора, атака случилась 24 февраля и продлилась с 9.49 до 10.10 утра. Затронут оказался только мобильный интернет.«Только 20 минут потребовалось для отражения атаки», — рассказал глава пресс-службы компании Вячеслав Смирнов. По его словам, атака шла из-за рубежа.'
//   },
//   {
//     id: '3',
//     tags: ["тэг", "новость", "мир", "интересное"],
//     img: 'https://img.tyt.by/360x240c/n/it/0c/b/blackberry-keyone-3.jpg',
//     title: 'Возвращение BlackBerry: представлен QWERTY-смартфон KEYone',
//     summary: 'АВ декабре прошлого года BlackBerry продала все права на выпуск смартфонов китайской TCL. В преддверии старта выставки MWC 2017 нам представили первое детище возрождаемого бренда — BlackBerry KEYone.',
//     createdAt: new Date('March 06, 2017 23:06:00'),
//     author: 'admin',
//     content: 'Технические характеристики новинки включают 4,5-дюймовый дисплей с разрешением 1620×1080 пикселей и защитой от царапин, экономичный и средний по мощности восьмиядерный чип Qualcomm Snapdragon 625, 3 ГБ оперативной и 32 ГБ постоянной памяти (с поддержкой microSD до 2 ТБ). Здесь используется 12-мегапиксельная основная камера (датчик Sony IMX378, f/2.0, поддержка 4K-видео), 8-мегапиксельный фронтальный модуль, а также аккумулятор на 3505 мАч (зарядка до 50% за 36 минут). Габариты BlackBerry KEYone — 149,3×72,5×9,4 мм, вес — 180 граммов.'
//   },
//   {
//     id: '4',
//     tags: ["тэг", "новость", "мир", "интересное"],
//     img: 'https://img.tyt.by/620x620s/n/it/06/1/kolceobraznoe_solnechnoe_zatmenie_2012_eclipse_reuters.jpg',
//     title: 'В выходные земляне увидят солнечное затмение',
//     summary: '26 февраля в некоторых районах Земли получится наблюдать кольцеобразное солнечное затмение. Правда, территорию Беларуси астрономическое явление обойдет стороной.',
//     createdAt: new Date('March 06, 2017 23:07:00'),
//     author: 'admino',
//     content: 'Лунный диск пройдет перед Солнцем. Из-за особенностей движения небесных тел спутник не заслонит звезду полностью: темный диск Луны будет окружен ослепительным «кольцом огня». Кольцеобразное затмение увидят жители южных частей Чили и Аргентины, Анголы и некоторых районов Демократической Республики Конго. Частичное затмение будет видно в Южной и Западной Африке, на юге Южной Америки и в Антарктиде'
//   },
//   {
//    id: '5',
//    tags: ["тэг", "новость", "мир", "интересное"],
//    img: 'https://img.tyt.by/360x240c/n/it/07/6/dracon_mks_1.jpg',
//    title: 'Корабль Dragon пристыковался к МКС с опозданием на сутки',
//    summary: 'Запущенный вместе с ракетой Falcon 9 космический грузовик Dragon американской компании SpaceX прибыл к Международной космической станции (МКС) на день позже запланированной даты.',
//    createdAt: new Date('March 06, 2017 23:08:00'),
//     author: 'admin',
//     content: '19 февраля ракета-носитель Falcon 9 с космическим кораблем Dragon стартовала с мыса Канаверал для доставки груза на МКС. На борту корабля находится багаж для обеспечения жизнедеятельности команды космической станции, а также оборудование для проведения научных экспериментов. Среди прочего Dragon должен доставить на МКС для опытов супербактерию, особенность которой заключается в устойчивости к действию антибиотиков.'
//   },
//   {
//     id: '6',
//     tags: ["тэг", "новость", "мир", "интересное"],
//     img: 'https://img.tyt.by/360x240c/n/zamirovskiy/0f/1/3_velkom_10032016_zam_tutby_phsl.jpg',
//     title: 'Мобильный интернет velcom работал со сбоями из-за DDOS-атаки',
//     summary: 'Абоненты velcom в соцсетях пожаловались на проблемы в работе мобильного интернета. В компании подтвердили: на сети оператора произошла DDOS-атака.',
//     createdAt: new Date('March 06, 2017 23:09:00'),
//     author: 'admin',
//     content: 'Сегодня утром в Twitter появились жалобы от абонентов из Минска и Жлобина. «Впервые за последние пару месяцев перезагрузил телефон. Не помогает. Будто обрывы сети постоянно», — написал один из пользователей.По данным оператора, атака случилась 24 февраля и продлилась с 9.49 до 10.10 утра. Затронут оказался только мобильный интернет.«Только 20 минут потребовалось для отражения атаки», — рассказал глава пресс-службы компании Вячеслав Смирнов. По его словам, атака шла из-за рубежа.'
//   },
//   {
//     id: '7',
//     tags: ["тэг", "новость", "мир", "интересное"],
//     img: 'https://img.tyt.by/360x240c/n/it/0c/b/blackberry-keyone-3.jpg',
//     title: 'Возвращение BlackBerry: представлен QWERTY-смартфон KEYone',
//     summary: 'АВ декабре прошлого года BlackBerry продала все права на выпуск смартфонов китайской TCL. В преддверии старта выставки MWC 2017 нам представили первое детище возрождаемого бренда — BlackBerry KEYone.',
//     createdAt: new Date('March 06, 2017 23:10:00'),
//     author: 'admin',
//     content: 'Технические характеристики новинки включают 4,5-дюймовый дисплей с разрешением 1620×1080 пикселей и защитой от царапин, экономичный и средний по мощности восьмиядерный чип Qualcomm Snapdragon 625, 3 ГБ оперативной и 32 ГБ постоянной памяти (с поддержкой microSD до 2 ТБ). Здесь используется 12-мегапиксельная основная камера (датчик Sony IMX378, f/2.0, поддержка 4K-видео), 8-мегапиксельный фронтальный модуль, а также аккумулятор на 3505 мАч (зарядка до 50% за 36 минут). Габариты BlackBerry KEYone — 149,3×72,5×9,4 мм, вес — 180 граммов.'
//   },
//   {
//     id: '8',
//     tags: ["тэг", "новость", "мир", "интересное"],
//     img: 'https://img.tyt.by/620x620s/n/it/06/1/kolceobraznoe_solnechnoe_zatmenie_2012_eclipse_reuters.jpg',
//     title: 'В выходные земляне увидят солнечное затмение',
//     summary: '26 февраля в некоторых районах Земли получится наблюдать кольцеобразное солнечное затмение. Правда, территорию Беларуси астрономическое явление обойдет стороной.',
//     createdAt: new Date('March 06, 2017 23:11:00'),
//     author: 'admin',
//     content: 'Лунный диск пройдет перед Солнцем. Из-за особенностей движения небесных тел спутник не заслонит звезду полностью: темный диск Луны будет окружен ослепительным «кольцом огня». Кольцеобразное затмение увидят жители южных частей Чили и Аргентины, Анголы и некоторых районов Демократической Республики Конго. Частичное затмение будет видно в Южной и Западной Африке, на юге Южной Америки и в Антарктиде'
//   },
//   {
//    id: '9',
//    tags: ["тэг", "новость", "мир", "интересное"],
//    img: 'https://img.tyt.by/360x240c/n/it/07/6/dracon_mks_1.jpg',
//    title: 'Корабль Dragon пристыковался к МКС с опозданием на сутки',
//    summary: 'Запущенный вместе с ракетой Falcon 9 космический грузовик Dragon американской компании SpaceX прибыл к Международной космической станции (МКС) на день позже запланированной даты.',
//    createdAt: new Date('March 06, 2017 23:12:00'),
//     author: 'admin',
//     content: '19 февраля ракета-носитель Falcon 9 с космическим кораблем Dragon стартовала с мыса Канаверал для доставки груза на МКС. На борту корабля находится багаж для обеспечения жизнедеятельности команды космической станции, а также оборудование для проведения научных экспериментов. Среди прочего Dragon должен доставить на МКС для опытов супербактерию, особенность которой заключается в устойчивости к действию антибиотиков.'
//   },
//   {
//     id: '10',
//     tags: ["тэг", "новость", "мир", "интересное"],
//     img: 'https://img.tyt.by/360x240c/n/zamirovskiy/0f/1/3_velkom_10032016_zam_tutby_phsl.jpg',
//     title: 'Мобильный интернет velcom работал со сбоями из-за DDOS-атаки',
//     summary: 'Абоненты velcom в соцсетях пожаловались на проблемы в работе мобильного интернета. В компании подтвердили: на сети оператора произошла DDOS-атака.',
//     createdAt: new Date('March 06, 2017 23:13:00'),
//     author: 'admin',
//     content: 'Сегодня утром в Twitter появились жалобы от абонентов из Минска и Жлобина. «Впервые за последние пару месяцев перезагрузил телефон. Не помогает. Будто обрывы сети постоянно», — написал один из пользователей.По данным оператора, атака случилась 24 февраля и продлилась с 9.49 до 10.10 утра. Затронут оказался только мобильный интернет.«Только 20 минут потребовалось для отражения атаки», — рассказал глава пресс-службы компании Вячеслав Смирнов. По его словам, атака шла из-за рубежа.'
//   },
//   {
//    id: '11',
//    tags: ["тэг", "новость", "мир", "интересное"],
//    img: 'https://img.tyt.by/360x240c/n/it/07/6/dracon_mks_1.jpg',
//    title: 'Корабль Dragon пристыковался к МКС с опозданием на сутки',
//    summary: 'Запущенный вместе с ракетой Falcon 9 космический грузовик Dragon американской компании SpaceX прибыл к Международной космической станции (МКС) на день позже запланированной даты.',
//    createdAt: new Date('March 06, 2017 23:14:00'),
//     author: 'admin',
//     content: '19 февраля ракета-носитель Falcon 9 с космическим кораблем Dragon стартовала с мыса Канаверал для доставки груза на МКС. На борту корабля находится багаж для обеспечения жизнедеятельности команды космической станции, а также оборудование для проведения научных экспериментов. Среди прочего Dragon должен доставить на МКС для опытов супербактерию, особенность которой заключается в устойчивости к действию антибиотиков.'
//   },
//   {
//     id: '12',
//     tags: ["тэг", "новость", "мир", "интересное"],
//     img: 'https://img.tyt.by/360x240c/n/zamirovskiy/0f/1/3_velkom_10032016_zam_tutby_phsl.jpg',
//     title: 'Мобильный интернет velcom работал со сбоями из-за DDOS-атаки',
//     summary: 'Абоненты velcom в соцсетях пожаловались на проблемы в работе мобильного интернета. В компании подтвердили: на сети оператора произошла DDOS-атака.',
//     createdAt: new Date('March 06, 2017 23:15:00'),
//     author: 'admin',
//     content: 'Сегодня утром в Twitter появились жалобы от абонентов из Минска и Жлобина. «Впервые за последние пару месяцев перезагрузил телефон. Не помогает. Будто обрывы сети постоянно», — написал один из пользователей.По данным оператора, атака случилась 24 февраля и продлилась с 9.49 до 10.10 утра. Затронут оказался только мобильный интернет.«Только 20 минут потребовалось для отражения атаки», — рассказал глава пресс-службы компании Вячеслав Смирнов. По его словам, атака шла из-за рубежа.'
//   },
//   {
//     id: '13',
//     tags: ["тэг", "новость", "мир", "интересное"],
//     img: 'https://img.tyt.by/360x240c/n/it/0c/b/blackberry-keyone-3.jpg',
//     title: 'Возвращение BlackBerry: представлен QWERTY-смартфон KEYone',
//     summary: 'АВ декабре прошлого года BlackBerry продала все права на выпуск смартфонов китайской TCL. В преддверии старта выставки MWC 2017 нам представили первое детище возрождаемого бренда — BlackBerry KEYone.',
//     createdAt: new Date('March 06, 2017 23:16:00'),
//     author: 'admin',
//     content: 'Технические характеристики новинки включают 4,5-дюймовый дисплей с разрешением 1620×1080 пикселей и защитой от царапин, экономичный и средний по мощности восьмиядерный чип Qualcomm Snapdragon 625, 3 ГБ оперативной и 32 ГБ постоянной памяти (с поддержкой microSD до 2 ТБ). Здесь используется 12-мегапиксельная основная камера (датчик Sony IMX378, f/2.0, поддержка 4K-видео), 8-мегапиксельный фронтальный модуль, а также аккумулятор на 3505 мАч (зарядка до 50% за 36 минут). Габариты BlackBerry KEYone — 149,3×72,5×9,4 мм, вес — 180 граммов.'
//   },
//   {
//     id: '14',
//     tags: ["тэг", "новость", "мир", "интересное"],
//     img: 'https://img.tyt.by/620x620s/n/it/06/1/kolceobraznoe_solnechnoe_zatmenie_2012_eclipse_reuters.jpg',
//     title: 'В выходные земляне увидят солнечное затмение',
//     summary: '26 февраля в некоторых районах Земли получится наблюдать кольцеобразное солнечное затмение. Правда, территорию Беларуси астрономическое явление обойдет стороной.',
//     createdAt: new Date('March 06, 2017 23:17:00'),
//     author: 'admin',
//     content: 'Лунный диск пройдет перед Солнцем. Из-за особенностей движения небесных тел спутник не заслонит звезду полностью: темный диск Луны будет окружен ослепительным «кольцом огня». Кольцеобразное затмение увидят жители южных частей Чили и Аргентины, Анголы и некоторых районов Демократической Республики Конго. Частичное затмение будет видно в Южной и Западной Африке, на юге Южной Америки и в Антарктиде'
//   },
//   {
//    id: '15',
//    tags: ["тэг", "новость", "мир", "интересное"],
//    img: 'https://img.tyt.by/360x240c/n/it/07/6/dracon_mks_1.jpg',
//    title: 'Корабль Dragon пристыковался к МКС с опозданием на сутки',
//    summary: 'Запущенный вместе с ракетой Falcon 9 космический грузовик Dragon американской компании SpaceX прибыл к Международной космической станции (МКС) на день позже запланированной даты.',
//    createdAt: new Date('March 06, 2017 23:18:00'),
//     author: 'admin',
//     content: '19 февраля ракета-носитель Falcon 9 с космическим кораблем Dragon стартовала с мыса Канаверал для доставки груза на МКС. На борту корабля находится багаж для обеспечения жизнедеятельности команды космической станции, а также оборудование для проведения научных экспериментов. Среди прочего Dragon должен доставить на МКС для опытов супербактерию, особенность которой заключается в устойчивости к действию антибиотиков.'
//   },
//   {
//     id: '16',
//     tags: ["тэг", "новость", "мир", "DDOS"],
//     img: 'https://img.tyt.by/360x240c/n/zamirovskiy/0f/1/3_velkom_10032016_zam_tutby_phsl.jpg',
//     title: 'Мобильный интернет velcom работал со сбоями из-за DDOS-атаки',
//     summary: 'Абоненты velcom в соцсетях пожаловались на проблемы в работе мобильного интернета. В компании подтвердили: на сети оператора произошла DDOS-атака.',
//     createdAt: new Date('March 06, 2017 23:19:00'),
//     author: 'admin',
//     content: 'Сегодня утром в Twitter появились жалобы от абонентов из Минска и Жлобина. «Впервые за последние пару месяцев перезагрузил телефон. Не помогает. Будто обрывы сети постоянно», — написал один из пользователей.По данным оператора, атака случилась 24 февраля и продлилась с 9.49 до 10.10 утра. Затронут оказался только мобильный интернет.«Только 20 минут потребовалось для отражения атаки», — рассказал глава пресс-службы компании Вячеслав Смирнов. По его словам, атака шла из-за рубежа.'
//   },
//   {
//     id: '17',
//     tags: ["тэг", "новость", "мир", "интересное"],
//     img: 'https://img.tyt.by/360x240c/n/it/0c/b/blackberry-keyone-3.jpg',
//     title: 'Возвращение BlackBerry: представлен QWERTY-смартфон KEYone',
//     summary: 'АВ декабре прошлого года BlackBerry продала все права на выпуск смартфонов китайской TCL. В преддверии старта выставки MWC 2017 нам представили первое детище возрождаемого бренда — BlackBerry KEYone.',
//     createdAt: new Date('March 06, 2017 23:20:00'),
//     author: 'admin',
//     content: 'Технические характеристики новинки включают 4,5-дюймовый дисплей с разрешением 1620×1080 пикселей и защитой от царапин, экономичный и средний по мощности восьмиядерный чип Qualcomm Snapdragon 625, 3 ГБ оперативной и 32 ГБ постоянной памяти (с поддержкой microSD до 2 ТБ). Здесь используется 12-мегапиксельная основная камера (датчик Sony IMX378, f/2.0, поддержка 4K-видео), 8-мегапиксельный фронтальный модуль, а также аккумулятор на 3505 мАч (зарядка до 50% за 36 минут). Габариты BlackBerry KEYone — 149,3×72,5×9,4 мм, вес — 180 граммов.'
//   },
//   {
//     id: '18',
//     tags: ["тэг", "новость", "мир", "интересное"],
//     img: 'https://img.tyt.by/620x620s/n/it/06/1/kolceobraznoe_solnechnoe_zatmenie_2012_eclipse_reuters.jpg',
//     title: 'В выходные земляне увидят солнечное затмение',
//     summary: '26 февраля в некоторых районах Земли получится наблюдать кольцеобразное солнечное затмение. Правда, территорию Беларуси астрономическое явление обойдет стороной.',
//     createdAt: new Date('March 06, 2017 23:21:00'),
//     author: 'admin',
//     content: 'Лунный диск пройдет перед Солнцем. Из-за особенностей движения небесных тел спутник не заслонит звезду полностью: темный диск Луны будет окружен ослепительным «кольцом огня». Кольцеобразное затмение увидят жители южных частей Чили и Аргентины, Анголы и некоторых районов Демократической Республики Конго. Частичное затмение будет видно в Южной и Западной Африке, на юге Южной Америки и в Антарктиде'
//   },
//   {
//    id: '19',
//    tags: ["тэг", "новость", "мир", "интересное"],
//    img: 'https://img.tyt.by/360x240c/n/it/07/6/dracon_mks_1.jpg',
//    title: 'Корабль Dragon пристыковался к МКС с опозданием на сутки',
//    summary: 'Запущенный вместе с ракетой Falcon 9 космический грузовик Dragon американской компании SpaceX прибыл к Международной космической станции (МКС) на день позже запланированной даты.',
//    createdAt: new Date('March 06, 2017 23:22:00'),
//     author: 'admin',
//     content: '19 февраля ракета-носитель Falcon 9 с космическим кораблем Dragon стартовала с мыса Канаверал для доставки груза на МКС. На борту корабля находится багаж для обеспечения жизнедеятельности команды космической станции, а также оборудование для проведения научных экспериментов. Среди прочего Dragon должен доставить на МКС для опытов супербактерию, особенность которой заключается в устойчивости к действию антибиотиков.'
//   },
//   {
//     id: '20',
//     tags: ["тэг", "новость", "мир", "DDOS"],
//     img: 'https://img.tyt.by/360x240c/n/zamirovskiy/0f/1/3_velkom_10032016_zam_tutby_phsl.jpg',
//     title: 'Мобильный интернет velcom работал со сбоями из-за DDOS-атаки',
//     summary: 'Абоненты velcom в соцсетях пожаловались на проблемы в работе мобильного интернета. В компании подтвердили: на сети оператора произошла DDOS-атака.',
//     createdAt: new Date('March 06, 2017 23:23:00'),
//     author: 'admin',
//     content: 'Сегодня утром в Twitter появились жалобы от абонентов из Минска и Жлобина. «Впервые за последние пару месяцев перезагрузил телефон. Не помогает. Будто обрывы сети постоянно», — написал один из пользователей.По данным оператора, атака случилась 24 февраля и продлилась с 9.49 до 10.10 утра. Затронут оказался только мобильный интернет.«Только 20 минут потребовалось для отражения атаки», — рассказал глава пресс-службы компании Вячеслав Смирнов. По его словам, атака шла из-за рубежа.'
//   }
// ];


function getFromLocal(){
  let articlesJSON = localStorage.getItem("articles");
  if(articlesJSON){
    articles = JSON.parse(articlesJSON);
    articles.forEach(function(item,i,arr){
      item.createdAt = new Date(item.createdAt);
    })
  }
}

function updateLocal(){
  localStorage.setItem("articles", JSON.stringify(articles));

}

function getArticles(skip, top, filterConfig){
    if (skip < 0 || skip > articles.length || (typeof skip != "number")) {
        console.log("invalid skip value");
        return undefined;
    }
    if ( top > articles.length || (typeof top != "number")) {
        console.log("invalid top value");
        return undefined;
    }

    var outputArticles = articles;
    if (filterConfig != undefined){
        var since = filterConfig.sinceDate || new Date(-1);
        var until = filterConfig.untilDate || new Date();
        var iAuthor = filterConfig.author;
        var iTags = filterConfig.tags || [];
        if (iAuthor !== undefined){
        outputArticles = outputArticles.filter(function checkAuthor(value) {
            return value.author === iAuthor;
        });
        }
        outputArticles = outputArticles.filter(function checkDate(value) {
            return value.createdAt.valueOf() > since.valueOf() && value.createdAt.valueOf() < until.valueOf();
        });
        outputArticles = outputArticles.filter(function checkTags(value) {
            for (var i = 0; i < iTags.length; i++){
              if (value.tags.indexOf(iTags[i]) === -1){
                  return false;
              }
            }           
            return true;
        });
    }
    outputArticles = outputArticles.sort(function byDate(firstElement, secondElement) {
        return secondElement.createdAt - firstElement.createdAt;
    });
    outputArticles = outputArticles.slice(skip, top + skip);
    return outputArticles;

}

function check(article, filterConfig){
  if (filterConfig != undefined){
        var since = filterConfig.sinceDate || new Date(-1);
        var until = filterConfig.untilDate || new Date();
        var iAuthor = filterConfig.author;
        var iTags = filterConfig.tags || [];
        if (iAuthor !== undefined){
          if (article.author !== iAuthor)
            return false;
        }
        
        // console.log(since.valueOf());
        // console.log(article.createdAt.valueOf());
        // console.log(until.valueOf());
        if (article.createdAt.valueOf() < since.valueOf() || article.createdAt.valueOf() > until.valueOf())
          return false;
        for (var i = 0; i < iTags.length; i++){
              if (article.tags.indexOf(iTags[i]) === -1){
                  return false;
              }
        }           
    }
  return true;
}

function getIndex(id){
  if (typeof id !== "string"){
        console.log("error");
        return undefined;
    }
    for (var i = 0; i < articles.length; i++){
          if (articles[i].id === id){
              return i;
          }
    }
    console.log("error");
    return undefined;
}

function getArticle(id) {
    if (typeof id !== "string"){
        console.log("error");
        return undefined;
    }
    for (var i = 0; i < articles.length; i++){
          if (articles[i].id === id){
              return articles[i];
          }
    }
    console.log("error");
    return undefined;
}

function validateArticle(article) {
  debugger;
    if (typeof article.id != "string" || article.id.length <= 0)
      return false;
    if (typeof article.title != "string" || article.title.length > 100 || article.title.length <= 0)
      return false;
    if (typeof article.summary != "string" || article.summary.length > 200 || article.summary.length <= 0)
      return false;
    if (article.createdAt instanceof Date === false )
      return false;
    if (typeof article.author != "string" || article.author.length <= 0)
      return false;
    if (typeof article.content != "string" || article.content.length <=0)
      return false;
    if (Array.isArray(article.tags)){
    if( article.tags.length >= 1){
      for (var i = 0; i < article.tags.length; i++){

        var contains = false;

        for (var j = 0; j < tagArray.length; j++){
          if (article.tags[i] === tagArray[j]){
            contains = true;
            break;
          }
        }
        if (contains === false)
          return false;
      }
    }
    else return false;
    }
    else return false;


    return true;
}

function addArticle(article) {
  
    for (var i = 0; i < articles.length; i++)
    {
      if (articles[i].id === article.id) {
        return false;
      }
    }
    if (validateArticle(article))
    {
        articles.push(article);
        updateLocal();
        return true;
    }
    else alert("NOT Валидный");
    
    return false;
}

function editArticle(id, article) {
    iArticle = getArticle(id);
    if (iArticle === undefined)
        return false;    

    var newArticle = Object.assign(iArticle, article);

    if (validateArticle(newArticle))
    {
        articles[getIndex(id)] = newArticle;
        updateLocal();
    }
    else
      alert("Validation failed");
}

function removeArticle(id) {
    for (var i = 0; i < articles.length; i++)
    {
      if (articles[i].id === id){
        articles.splice(i, 1);
        updateLocal();
        break;
      }
    }
    
}

function getAmount(){
  return articles.length;
}

function getJsArticles(){
  return JSON.stringify(articles);
}

return {
        getArticles: getArticles,
        getFromLocal: getFromLocal,
        getJsArticles: getJsArticles,
        getArticle: getArticle,
        validateArticle: validateArticle,
        addArticle: addArticle,
        getIndex: getIndex,
        editArticle: editArticle,
        removeArticle: removeArticle,
        getAmount: getAmount,
        check: check,
        articles: articles
    };
}());
