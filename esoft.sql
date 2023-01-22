-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Янв 22 2023 г., 20:12
-- Версия сервера: 10.4.25-MariaDB
-- Версия PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `esoft`
--

-- --------------------------------------------------------

--
-- Структура таблицы `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `lastName` text DEFAULT NULL,
  `firstName` text DEFAULT NULL,
  `patronymic` text DEFAULT NULL,
  `phone` text NOT NULL,
  `email` text NOT NULL,
  `isBusy` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `client`
--

INSERT INTO `client` (`id`, `lastName`, `firstName`, `patronymic`, `phone`, `email`, `isBusy`) VALUES
(1, 'Проскуркина', 'Александра', 'Юлиановна', '89535731531', 'aleksandra.proskurkina@gmail.com', 1),
(2, 'Тургенев', 'Степан', 'Егорович', '89348244359', 'stepan62@hotmail.com', 0),
(3, 'Капп', 'Анна', 'Петровна', '89691726451', 'anna1993@mail.ru', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `deal`
--

CREATE TABLE `deal` (
  `offer` int(11) NOT NULL,
  `requirement_flat` int(11) NOT NULL,
  `requirement_house` int(11) NOT NULL,
  `requirement_territory` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `deal`
--

INSERT INTO `deal` (`offer`, `requirement_flat`, `requirement_house`, `requirement_territory`, `id`) VALUES
(1, 1, 0, 0, 1),
(1, 1, 0, 0, 2),
(1, 1, 0, 0, 3),
(1, 0, 1, 0, 4),
(1, 0, 1, 0, 5),
(1, 0, 1, 0, 6),
(13, 0, 1, 0, 7),
(1, 1, 0, 0, 8),
(1, 1, 0, 0, 9),
(1, 0, 0, 1, 10),
(1, 1, 0, 0, 11),
(1, 1, 0, 0, 12),
(1, 1, 0, 0, 13),
(1, 1, 0, 0, 14),
(1, 1, 0, 0, 15),
(1, 1, 0, 0, 16),
(1, 1, 0, 0, 17),
(1, 1, 0, 0, 18),
(1, 1, 0, 0, 19),
(1, 1, 0, 0, 20),
(1, 1, 0, 0, 21),
(1, 1, 0, 0, 22),
(1, 1, 0, 0, 23),
(1, 1, 0, 0, 24),
(1, 1, 0, 0, 25),
(1, 1, 0, 0, 26),
(1, 1, 0, 0, 27),
(1, 1, 0, 0, 28),
(1, 1, 0, 0, 29),
(1, 1, 0, 0, 30),
(1, 1, 0, 0, 31),
(1, 1, 0, 0, 32),
(1, 1, 0, 0, 33),
(1, 1, 0, 0, 34),
(1, 1, 0, 0, 35),
(1, 1, 0, 0, 36),
(1, 1, 0, 0, 37),
(1, 1, 0, 0, 38),
(1, 1, 0, 0, 39),
(1, 1, 0, 0, 40),
(1, 1, 0, 0, 41),
(1, 1, 0, 0, 42),
(1, 1, 0, 0, 43),
(1, 1, 0, 0, 44),
(1, 1, 0, 0, 45),
(1, 1, 0, 0, 46),
(1, 1, 0, 0, 47),
(1, 1, 0, 0, 48),
(1, 1, 0, 0, 49),
(1, 1, 0, 0, 50),
(1, 1, 0, 0, 51),
(1, 1, 0, 0, 52),
(1, 1, 0, 0, 53),
(1, 1, 0, 0, 54),
(1, 1, 0, 0, 55),
(1, 1, 0, 0, 56),
(1, 1, 0, 0, 57),
(1, 1, 0, 0, 58),
(1, 1, 0, 0, 59),
(1, 1, 0, 0, 60),
(1, 1, 0, 0, 61),
(1, 1, 0, 0, 62),
(1, 1, 0, 0, 63),
(1, 1, 0, 0, 64),
(1, 1, 0, 0, 65),
(1, 1, 0, 0, 66),
(1, 1, 0, 0, 67),
(1, 1, 0, 0, 68),
(1, 1, 0, 0, 69),
(1, 1, 0, 0, 70),
(1, 1, 0, 0, 71),
(1, 1, 0, 0, 72),
(1, 1, 0, 0, 73),
(1, 1, 0, 0, 74),
(1, 1, 0, 0, 75),
(1, 1, 0, 0, 76),
(1, 1, 0, 0, 77),
(1, 1, 0, 0, 78),
(1, 1, 0, 0, 79);

-- --------------------------------------------------------

--
-- Структура таблицы `flat`
--

CREATE TABLE `flat` (
  `id` int(11) NOT NULL,
  `city` text DEFAULT NULL,
  `street` text DEFAULT NULL,
  `entranceNumber` int(11) DEFAULT NULL,
  `flatNumber` int(11) DEFAULT NULL,
  `latitude` int(11) DEFAULT NULL,
  `longitude` int(11) DEFAULT NULL,
  `floor` int(11) DEFAULT NULL,
  `roomNumber` int(11) DEFAULT NULL,
  `space` int(11) DEFAULT NULL,
  `isBusy` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `flat`
--

INSERT INTO `flat` (`id`, `city`, `street`, `entranceNumber`, `flatNumber`, `latitude`, `longitude`, `floor`, `roomNumber`, `space`, `isBusy`) VALUES
(1, 'Moscow', 'Elektrozavodskaya', 2, 76, 46, -9, 6, 2, 46, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `house`
--

CREATE TABLE `house` (
  `id` int(11) NOT NULL,
  `city` text DEFAULT NULL,
  `street` text DEFAULT NULL,
  `entranceNumber` int(11) DEFAULT NULL,
  `flatNumber` int(11) DEFAULT NULL,
  `latitude` int(11) DEFAULT NULL,
  `longitude` int(11) DEFAULT NULL,
  `floor` int(11) DEFAULT NULL,
  `roomNumber` int(11) DEFAULT NULL,
  `space` int(11) DEFAULT NULL,
  `isBusy` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `house`
--

INSERT INTO `house` (`id`, `city`, `street`, `entranceNumber`, `flatNumber`, `latitude`, `longitude`, `floor`, `roomNumber`, `space`, `isBusy`) VALUES
(1, 'Moscow', 'Moscowskaya', 4, 1, 46, -4, 3, 5, 130, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `offer`
--

CREATE TABLE `offer` (
  `id` int(11) NOT NULL,
  `client` text NOT NULL,
  `rieltor` text NOT NULL,
  `estate` text NOT NULL,
  `price` int(11) NOT NULL,
  `isBusy` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `offer`
--

INSERT INTO `offer` (`id`, `client`, `rieltor`, `estate`, `price`, `isBusy`) VALUES
(1, 'Проскуркина Александра Юлиановна', 'Климов Николай Иванович', 'Квартира, Moscow Moscowskaya 4 1', 4000, 0),
(13, 'Проскуркина Александра Юлиановна', 'Климов Николай Иванович', 'Moscow Elektrozavodskaya 2 76', 8, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `requirement_flat`
--

CREATE TABLE `requirement_flat` (
  `id` int(11) NOT NULL,
  `client` text NOT NULL,
  `rieltor` text NOT NULL,
  `address` text NOT NULL,
  `minPrice` int(11) NOT NULL,
  `maxPrice` int(11) NOT NULL,
  `minSpace` int(11) NOT NULL,
  `maxSpace` int(11) NOT NULL,
  `minRoom` int(11) NOT NULL,
  `maxRoom` int(11) NOT NULL,
  `minFloor` int(11) NOT NULL,
  `maxFloor` int(11) NOT NULL,
  `isBusy` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `requirement_flat`
--

INSERT INTO `requirement_flat` (`id`, `client`, `rieltor`, `address`, `minPrice`, `maxPrice`, `minSpace`, `maxSpace`, `minRoom`, `maxRoom`, `minFloor`, `maxFloor`, `isBusy`) VALUES
(1, 'Проскуркина Александра Юлиановна', 'Климов Николай Иванович', 'Moscow', 100016, 5000, 30, 45, 2, 3, 3, 9, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `requirement_house`
--

CREATE TABLE `requirement_house` (
  `id` int(11) NOT NULL,
  `client` text NOT NULL,
  `rieltor` text NOT NULL,
  `address` text NOT NULL,
  `minPrice` int(11) NOT NULL,
  `maxPrice` int(11) NOT NULL,
  `minSpace` int(11) NOT NULL,
  `maxSpace` int(11) NOT NULL,
  `minRoom` int(11) NOT NULL,
  `maxRoom` int(11) NOT NULL,
  `minFloor` int(11) NOT NULL,
  `maxFloor` int(11) NOT NULL,
  `isBusy` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `requirement_house`
--

INSERT INTO `requirement_house` (`id`, `client`, `rieltor`, `address`, `minPrice`, `maxPrice`, `minSpace`, `maxSpace`, `minRoom`, `maxRoom`, `minFloor`, `maxFloor`, `isBusy`) VALUES
(1, 'Проскуркина Александра Юлиановна', 'Климов Николай Иванович', 'Москва Электрозаводская', 15000, 6000, 123, 147, 6, 7, 2, 3, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `requirement_territory`
--

CREATE TABLE `requirement_territory` (
  `id` int(11) NOT NULL,
  `client` text NOT NULL,
  `rieltor` text NOT NULL,
  `address` text NOT NULL,
  `minPrice` int(11) NOT NULL,
  `maxPrice` int(11) NOT NULL,
  `minSpace` int(11) NOT NULL,
  `maxSpace` int(11) NOT NULL,
  `isBusy` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `requirement_territory`
--

INSERT INTO `requirement_territory` (`id`, `client`, `rieltor`, `address`, `minPrice`, `maxPrice`, `minSpace`, `maxSpace`, `isBusy`) VALUES
(1, 'Проскуркина Александра Юлиановна', 'Климов Николай Иванович', 'Москва Сеславинская', 1435, 6658, 34, 880, 0),
(2, 'Тургенев Степан Егорович', 'Смирнов Степан Андреевич', '234', 324234, 234, 124, 124, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `rieltor`
--

CREATE TABLE `rieltor` (
  `id` int(11) NOT NULL,
  `firstName` text NOT NULL,
  `lastName` text NOT NULL,
  `patronymic` text NOT NULL,
  `comission` float NOT NULL,
  `isBusy` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `rieltor`
--

INSERT INTO `rieltor` (`id`, `firstName`, `lastName`, `patronymic`, `comission`, `isBusy`) VALUES
(1, 'Николай', 'Климов', 'Иванович', 0.2, 1),
(2, 'Степан', 'Смирнов', 'Андреевич', 0.15, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `territory`
--

CREATE TABLE `territory` (
  `id` int(11) NOT NULL,
  `city` text DEFAULT NULL,
  `street` text DEFAULT NULL,
  `entranceNumber` int(11) DEFAULT NULL,
  `flatNumber` int(11) DEFAULT NULL,
  `latitude` int(11) DEFAULT NULL,
  `longitude` int(11) DEFAULT NULL,
  `space` int(11) DEFAULT NULL,
  `isBusy` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `territory`
--

INSERT INTO `territory` (`id`, `city`, `street`, `entranceNumber`, `flatNumber`, `latitude`, `longitude`, `space`, `isBusy`) VALUES
(1, 'Moscow', 'Moscow oblast', 4, NULL, 20, 59, 170, 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `deal`
--
ALTER TABLE `deal`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `flat`
--
ALTER TABLE `flat`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `house`
--
ALTER TABLE `house`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `requirement_flat`
--
ALTER TABLE `requirement_flat`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `requirement_house`
--
ALTER TABLE `requirement_house`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `requirement_territory`
--
ALTER TABLE `requirement_territory`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `rieltor`
--
ALTER TABLE `rieltor`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `territory`
--
ALTER TABLE `territory`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `deal`
--
ALTER TABLE `deal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT для таблицы `flat`
--
ALTER TABLE `flat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `house`
--
ALTER TABLE `house`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `offer`
--
ALTER TABLE `offer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `requirement_flat`
--
ALTER TABLE `requirement_flat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `requirement_house`
--
ALTER TABLE `requirement_house`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `requirement_territory`
--
ALTER TABLE `requirement_territory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `rieltor`
--
ALTER TABLE `rieltor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `territory`
--
ALTER TABLE `territory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
