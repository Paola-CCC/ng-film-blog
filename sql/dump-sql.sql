-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : database:3306
-- Généré le : sam. 08 juin 2024 à 22:23
-- Version du serveur : 10.4.33-MariaDB-1:10.4.33+maria~ubu2004
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `u574090949_blog_films`
--
CREATE DATABASE IF NOT EXISTS `u574090949_blog_films`;

-- Utiliser la base de données
USE `u574090949_blog_films`;
-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(20) NOT NULL,
  `name` varchar(75) NOT NULL,
  `slug` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`) VALUES
(1, 'Action', 'action'),
(2, 'Comédie', 'comedie'),
(3, 'Drame', 'drame'),
(4, 'Science-fiction', 'science-fiction'),
(5, 'Fantaisie', 'fantaisie'),
(6, 'Documentaire', 'documentaire'),
(7, 'Horreur', 'horreur'),
(8, 'Romance', 'romance'),
(9, 'Aventure', 'aventure'),
(10, 'Animation', 'animation');

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `dislikesPosts`
--

CREATE TABLE `dislikesPosts` (
  `id` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `dislikedAt` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Jour du dislike'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `dislikesPosts`
--

INSERT INTO `dislikesPosts` (`id`, `postId`, `userId`, `dislikedAt`) VALUES
(1, 1, 2, '2024-05-06 17:12:58'),
(2, 3, 1, '2024-05-06 17:12:58'),
(3, 6, 2, '2024-05-06 17:12:58'),
(4, 3, 2, '2024-05-06 17:12:58'),
(6, 7, 1, '2024-05-06 18:47:43');

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `alt` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Date de création de la photo',
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Date de modification de la photo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `likesPosts`
--

CREATE TABLE `likesPosts` (
  `id` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `likedAt` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Jour du like'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `likesPosts`
--

INSERT INTO `likesPosts` (`id`, `postId`, `userId`, `likedAt`) VALUES
(1, 5, 2, '2024-05-06 17:12:42'),
(2, 4, 2, '2024-05-06 17:12:42'),
(3, 7, 2, '2024-05-06 17:12:42'),
(4, 2, 1, '2024-05-06 17:12:42');

-- --------------------------------------------------------

--
-- Structure de la table `notesPosts`
--

CREATE TABLE `notesPosts` (
  `id` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `value` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Date de création de la note',
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Date de modification de la note'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notesPosts`
--

INSERT INTO `notesPosts` (`id`, `postId`, `userId`, `value`, `createdAt`, `updatedAt`) VALUES
(1, 6, 1, 4, '2024-05-06 17:07:15', '2024-05-06 17:07:15'),
(2, 4, 2, 3, '2024-05-06 17:07:15', '2024-05-06 17:07:15'),
(3, 1, 2, 4.5, '2024-05-06 17:07:15', '2024-05-06 17:07:15'),
(4, 6, 2, 2, '2024-05-06 17:07:15', '2024-05-06 17:07:15'),
(5, 4, 1, 4, '2024-05-06 17:07:15', '2024-05-06 17:07:15');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT 'Titre du post',
  `thumbnail` varchar(255) DEFAULT NULL COMMENT 'Vignette pour le poste',
  `content` text NOT NULL COMMENT 'Contenu du post',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Date de création du post'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `title`, `thumbnail`, `content`, `createdAt`) VALUES
(1, 1, 'Premier post', 'https://media.senscritique.com/media/000004710747/0/inception.jpg', 'Ceci est le premier post sur ce site.', '2022-12-31 23:59:59'),
(2, 1, 'Deuxième post', 'https://media.senscritique.com/media/000015855491/300/dernier_train_pour_busan.jpg', 'Ceci est le deuxième post sur ce site.', '2022-12-31 23:59:59'),
(3, 1, 'Troisième post', 'https://www.hanabi.community/wp-content/uploads/2023/11/A-MAN_120x160-min-1-752x1024.jpg', 'Ceci est le troisième post sur ce site.', '2022-12-31 23:59:59'),
(4, 1, 'Quatième post', 'https://leclaireur.fnac.com/wp-content/uploads/2023/07/detail-de-l-affiche-de-la-version-restauree-de-asterix-et-obelix-mission-cleopatre-d-alain-chabat-1667751-1256x810.jpg', 'Ceci est le quatième post sur ce site.', '2022-12-31 23:59:59'),
(5, 1, 'Cinquième post', 'https://www.lavieeco.com/wp-content/uploads/2019/01/volubilis.jpg', 'Ceci est le cinquième post sur ce site.', '2022-12-31 23:59:59'),
(6, 1, 'Sixième post', 'https://www.challenges.fr/assets/img/2014/12/30/cover-r4x3w1200-5791d67672ec0-taken-3.jpg', 'Ceci est le sixième post sur ce site.', '2022-12-31 23:59:59'),
(7, 1, 'Septième post', 'https://fr.web.img5.acsta.net/medias/nmedia/18/83/59/73/19698109.jpg', 'Ceci est le septième post sur ce site.', '2022-12-31 23:59:59'),
(8, 1, 'Indiana Jones', 'https://remeng.rosselcdn.net/sites/default/files/dpistyles_v2/rem_16_9_1124w/2023/06/26/node_497527/13284173/public/2023/06/26/B9734614404Z.1_20230626100610_000%2BG1ON0VNH5.1-0.jpg?itok=FdbHUx1V1687766776', 'Indiana Jones au mexique', '2024-05-06 21:08:33');

-- --------------------------------------------------------

--
-- Structure de la table `posts_categories`
--

