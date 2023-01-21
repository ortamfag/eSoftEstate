-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Янв 21 2023 г., 19:18
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
(1, 'Проскуркина', 'Александра', 'Юлиановна', '89535731531', 'aleksandra.proskurkina@gmail.com', 0),
(2, 'Тургенев', 'Степан', 'Егорович', '89348244359', 'stepan62@hotmail.com', 0),
(3, 'Капп', 'Анна', 'Петровна', '89691726451', 'anna1993@mail.ru', 0);

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
(1, 'Проскуркина Александра Юлиановна', 'Климов Николай Иванович', 'Квартира, Moscow Moscowskaya 4 1', 4000, 0);

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
(1, 'Николай', 'Климов', 'Иванович', 0.2, 0),
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
-- AUTO_INCREMENT для таблицы `flat`
--
ALTER TABLE `flat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `house`
--
ALTER TABLE `house`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `offer`
--
ALTER TABLE `offer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
