
CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `users` (`id`, `username`, `password`, `admin`) VALUES
(1, 'asterix@irreductibles.fr', 'Le Plus Rapide & Intelligent', 1),
(2, 'obelix@irreductibles.fr', 'Pas Besoin de Potion Magique', 0);

CREATE TABLE `guesses` (
  `id` BIGINT UNSIGNED NOT NULL,
  `imagepath` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `guess` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `win` TINYINT SIGNED 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
