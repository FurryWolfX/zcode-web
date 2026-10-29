# 项目档案

## 基本信息
- **项目名称**: zcode-web
- **项目类型**: Vite 8 + Vue 3 单页应用（字库简码练习工具）

## 技术栈
- **主要语言**: TypeScript（Vue 3 / `<script setup>`）
- **核心依赖**: `vue` ^3.5.44
- **构建工具**: `vite` ^8.3.5，配 `@vitejs/plugin-vue` ^6.0.10
- **类型检查**: `vue-tsc` ^3.3.13、`typescript` ^6.0.3
- **测试框架**: 无（`npm run typecheck` 用 `vue-tsc` 做类型检查）

## 目录结构
```
zcode-web/
├── index.html          # 页面骨架：标题、favicon、normalize.css
├── src/
│   ├── main.ts         # createApp 挂载到 #app
│   ├── App.vue         # 主页面
│   └── assets/
│       └── data.ts     # 一/二级简码字符映射表（Record<string, string>）
├── public/             # 原样复制到构建产物根目录（favicon.ico、.nojekyll）
├── vite.config.ts      # base、插件、dev/preview 端口
├── tsconfig.json       # 应用与 vite.config.ts 共用
└── package.json
```

## 入口文件
- **主入口**: `index.html` → `src/main.ts` → `src/App.vue`，无路由的 SPA

页面随机显示一个字库汉字，你输入对应拼音简码后回车判定，答对换字、答错提示正确简码。

## 开发规范
- **代码规范**: TypeScript strict，含 `noUncheckedIndexedAccess`、`noUnusedLocals`、`verbatimModuleSyntax`
- **格式化**: 无
- **提交规范**: 无

## 环境要求
- **Node.js**: >= 20.19 或 >= 22.12（Vite 8 要求，当前开发环境 v24）
- **安装依赖**: `npm install`
- **运行方式**:
  - `npm run dev`: 开发服务器，端口 3008
  - `npm run build`: 构建到 `dist/`
  - `npm run preview`: 预览 `dist/`，端口 3008
  - `npm run typecheck`: `vue-tsc --noEmit` 类型检查

## 注意事项
- `vite.config.ts` 中 `base` 为 `/zcode-web/`，对应 GitHub Pages 的子路径。开发服务器和预览服务器都从 `http://127.0.0.1:3008/zcode-web/` 打开。
- `index.html` 里的静态资源写 `/favicon.ico`，由 Vite 补上 base。写死 `/zcode-web/favicon.ico` 会拼成 `/zcode-web/zcode-web/favicon.ico`。
- `public/` 的内容原样复制到 `dist/` 根目录，`.nojekyll` 防止 GitHub Pages 的 Jekyll 忽略构建产物。
- **TS 陷阱**: 开启 `noUncheckedIndexedAccess` 后，数组和对象索引访问返回 `T | undefined`，需要显式判空（如 `dataKeys[i] ?? null`）；`ref` 的 `.value` 在表达式中不会被窄化，先解构到局部变量再判断。
- **TypeScript 停在 6.x，不要升 7**: TS 7 改由 Go 编写的原生编译器实现，发布包里没有 `./lib/tsc` 这个 JS Compiler API 入口，`vue-tsc` 3.3.13 对 7.0.2 和 7.1.0-beta 都报 `ERR_PACKAGE_PATH_NOT_EXPORTED: Package subpath './lib/tsc' is not defined`。npm 上 `vue-tsc` 的 peer 写的是 `>=5.0.0`，但 7.x 实际跑不了。等 [language-tools#5381](https://github.com/vuejs/language-tools/issues/5381) 的 tsgo 支持落地再升。
