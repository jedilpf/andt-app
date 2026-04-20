-- 安电通数据库初始化脚本
-- 版本: 1.0.0
-- 创建日期: 2026-04-08

-- 创建数据库
CREATE DATABASE IF NOT EXISTS `andiantong` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `andiantong`;

-- =============================================
-- 用户相关表
-- =============================================

-- 用户表
CREATE TABLE `user` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
    `phone` VARCHAR(20) UNIQUE COMMENT '手机号',
    `password` VARCHAR(255) COMMENT '密码（加密）',
    `nickname` VARCHAR(50) COMMENT '用户昵称',
    `real_name` VARCHAR(50) COMMENT '真实姓名',
    `avatar` VARCHAR(255) COMMENT '头像URL',
    `user_type` VARCHAR(20) DEFAULT 'user' COMMENT '用户类型：user/electrician',
    `gender` VARCHAR(10) COMMENT '性别：male/female',
    `wechat_open_id` VARCHAR(100) UNIQUE COMMENT '微信OpenID',
    `wechat_union_id` VARCHAR(100) COMMENT '微信UnionID',
    `points` INT DEFAULT 0 COMMENT '积分',
    `member_level` INT DEFAULT 0 COMMENT '会员等级：0-普通，1-VIP，2-SVIP',
    `balance` DECIMAL(10,2) DEFAULT 0.00 COMMENT '余额（元）',
    `status` INT DEFAULT 0 COMMENT '状态：0-正常，1-禁用',
    `last_login_time` DATETIME COMMENT '最后登录时间',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted` INT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除'
) ENGINE=InnoDB COMMENT='用户表';

-- 电工信息表
CREATE TABLE `electrician` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '电工ID',
    `user_id` BIGINT NOT NULL COMMENT '关联用户ID',
    `real_name` VARCHAR(50) NOT NULL COMMENT '真实姓名',
    `id_card` VARCHAR(20) COMMENT '身份证号',
    `license_no` VARCHAR(50) COMMENT '电工证号',
    `license_type` VARCHAR(20) COMMENT '证书类型',
    `license_expire` DATE COMMENT '证书有效期',
    `work_years` INT COMMENT '从业年限',
    `skills` JSON COMMENT '技能标签',
    `service_areas` JSON COMMENT '服务区域',
    `rating` DECIMAL(3,2) DEFAULT 5.00 COMMENT '评分',
    `order_count` INT DEFAULT 0 COMMENT '接单数',
    `income_total` DECIMAL(12,2) DEFAULT 0.00 COMMENT '累计收入',
    `verify_status` INT DEFAULT 0 COMMENT '认证状态：0-未认证，1-认证中，2-已认证，3-认证失败',
    `status` INT DEFAULT 0 COMMENT '状态：0-空闲，1-工作中，2-离线',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted` INT DEFAULT 0
) ENGINE=InnoDB COMMENT='电工信息表';

-- 用户地址表
CREATE TABLE `address` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '地址ID',
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `name` VARCHAR(50) COMMENT '地址名称',
    `contact_name` VARCHAR(50) COMMENT '联系人',
    `contact_phone` VARCHAR(20) COMMENT '联系电话',
    `province` VARCHAR(50) COMMENT '省',
    `city` VARCHAR(50) COMMENT '市',
    `district` VARCHAR(50) COMMENT '区',
    `detail` VARCHAR(255) COMMENT '详细地址',
    `longitude` DECIMAL(10,6) COMMENT '经度',
    `latitude` DECIMAL(10,6) COMMENT '纬度',
    `is_default` INT DEFAULT 0 COMMENT '是否默认：0-否，1-是',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted` INT DEFAULT 0
) ENGINE=InnoDB COMMENT='用户地址表';

-- =============================================
-- 订单相关表
-- =============================================

-- 订单表
CREATE TABLE `order` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '订单ID',
    `order_no` VARCHAR(32) UNIQUE NOT NULL COMMENT '订单编号',
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `electrician_id` BIGINT COMMENT '电工ID',
    `address_id` BIGINT COMMENT '地址ID',
    `service_type` VARCHAR(20) NOT NULL COMMENT '服务类型：repair/install/inspection',
    `service_name` VARCHAR(100) COMMENT '服务名称',
    `description` TEXT COMMENT '问题描述',
    `images` JSON COMMENT '图片列表',
    `price` DECIMAL(10,2) COMMENT '预估价格',
    `final_price` DECIMAL(10,2) COMMENT '最终价格',
    `status` VARCHAR(20) DEFAULT 'pending' COMMENT '状态：pending/accepted/ongoing/completed/cancelled',
    `scheduled_time` DATETIME COMMENT '预约时间',
    `start_time` DATETIME COMMENT '开始时间',
    `end_time` DATETIME COMMENT '完成时间',
    `rating` INT COMMENT '评分：1-5',
    `review` TEXT COMMENT '评价内容',
    `review_time` DATETIME COMMENT '评价时间',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='订单表';

-- 订单日志表
CREATE TABLE `order_log` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `order_id` BIGINT NOT NULL COMMENT '订单ID',
    `action` VARCHAR(50) COMMENT '操作',
    `operator_type` VARCHAR(20) COMMENT '操作者类型：user/electrician/system',
    `operator_id` BIGINT COMMENT '操作者ID',
    `remark` VARCHAR(255) COMMENT '备注',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='订单日志表';

-- =============================================
-- 商品相关表
-- =============================================

-- 商品表
CREATE TABLE `product` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '商品ID',
    `name` VARCHAR(100) NOT NULL COMMENT '商品名称',
    `category_id` BIGINT COMMENT '分类ID',
    `brand` VARCHAR(50) COMMENT '品牌',
    `description` TEXT COMMENT '描述',
    `images` JSON COMMENT '图片列表',
    `price` DECIMAL(10,2) NOT NULL COMMENT '售价',
    `original_price` DECIMAL(10,2) COMMENT '原价',
    `stock` INT DEFAULT 0 COMMENT '库存',
    `sales` INT DEFAULT 0 COMMENT '销量',
    `status` INT DEFAULT 1 COMMENT '状态：0-下架，1-上架',
    `sort_order` INT DEFAULT 0 COMMENT '排序',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted` INT DEFAULT 0
) ENGINE=InnoDB COMMENT='商品表';

