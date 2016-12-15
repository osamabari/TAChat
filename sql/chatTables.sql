-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 15, 2016 at 05:23 AM
-- Server version: 5.5.52-0ubuntu0.14.04.1-log
-- PHP Version: 5.5.9-1ubuntu4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `og-words`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_child_message`
--

CREATE TABLE IF NOT EXISTS `tbl_child_message` (
  `childId` int(11) NOT NULL AUTO_INCREMENT,
  `chatId` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `is_read` enum('0','1') NOT NULL DEFAULT '0',
  `readTimestemp` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `timestamp` datetime NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`childId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Table structure for table `tbl_message`
--

CREATE TABLE IF NOT EXISTS `tbl_message` (
  `chatId` int(11) NOT NULL AUTO_INCREMENT,
  `from_id` int(11) NOT NULL,
  `to_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `message` longtext NOT NULL,
  `message_type` enum('1','2','3','4','5','6','7') NOT NULL COMMENT '1=>text, 2=> image,3=>audio,4=>video,5=>other, 6=>contact,7=>location',
  `filename` varchar(255) NOT NULL,
  `filesize` int(11) NOT NULL,
  `fileurl` varchar(2000) NOT NULL,
  `room_id` int(11) NOT NULL,
  `msgUUID` varchar(255) NOT NULL,
  `chatType` enum('1','2','3','4') NOT NULL COMMENT '1 one to one, 2 Group, 3 Broadcast, 4 Channel',
  `timestamp` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`chatId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
