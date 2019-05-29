-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 27, 2019 lúc 10:01 AM
-- Phiên bản máy phục vụ: 10.1.38-MariaDB
-- Phiên bản PHP: 7.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `WebBanSach`
--

CREATE DATABASE website character set utf8mb4 collate utf8mb4_unicode_ci;
USE website;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bills`
--

CREATE TABLE `bills` (
  `id` int(10) UNSIGNED NOT NULL,
  `user` int(10) NOT NULL,
  `products` int(10) NOT NULL,
  `number` int(5) NOT NULL,
  `coupon` varchar(20) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `ship` int(10) NOT NULL,
  `deal` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int(5) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `slug` varchar(50) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update-at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `name`, `slug`, `created_at`, `update-at`) VALUES
(3, 'a', 'a', '2019-05-26 08:22:35', '2019-05-26 17:10:02'),
(6, 'hello ab', 'hello-ab', '2019-05-26 10:05:59', '2019-05-26 11:55:05'),
(9, 'a', 'a', '2019-05-26 17:10:30', '2019-05-26 17:10:36');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `tensp` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `img` varchar(1000) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `gia` int(11) DEFAULT NULL,
  `sale` int(11) DEFAULT NULL,
  `category` int(5) DEFAULT NULL,
  `tt` tinyint(4) DEFAULT '0',
  `nd` text COLLATE utf8_unicode_520_ci,
  `view` int(11) DEFAULT '0',
  `hot` tinyint(4) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `role` tinyint(4) DEFAULT '0',
  `status` tinyint(4) DEFAULT '1',
  `img` varchar(1000) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `gender` int(1) DEFAULT NULL,
  `state` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `phone` varchar(11) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `born` date DEFAULT NULL,
  `card` varchar(50) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `wishlist` int(8) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`, `status`, `img`, `name`, `gender`, `state`, `email`, `phone`, `born`, `card`, `wishlist`, `created_at`, `update_at`) VALUES
(2, 'anca', 'aaasd', 1, 1, NULL, 'ádsad', 1, 'ff', 'ff', 'ff', '2019-05-18', '1', NULL, '2019-05-25 16:25:32', '2019-05-25 16:25:32');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`user`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