-- 商品分类表
CREATE TABLE `category` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL COMMENT '分类名称',
    `parent_id` BIGINT DEFAULT 0 COMMENT '父分类ID',
    `icon` VARCHAR(255) COMMENT '图标',
    `sort_order` INT DEFAULT 0 COMMENT '排序',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='商品分类表';

-- 购物车表
CREATE TABLE `cart` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `product_id` BIGINT NOT NULL COMMENT '商品ID',
    `quantity` INT DEFAULT 1 COMMENT '数量',
    `selected` INT DEFAULT 1 COMMENT '是否选中',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='购物车表';

-- =============================================
-- 支付相关表
-- =============================================

-- 支付记录表
CREATE TABLE `payment` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `order_id` BIGINT NOT NULL COMMENT '订单ID',
    `payment_no` VARCHAR(32) UNIQUE COMMENT '支付流水号',
    `amount` DECIMAL(10,2) NOT NULL COMMENT '支付金额',
    `payment_type` VARCHAR(20) COMMENT '支付方式：wechat/alipay/balance',
    `status` VARCHAR(20) DEFAULT 'pending' COMMENT '状态：pending/success/failed/refunded',
    `transaction_id` VARCHAR(100) COMMENT '第三方交易号',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='支付记录表';

-- =============================================
-- 其他表
-- =============================================

-- 消息表
CREATE TABLE `message` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `type` VARCHAR(20) COMMENT '消息类型：system/order/promotion',
    `title` VARCHAR(100) COMMENT '标题',
    `content` TEXT COMMENT '内容',
    `is_read` INT DEFAULT 0 COMMENT '是否已读',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='消息表';

-- 优惠券表
CREATE TABLE `coupon` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL COMMENT '优惠券名称',
    `type` VARCHAR(20) COMMENT '类型：discount/reduction',
    `value` DECIMAL(10,2) COMMENT '优惠金额/折扣',
    `min_amount` DECIMAL(10,2) COMMENT '最低消费',
    `start_time` DATETIME COMMENT '开始时间',
    `end_time` DATETIME COMMENT '结束时间',
    `total_count` INT COMMENT '总数量',
    `used_count` INT DEFAULT 0 COMMENT '已使用数量',
    `status` INT DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='优惠券表';

-- 用户优惠券表
CREATE TABLE `user_coupon` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `coupon_id` BIGINT NOT NULL COMMENT '优惠券ID',
    `status` VARCHAR(20) DEFAULT 'unused' COMMENT '状态：unused/used/expired',
    `used_order_id` BIGINT COMMENT '使用的订单ID',
    `used_time` DATETIME COMMENT '使用时间',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='用户优惠券表';

-- =============================================
-- 初始化数据
-- =============================================

-- 初始化商品分类
INSERT INTO `category` (`name`, `parent_id`, `icon`, `sort_order`) VALUES
('电器配件', 0, 'icon-parts', 1),
('智能产品', 0, 'icon-smart', 2),
('安防设备', 0, 'icon-security', 3),
('照明灯具', 0, 'icon-light', 4),
('电工工具', 0, 'icon-tool', 5);

-- 插入测试用户
INSERT INTO `user` (`phone`, `password`, `nickname`, `user_type`, `points`, `status`) VALUES
('13800138000', '$2a$10$encrypted_password_here', '测试用户', 'user', 100, 0);

-- 插入测试电工
INSERT INTO `user` (`phone`, `password`, `nickname`, `user_type`, `points`, `status`) VALUES
('13800138001', '$2a$10$encrypted_password_here', '电工师傅', 'electrician', 0, 0);

INSERT INTO `electrician` (`user_id`, `real_name`, `work_years`, `rating`, `verify_status`) VALUES
(2, '张师傅', 5, 5.00, 2);

-- =============================================
-- 创建索引
-- =============================================

CREATE INDEX idx_user_phone ON `user`(`phone`);
CREATE INDEX idx_user_wechat ON `user`(`wechat_open_id`);
CREATE INDEX idx_order_user ON `order`(`user_id`);
CREATE INDEX idx_order_electrician ON `order`(`electrician_id`);
CREATE INDEX idx_order_status ON `order`(`status`);
CREATE INDEX idx_product_category ON `product`(`category_id`);
CREATE INDEX idx_cart_user ON `cart`(`user_id`);
CREATE INDEX idx_payment_order ON `payment`(`order_id`);
CREATE INDEX idx_message_user ON `message`(`user_id`);