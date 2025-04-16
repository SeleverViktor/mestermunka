-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 16. 09:54
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

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
(2, 'Akvárium Klub', 'vibrant', 9, 'Magyarország', 'Budapest', 'Budapest, Erzsébet tér 12, 1051'),
(3, 'Dürer Kert', 'bohém', 4, 'Magyarország', 'Budapest', 'Budapest, Öböl u. 1, 1117'),
(4, 'LÄRM', 'induztriális', 6, 'Magyarország', 'Budapest', 'Budapest, Akácfa u. 51, 1073'),
(5, 'Barba Negra', 'punk', 6, 'Magyarország', 'Budapest', 'Budapest, Neumann János u. 2, 1117'),
(6, 'A38 Hajó', 'induztriális', 10, 'Magyarország', 'Budapest', '1051 Budapest, Petőfi hajóállomás (Duna-part)'),
(7, 'Fogasház', 'alternatív', 7, 'Magyarország', 'Budapest', '1052 Budapest, Akadémia utca 6.'),
(8, 'Corvin Klub', 'underground', 7, 'Magyarország', 'Budapest', '1082 Budapest, Üllői út 4.'),
(9, 'Központ', 'postmodern', 5, 'Magyarország', 'Budapest', '1065 Budapest, Nagymező utca 44.'),
(10, 'MOM Park Éjszakai Klub', 'elegant', 8, 'Magyarország', 'Budapest', ' 1117 Budapest, Pesti út 138. (MOM Park bevásárlók'),
(11, 'Papp László Budapest Sportaréna​', 'indie', 6, 'Magyarország', 'Budapest', 'Papp László Budapest Sportaréna​'),
(12, 'SzabadságTér', 'bohem', 2, 'Magyarország', 'Budapest', 'Szabadság tér 1., 1054');

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
  `Leiras` text DEFAULT NULL,
  `Datum` date NOT NULL,
  `Helyszin` varchar(30) NOT NULL,
  `pictures` varchar(255) DEFAULT NULL,
  `Start` varchar(20) DEFAULT NULL,
  `ZeneId` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `rendezveny`
--

INSERT INTO `rendezveny` (`RendezvenyID`, `BuliID`, `RNeve`, `Leiras`, `Datum`, `Helyszin`, `pictures`, `Start`, `ZeneId`) VALUES
(1, 11, 'XLIV. Országos Táncháztalálkozó és Kirakodóvásár', 'Az élő népművészet összművészeti fesztiválja, ahol táncházak, népművészeti vásár és gálaműsorok várják a látogatókat. ', '2025-04-06', 'Papp László Budapest Sportarén', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/little.jpg', '18:30', 3),
(2, 12, 'Szent Patrik Fesztivál és Felvonulás​', 'Ír kultúrát ünneplő rendezvény felvonulással, élő zenével, tánccal és ír ételekkel. ', '2025-03-16', 'Szabadság tér', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/rave.jpeg', '19:00', 3),
(3, 6, 'Fatal Error lemezbemutató és búcsúkoncert​', 'A 14 éves fennállását lezáró zenekar különleges koncerttel búcsúzik, vendégként a The Pontiac zenekarral.', '2025-03-21', 'A38 Hajó', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/tanchaz.jpg', '18:00', 6),
(4, 2, 'Airbourne koncert​', 'Az ausztrál hard rock zenekar energikus koncertje, amely ismét felrázza a budapesti közönséget.', '2025-03-25', 'Akvárium Klub​', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/hippik.jpg', '23:00', 6),
(5, 11, 'Konyhakiállítás 2025', 'Magyarország legnagyobb konyhabútorokat, konyhagépeket és konyhai eszközöket bemutató kiállítása, több mint 100 kiállítóval.', '2025-05-28', 'Papp László Budapest Sportarén', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/sisi.jpg', '22:30', 5),
(6, 6, 'Sziget Fesztivál', 'A világ egyik legnagyobb zenei és kulturális fesztiválja, amely 2025. augusztus 6. és 11. között kerül megrendezésre Budapesten, a Hajógyári-szigeten. A rendezvényen világszintű előadók és változatos programok várják a látogatókat.', '2025-06-06', 'Hajógyári-sziget', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/sziget.jpg', '08:00:00', 6);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reszvevok`
--

DROP TABLE IF EXISTS `reszvevok`;
CREATE TABLE `reszvevok` (
  `RendezvenyID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `reszvevok`
--

INSERT INTO `reszvevok` (`RendezvenyID`, `UserID`) VALUES
(5, 12),
(5, 13);

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
  `ModifiedDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `password` varchar(255) NOT NULL,
  `ProfilePicture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`UserID`, `Email`, `Name`, `BirthDate`, `IsAdult`, `Consent`, `RegistrationDate`, `ModifiedDate`, `password`, `ProfilePicture`) VALUES
(10, '19790213sziszko@gmail.com', 'tesztnev', '2003-07-10', 1, 1, '2025-04-12 12:13:15', '2025-04-12 17:17:32', '$2b$10$bwvKr2gwYC.Q9Q2Nc0lCLusOPJMBxu0BDi9SciTTMsGpn8dUR4PG2', '/public/images/yellow.jpg'),
(11, 'jani.vok.gaming@gmail.com', 'tesztnev', '2005-04-16', 1, 1, '2025-04-12 16:53:51', '2025-04-12 17:17:19', '$2b$10$NU7Nrg5Y7OMg.QcOYmd33.TsgmGVrqfiLNd0ANsNrnTrQwqfoHQ.u', '/public/images/gray.jpg'),
(12, 'tesztemail2@gmail.com', 'tesztnev', '2004-06-13', 1, 1, '2025-04-12 17:22:59', '2025-04-16 06:22:01', '$2b$10$B7Nvwnn0yDSNsMwZWHAxMu5wYr.XicNLDPP3PO7ozrLB9CaByNb5S', '/public/images/blue.jpg'),
(13, 'tesztemail@gmail.com', 'tesztnev', '2004-02-04', 1, 1, '2025-04-12 17:25:17', '2025-04-16 06:21:46', '$2b$10$2wv8/mabmjCaHAOFtll08.UYNPqp5Qml2a.eEEViywHYATqzaLgh2', '/public/images/red.jpg');

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
  ADD PRIMARY KEY (`UserID`,`RendezvenyID`),
  ADD KEY `UserID` (`UserID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `email` (`Email`);

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
  MODIFY `HelyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
  MODIFY `RendezvenyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
