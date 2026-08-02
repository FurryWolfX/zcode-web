# 项目档案

## 基本信息
- **项目名称**: zcode-web
- **项目类型**: Nuxt 4 SPA 前端应用（字库简码练习工具）

## 技术栈
- **主要语言**: TypeScript（Vue 3 / Nuxt 4，`<script setup>`）
- **核心依赖**: nuxt ^4.5.1
- **构建工具**: Nuxt 4（内置 Vite/Rolldown 构建）
- **测试框架**: 无（`npm run typecheck` 用 vue-tsc 做类型检查）

## 目录结构
```
zcode-web/
├── app/                # Nuxt 4 标准应用目录
│   ├── app.vue         # 应用根组件
│   ├── assets/         # data.ts - 一/二级简码字符映射表（Record<string, string>）
│   └── pages/          # index.vue - 主页面
├── public/             # 静态资源（favicon.ico、.nojekyll），原样复制到构建产物
├── nuxt.config.ts      # Nuxt 配置
├── tsconfig.json       # 继承 .nuxt/tsconfig.json
└── package.json
```

## 入口文件
- **主入口**: `app/pages/index.vue`（SPA 单页，随机显示字库汉字，输入对应拼音简码进行练习）

## 开发规范
- **代码规范**: TypeScript strict（Nuxt 默认，含 `noUncheckedIndexedAccess`）
- **格式化**: 无
- **提交规范**: 无

## 环境要求
- **Node.js**: >= 20（当前开发环境 v24）
- **运行方式**: `npm run dev`（开发，端口 3008） / `npm run build`（构建）/ `npm run generate`（生成静态站点）/ `npm run typecheck`（类型检查）

## 注意事项
- `nuxt.config.ts` 中 `app.baseURL` 为 `/zcode-web/`，部署到 GitHub Pages 的子路径
- `npm run generate` 产物在 `.output/public/`：SPA 模式自动生成 `200.html` 回退页，`public/.nojekyll` 防止 Jekyll 忽略 `_nuxt/` 目录
- **TS 陷阱**: Nuxt 默认开启 `noUncheckedIndexedAccess`，数组/对象索引访问返回 `T | undefined`，需要显式判空（如 `dataKeys[i] ?? null`）；`ref` 的 `.value` 在表达式中不会被窄化，先解构到局部变量再判断
- **vue-router 需顶层安装**: Nuxt 4 用 vue-router 5，默认嵌套在 `nuxt/node_modules` 下，vue-tsc 解析 `vue-router/volar/sfc-route-blocks` 会失败，需显式 `npm i -D vue-router` 提升到顶层
- **TypeScript 用 5.x，不要升 7.x**: TS 7（原生编译器）虽已发布，但 vue-tsc 3.3.9（latest）尚未适配，`nuxt typecheck` 报 `ERR_PACKAGE_PATH_NOT_EXPORTED`；待 vue-tsc 支持后再升级
