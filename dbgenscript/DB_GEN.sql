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

CREATE TABLE admin (
  id int(10) UNSIGNED NOT NULL,
  name varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  address varchar(500) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  email varchar(100) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  password varchar(100) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  phone int(10) DEFAULT NULL,
  status tinyint(4) DEFAULT '1',
  level tinyint(4) DEFAULT '0',
  avatar varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng bills
--

CREATE TABLE bills (
  id int(10) UNSIGNED NOT NULL,
  user int(10) NOT NULL,
  products int(10) NOT NULL,
  number int(5) NOT NULL,
  coupon varchar(20) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  ship int(10) NOT NULL,
  deal tinyint(4) NOT NULL DEFAULT '1',
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  update_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng category
--

CREATE TABLE category (
  id int(5) UNSIGNED NOT NULL,
  name varchar(50) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  slug varchar(50) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  update_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Đang đổ dữ liệu cho bảng category
--

INSERT INTO category (id, name, slug, created_at, update_at) VALUES
(13, 'Ngôn Tình', 'ngon-tinh', '2019-05-28 18:37:04', '2019-05-28 18:37:04'),
(14, 'Truyện Tranh', 'truyen-tranh', '2019-05-28 18:37:39', '2019-05-28 18:37:39'),
(15, 'Trẻ em', 'tre-em', '2019-05-28 18:37:48', '2019-05-28 18:37:48'),
(16, 'Thể loại khác', 'the-loai-khac', '2019-05-28 18:38:09', '2019-05-28 18:38:09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng products
--

CREATE TABLE products (
  id int(10) UNSIGNED NOT NULL,
  name varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  slug varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  price int(11) DEFAULT NULL,
  sale int(11) DEFAULT NULL,
  thunbar varchar(1000) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  category_id int(5) DEFAULT NULL,
  content text COLLATE utf8_unicode_520_ci,
  number int(11) NOT NULL DEFAULT '0',
  tt tinyint(4) DEFAULT '0',
  view int(11) DEFAULT '0',
  hot tinyint(4) DEFAULT '0',
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  update_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Đang đổ dữ liệu cho bảng products
--

INSERT INTO products (id, name, slug, price, sale, thunbar, category_id, content, number, tt, view, hot, created_at, update_at) VALUES
(4, '5 Centimet trên giây', '5-centimet-tren-giay', 30000, NULL, '2.1.jpg', 13, '5 Centimet trên giây (Nhật: 秒速5センチメートル, Hepburn: Byōsoku Go Senchimētoru?) là một phim anime do Shinkai Makoto đạo diễn và hãng CoMix Wave thực hiện. Bộ phim được công chiếu lần đầu vào ngày 03 tháng 3 năm 2007 tại rạp ở Shibuya, Tokyo[1]. Cốt truyện xoay quanh mối quan hệ của một cậu bé tên Tōno Takaki với một cô gái là bạn từ khi còn đi học vào khoảng những năm 1990 cho đến thời hiện đại, nhưng giữa họ luôn có một khoảng cách và thường chỉ liên lạc với nhau từ xa qua thư hay điện thoại. Bộ phim giành được giải Phim hoạt hình xuất sắc nhất tại lễ trao giải điện ảnh châu Á Thái Bình Dương năm 2007.', 100, 0, 0, 0, '2019-05-28 18:41:25', '2019-05-28 19:19:08'),
(5, 'Chào mừng đến với NKH', 'chao-mung-den-voi-nkh', 25000, NULL, '1.jpg', 13, 'ád', 10, 0, 0, 0, '2019-05-28 18:53:00', '2019-05-28 19:24:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng user
--

CREATE TABLE user (
  id int(10) UNSIGNED NOT NULL,
  username varchar(50) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  password varchar(50) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  role tinyint(4) DEFAULT '0',
  status tinyint(4) DEFAULT '1',
  img varchar(1000) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  name varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  gender int(1) DEFAULT NULL,
  state varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  email varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  phone varchar(11) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  born date DEFAULT NULL,
  card varchar(50) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  wishlist int(8) DEFAULT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  update_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Đang đổ dữ liệu cho bảng user
--

INSERT INTO user (id, username, password, role, status, img, name, gender, state, email, phone, born, card, wishlist, created_at, update_at) VALUES
(2, 'anca', 'aaasd', 1, 1, NULL, 'ádsad', 1, 'ff', 'ff', 'ff', '2019-05-18', '1', NULL, '2019-05-25 16:25:32', '2019-05-25 16:25:32');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng admin
--
ALTER TABLE admin
  ADD PRIMARY KEY (id);

--
-- Chỉ mục cho bảng bills
--
ALTER TABLE bills
  ADD PRIMARY KEY (user);

--
-- Chỉ mục cho bảng category
--
ALTER TABLE category
  ADD PRIMARY KEY (id);

--
-- Chỉ mục cho bảng products
--
ALTER TABLE products
  ADD PRIMARY KEY (id);

--
-- Chỉ mục cho bảng user
--
ALTER TABLE user
  ADD PRIMARY KEY (id);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng admin
--
ALTER TABLE admin
  MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng category
--
ALTER TABLE category
  MODIFY id int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng products
--
ALTER TABLE products
  MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng user
--
ALTER TABLE user
  MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;