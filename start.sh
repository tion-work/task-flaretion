#!/bin/bash

echo "🚀 启动 Task Master 前端项目..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 请在 web/task 目录中运行此脚本"
    exit 1
fi

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

# 检查 npm 是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装，请先安装 npm"
    exit 1
fi

echo "✅ Node.js 和 npm 已安装"

# 检查依赖是否已安装
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
else
    echo "✅ 依赖已安装"
fi

# 检查环境变量文件
if [ ! -f ".env.local" ]; then
    echo "🔧 创建环境变量文件..."
    cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8080
EOF
    echo "✅ 环境变量文件已创建"
else
    echo "✅ 环境变量文件已存在"
fi

echo ""
echo "🌐 启动开发服务器..."
echo "前端将在 http://localhost:3000 启动"
echo "请确保后端服务在 http://localhost:8080 运行"
echo ""
echo "按 Ctrl+C 停止服务"
echo ""

# 启动开发服务器
npm run dev
