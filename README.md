# 安电通家庭用电安全服务平台

> 专业的家庭用电安全服务平台，提供应急维修、免费检测、电工预约等一站式服务

## 项目简介

安电通是一款面向家庭的用电安全服务平台，致力于为用户提供便捷、专业、透明的电工服务体验。

### 核心功能

- **应急报修** - 快速响应家庭用电故障，30分钟内上门服务
- **免费检测** - 专业电工上门检测家庭用电安全隐患
- **电工预约** - 便捷预约认证电工，享受透明价格
- **积分商城** - 服务积分兑换商品，享受更多福利
- **智能家居** - 智能设备联动，实时监控家庭用电

## 技术架构

### 前端

- **框架**: React + TypeScript + Taro
- **状态管理**: Context API
- **UI 组件**: 自定义组件库
- **构建工具**: Vite

### 后端

- **架构**: Spring Cloud 微服务
- **服务**: API Gateway + User Service
- **数据库**: MySQL + Redis
- **中间件**: Nacos + Sentinel

### 移动端

- **跨平台**: Taro 编译为微信小程序 + Android App
- **原生支持**: Capacitor 打包为 Android APK

## 项目结构

```
├── backend/                 # Spring Cloud 后端服务
│   ├── gateway/            # API 网关
│   ├── user-service/      # 用户服务
│   └── database/          # 数据库脚本
├── pages/                 # 前端页面（TypeScript + React）
│   ├── user/              # 用户端页面
│   ├── electrician/       # 电工端页面
│   └── shared/            # 公共页面
├── components/            # 公共组件
├── context/              # 全局状态管理
├── android/              # Android 原生项目
├── PRD/                  # 产品需求文档
└── docs/                 # 项目文档
```

## 快速开始

### 前端开发

```bash
# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建生产版本
npm run build
```

### 后端服务

```bash
# 进入后端目录
cd backend

# 启动网关服务
cd gateway && mvn spring-boot:run

# 启动用户服务
cd user-service && mvn spring-boot:run
```

### Android App

```bash
# 同步前端到 Android 项目
npx cap sync android

# 打开 Android Studio
npx cap open android
```

## 环境要求

- Node.js >= 16
- JDK 11+
- MySQL 8.0+
- Redis 6.0+
- Maven 3.8+

## 许可证

Copyright 2026 未来申活（上海）数字科技有限公司. All rights reserved.

## 联系方式

- **公司**: 未来申活（上海）数字科技有限公司
- **产品**: 安电通家庭用电安全服务平台
