-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 26. 18:19
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
(1, 11, 'Little big concert', ' Little Big delivers a high-energy, genre-bending concert experience, blending rave, punk, and pop with provocative visuals and infectious beats. Expect wild costumes, satirical humor, and a non-stop party vibe that gets the crowd moving.', '2025-05-16', 'Papp László Budapest Sportarén', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/little.jpg', '18:30', 3),
(2, 12, 'Verknipt Hungary', 'A high-energy hard techno rave in Budapest with top DJs, pounding beats, and immersive visuals. Expect a passionate crowd and an intense, industrial vibe.', '2025-07-14', 'Szabadság tér', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/rave.jpeg', '19:00', 3),
(3, 6, '44th National Táncház Festival and Fair', 'Hungary’s biggest traditional dance house festival, held in Budapest from April 4–6, 2025, with live folk music, dance workshops, performances, and craft fairs.', '2025-05-21', 'A38 Hajó', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/tanchaz.jpg', '18:00', 10),
(4, 2, 'Holi Peace Festival 2025', 'A vibrant celebration inspired by the Indian Holi festival, featuring live music, dance, and the joyful throwing of colored powders. It\'s a family-friendly event that promotes peace, love, and unity. ', '2025-07-25', 'Akvárium Klub​', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/hippik.jpg', '23:00', 7),
(5, 11, 'Sisi x Hundred Sins – Panel Opera', 'A unique fusion performance blending Sisi\'s hip-hop style with Hundred Sins\' electronic and operatic elements. The event featured guest artists like Gently Da Spittah’, DZSINDZSER, KRISTOAF, LIL FRAKK, NLP, and PANKA.', '2025-05-28', 'Papp László Budapest Sportarén', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/sisi.jpg', '22:30', 4),
(6, 6, 'Sziget Festival 2025', 'One of Europe’s largest and most diverse music and cultural festivals, Sziget 2025 will feature over 1,000 performances across multiple stages. Headliners include Post Malone, A$AP Rocky, Shawn Mendes, Charli XCX, Nelly Furtado, and Armin van Buuren. The festival offers a unique blend of music, art installations, workshops, and a vibrant international atmosphere. ', '2025-06-06', 'Hajógyári-sziget', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/sziget.jpg', '08:00:00', 7),
(7, 1, 'Techno Rave Night', 'An all-night techno extravaganza with leading DJs spinning deep, hypnotic beats in an industrial setting.', '2025-04-10', 'Instant-Fogas', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/technorave.png', '22:00', 1),
(8, 7, 'Pop Party Extravaganza', 'A vibrant pop music party featuring chart-topping hits, colorful visuals, and a dance floor that never stops.', '2025-04-18', 'Fogasház', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/poppartyextravaganza.jpg', '20:30', 7),
(9, 3, 'Rock Legends Tribute', 'A tribute night to classic rock legends with live bands covering hits from the 70s and 80s.', '2025-05-05', 'Dürer Kert', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/rocklegendstribute.avif', '19:00', 6),
(10, 10, 'R&B Sunset Vibes', 'A chill evening of smooth R&B tunes, cocktails, and sunset views, featuring live performances and DJ sets.', '2025-05-15', 'MOM Park Éjszakai Klub', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/r@bsunset.jpg', '18:00', 8),
(11, 4, 'Trance Awakening', 'A high-energy trance event with uplifting melodies and euphoric beats, featuring top trance DJs.', '2025-05-25', 'LÄRM', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/nemetbuli.jpg', '23:00', 9),
(12, 8, 'Retro Dance Fever', 'A nostalgic night of retro hits from the 80s and 90s, complete with disco lights and throwback vibes.', '2025-06-10', 'Corvin Klub', 'https://raw.githubusercontent.com/SeleverViktor/mestermunka/main/public/images/retriofa.jpg', '21:00', 5);

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
(5, 13),
(1, 19),
(5, 19),
(6, 19),
(4, 25),
(9, 25);

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
(13, 'tesztemail@gmail.com', 'tesztnev', '2004-02-04', 1, 1, '2025-04-12 17:25:17', '2025-04-16 06:21:46', '$2b$10$2wv8/mabmjCaHAOFtll08.UYNPqp5Qml2a.eEEViywHYATqzaLgh2', '/public/images/red.jpg'),
(19, 'most@gmail.com', 'most123', '2025-04-04', 0, 1, '2025-04-20 11:30:51', '2025-04-26 14:12:35', '$2b$10$ipXCAplHtKxk2mfM.bh4T.tMqrmyMI5xXilY9L0f6WZ1CuuCKFKtO', '/public/images/red.jpg'),
(20, '19@gmail.com', 'héié', '2025-02-22', 0, 1, '2025-04-20 11:31:18', '2025-04-20 11:31:18', '$2b$10$1EiWMhUWYJ8c/M91UPtQO.XOd6LJNL8YdONw0dxd2ikq3DItx72nW', NULL),
(21, 'fark@gmail.com', 'fark', '2025-04-17', 0, 1, '2025-04-20 19:57:06', '2025-04-20 19:57:06', '$2b$10$BZLsBJvBK0UyHqha.iomku8BtUF0B9fwk5uY.t2EGt.0qDVKEURKC', NULL),
(22, '1911@gmail.com', 'fsgss', '2025-04-05', 0, 1, '2025-04-20 19:58:38', '2025-04-20 19:58:38', '$2b$10$e3CaRYlXBiJWSyjGQQmyu.1cfA1UBoeoNK5msJIcd6dC2M/0fbpuu', NULL),
(25, 'tesztemail3@gmail.com', 'tesztnev', '2004-02-05', 1, 1, '2025-04-26 14:53:59', '2025-04-26 14:53:59', '$2b$10$6ygDqcMlVRQNeYe52uDeF.eL43FUx/qF7GWZQD7cwH.CKR7Hx507C', NULL);

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
-- AUTO_INCREMENT a táblához `rendezveny`
--
ALTER TABLE `rendezveny`
  MODIFY `RendezvenyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

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