CREATE TABLE `posts_categories` (
  `id` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `posts_categories`
--

INSERT INTO `posts_categories` (`id`, `postId`, `categoryId`) VALUES
(1, 2, 8),
(2, 3, 3),
(3, 6, 10),
(4, 1, 16),
(5, 6, 4);

-- --------------------------------------------------------

--
-- Structure de la table `post_tags`
--

CREATE TABLE `post_tags` (
  `id` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `post_tags`
--

INSERT INTO `post_tags` (`id`, `postId`, `tagId`) VALUES
(2, 2, 9),
(1, 4, 11),
(3, 5, 16),
(4, 7, 5);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL COMMENT 'Nom du rôle'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'ADMIN'),
(2, 'STANDARD'),
(3, 'MODERATEUR');

-- --------------------------------------------------------

--
-- Structure de la table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `tags`
--

INSERT INTO `tags` (`id`, `name`, `slug`) VALUES
(1, 'Action', 'action'),
(2, 'Comédie', 'comedie'),
(3, 'Drame', 'drame'),
(4, 'Science-fiction', 'science-fiction'),
(5, 'Fantastique', 'fantastique'),
(6, 'Horreur', 'horreur'),
(7, 'Documentaire', 'documentaire'),
(8, 'Romance', 'romance'),
(9, 'Aventure', 'aventure'),
(10, 'Animation', 'animation'),
(11, 'Thriller', 'thriller'),
(12, 'Mystère', 'mystere'),
(13, 'Biographie', 'biographie'),
(14, 'Historique', 'historique'),
(15, 'Guerre', 'guerre'),
(16, 'Famille', 'famille'),
(17, 'Musique', 'musique'),
(18, 'Sport', 'sport'),
(19, 'Western', 'western'),
(20, 'Superhéros', 'superheros'),
(21, 'K-Drama', 'k-drama'),
(22, 'C-Drama', 'c-drama'),
(23, 'J-Drama', 'j-drama'),
(24, 'Romance Asiatique', 'romance-asiatique'),
(25, 'Arts Martiaux', 'film-d-arts-martiaux'),
(26, 'Anime Japonais', 'anime-japonais'),
(27, 'Film Historique Chinois', 'film-historique-chinois'),
(28, 'Film de Guerre Coréen', 'film-de-guerre-coreen'),
(29, 'Comédie Japonaise', 'comedie-japonaise'),
(30, 'Mystère Coréen', 'mystere-coreen');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `picture_avatar` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role_id`, `picture_avatar`, `createdAt`) VALUES
(1, 'Catherine Dupont', 'dupont@free.fr', '$2y$10$EElIbkuU5926aFTLQQXqgu1kvmQa6ulflzU8de3D2nQaXmBy.4WCa', 2, 'https://www.parismatch.com/lmnr/var/pm/public/media/image/2022/03/16/22/Catherine-Deneuve-en-50-photos-d-exception.jpg?VersionId=NnjgphHsAmHkRdqtFta3F.ePhMp7B8vv', '2024-05-06 17:27:52'),
(2, 'Jonathan Henry', 'henry@free.fr', '$2y$10$mFK..R7Y8fw2tErfUb70q.xorM1rEwIb3/Oj5qDf3S0csL5HuffGa', 2, 'https://media.vogue.fr/photos/5d42f36abf89b40008cd2a44/2:3/w_2560%2Cc_limit/GettyImages-488685851.jpg', '2024-05-06 17:28:21'),
(3, 'John Doe', 'doe@free.fr', '$2y$10$V63.oOo9Uz8darr87./6wuP/ZtnXHTRzucZ5YFlsOjNEp26oAbNLO', 2, 'https://www.voici.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F06.2F30.2Fc26431c7-9324-4ac0-8321-ded348df1e64.2Ejpeg/2048x1536/quality/80/kelly-rowland.jpeg', '2024-05-07 19:09:18');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_comment_post` (`postId`),
  ADD KEY `fk_comment_user` (`userId`);

--
-- Index pour la table `dislikesPosts`
--
ALTER TABLE `dislikesPosts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postIDs` (`postId`),
  ADD KEY `userIDs` (`userId`);

--
-- Index pour la table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `likesPosts`
--
ALTER TABLE `likesPosts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postIDss` (`postId`),
  ADD KEY `userIDss` (`userId`);

--
-- Index pour la table `notesPosts`
--
ALTER TABLE `notesPosts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_ids` (`postId`),
  ADD KEY `user_ID` (`userId`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userId`);

--
-- Index pour la table `posts_categories`
--
ALTER TABLE `posts_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postID` (`postId`),
  ADD KEY `categoryID` (`categoryId`);

--
-- Index pour la table `post_tags`
--
ALTER TABLE `post_tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `post_tag_unique` (`postId`,`tagId`),
  ADD KEY `postID` (`postId`),
  ADD KEY `tagID` (`tagId`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rolesID` (`role_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `dislikesPosts`
--
ALTER TABLE `dislikesPosts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `likesPosts`
--
ALTER TABLE `likesPosts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `notesPosts`
--
ALTER TABLE `notesPosts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `posts_categories`
--
ALTER TABLE `posts_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `post_tags`
--
ALTER TABLE `post_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `dislikesPosts`
--
ALTER TABLE `dislikesPosts`
  ADD CONSTRAINT `postIDs` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userIDs` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `likesPosts`
--
ALTER TABLE `likesPosts`
  ADD CONSTRAINT `postIDss` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userIDss` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `notesPosts`
--
ALTER TABLE `notesPosts`
  ADD CONSTRAINT `post_ids` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ID` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `userID` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `post_tags`
--
ALTER TABLE `post_tags`
  ADD CONSTRAINT `postID` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tagID` FOREIGN KEY (`tagId`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `rolesID` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
