# 学生管理系统

基于 Vue 3 + Node.js 的学生管理系统，提供完整的 CRUD 功能。

## 功能特性

- 查询所有学生（GET /api/students）
- 根据 ID 查询学生（GET /api/students/{id}）
- 添加学生（POST /api/students）
- 修改学生（PUT /api/students/{id}）
- 删除学生（DELETE /api/students/{id}）

## 技术栈

**前端：**
- Vue 3 (Composition API)
- Vite
- Tailwind CSS

**后端：**
- Node.js
- Express

## 快速开始

### 启动前端

```bash
npm install
npm run dev
```

### 启动后端（可选）

```bash
cd server
npm install
npm run dev
```

前端默认运行在 http://localhost:5173，后端 API 运行在 http://localhost:3001。

## 项目结构

```
├── src/
│   ├── components/
│   │   ├── HeaderSection.vue    # 页面头部
│   │   ├── StatsCards.vue       # 统计卡片
│   │   ├── SearchBar.vue        # 搜索栏
│   │   ├── StudentTable.vue     # 学生表格
│   │   ├── StudentModal.vue     # 添加/编辑模态框
│   │   └── ConfirmDialog.vue    # 确认对话框
│   ├── App.vue                  # 主应用
│   ├── main.js                  # 入口文件
│   └── style.css                # 全局样式
├── server/
│   └── index.js                 # API 服务器
└── index.html
```
