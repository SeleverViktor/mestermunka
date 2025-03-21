-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 21. 11:30
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `partyez`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bulihely`
--

DROP TABLE IF EXISTS `bulihely`;
CREATE TABLE `bulihely` (
  `HelyID` int(11) NOT NULL,
  `HelyNev` varchar(50) NOT NULL,
  `Stilus` varchar(50) DEFAULT NULL,
  `ZeneStilusID` int(11) DEFAULT NULL,
  `Orszag` varchar(50) DEFAULT NULL,
  `Varos` varchar(50) DEFAULT NULL,
  `Cim` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `bulihely`
--

INSERT INTO `bulihely` (`HelyID`, `HelyNev`, `Stilus`, `ZeneStilusID`, `Orszag`, `Varos`, `Cim`) VALUES
(1, 'Instant-Fogas', 'indie', 2, 'Magyarország', 'Budapest', 'Budapest, Akácfa u. 51, 1073'),
(2, 'Akvárium Klub', NULL, NULL, NULL, NULL, 'Budapest, Erzsébet tér 12, 1051'),
(3, 'Dürer Kert', 'bohém', 4, 'Magyarország', 'Budapest', 'Budapest, Öböl u. 1, 1117'),
(4, 'LÄRM', 'induztriális', 6, 'Magyarország', 'Budapest', 'Budapest, Akácfa u. 51, 1073'),
(5, 'Barba Negra', NULL, NULL, NULL, NULL, 'Budapest, Neumann János u. 2, 1117');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `organizers`
--

DROP TABLE IF EXISTS `organizers`;
CREATE TABLE `organizers` (
  `OrganizerID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `PermissionLevel` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `preferences`
--

DROP TABLE IF EXISTS `preferences`;
CREATE TABLE `preferences` (
  `PrefID` int(11) NOT NULL,
  `Preference` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `prefuser`
--

DROP TABLE IF EXISTS `prefuser`;
CREATE TABLE `prefuser` (
  `UserID` int(11) NOT NULL,
  `PrefID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendezveny`
--

DROP TABLE IF EXISTS `rendezveny`;
CREATE TABLE `rendezveny` (
  `RendezvenyID` int(11) NOT NULL,
  `BuliID` int(11) DEFAULT NULL,
  `RNeve` varchar(50) NOT NULL,
  `Leiras` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reszvevok`
--

DROP TABLE IF EXISTS `reszvevok`;
CREATE TABLE `reszvevok` (
  `RendID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `BirthDate` date NOT NULL,
  `IsAdult` tinyint(1) NOT NULL,
  `Consent` tinyint(1) NOT NULL,
  `RegistrationDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `ModifiedDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `zenestilus`
--

DROP TABLE IF EXISTS `zenestilus`;
CREATE TABLE `zenestilus` (
  `ZeneStilusID` int(11) NOT NULL,
  `StilusNev` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `zenestilus`
--

INSERT INTO `zenestilus` (`ZeneStilusID`, `StilusNev`) VALUES
(1, 'Techno'),
(2, 'House'),
(3, 'EDM'),
(4, 'Hip-Hop'),
(5, 'Retro'),
(6, 'Rock'),
(7, 'Pop'),
(8, 'R&B'),
(9, 'Trance'),
(10, 'Reggae');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `bulihely`
--
ALTER TABLE `bulihely`
  ADD PRIMARY KEY (`HelyID`),
  ADD KEY `ZeneStilusID` (`ZeneStilusID`);

--
-- A tábla indexei `organizers`
--
ALTER TABLE `organizers`
  ADD PRIMARY KEY (`OrganizerID`),
  ADD KEY `UserID` (`UserID`);

--
-- A tábla indexei `preferences`
--
ALTER TABLE `preferences`
  ADD PRIMARY KEY (`PrefID`);

--
-- A tábla indexei `prefuser`
--
ALTER TABLE `prefuser`
  ADD PRIMARY KEY (`UserID`,`PrefID`),
  ADD KEY `PrefID` (`PrefID`);

--
-- A tábla indexei `rendezveny`
--
ALTER TABLE `rendezveny`
  ADD PRIMARY KEY (`RendezvenyID`),
  ADD KEY `BuliID` (`BuliID`);

--
-- A tábla indexei `reszvevok`
--
ALTER TABLE `reszvevok`
  ADD PRIMARY KEY (`RendID`),
  ADD KEY `UserID` (`UserID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- A tábla indexei `zenestilus`
--
ALTER TABLE `zenestilus`
  ADD PRIMARY KEY (`ZeneStilusID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `bulihely`
--
ALTER TABLE `bulihely`
  MODIFY `HelyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `organizers`
--
ALTER TABLE `organizers`
  MODIFY `OrganizerID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `preferences`
--
ALTER TABLE `preferences`
  MODIFY `PrefID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `rendezveny`
--
ALTER TABLE `rendezveny`
  MODIFY `RendezvenyID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `reszvevok`
--
ALTER TABLE `reszvevok`
  MODIFY `RendID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `zenestilus`
--
ALTER TABLE `zenestilus`
  MODIFY `ZeneStilusID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `bulihely`
--
ALTER TABLE `bulihely`
  ADD CONSTRAINT `bulihely_ibfk_1` FOREIGN KEY (`ZeneStilusID`) REFERENCES `zenestilus` (`ZeneStilusID`);

--
-- Megkötések a táblához `organizers`
--
ALTER TABLE `organizers`
  ADD CONSTRAINT `organizers_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Megkötések a táblához `prefuser`
--
ALTER TABLE `prefuser`
  ADD CONSTRAINT `prefuser_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `prefuser_ibfk_2` FOREIGN KEY (`PrefID`) REFERENCES `preferences` (`PrefID`);

--
-- Megkötések a táblához `rendezveny`
--
ALTER TABLE `rendezveny`
  ADD CONSTRAINT `rendezveny_ibfk_1` FOREIGN KEY (`BuliID`) REFERENCES `bulihely` (`HelyID`);

--
-- Megkötések a táblához `reszvevok`
--
ALTER TABLE `reszvevok`
  ADD CONSTRAINT `reszvevok_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
