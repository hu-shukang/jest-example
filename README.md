# Jest 用法和使用场景总结

这是一个用于记录和演示Jest测试框架各种用法和使用场景的项目。

## 项目结构

```
jest-example/
├── src/              # 源代码文件
├── tests/            # 测试文件
├── examples/         # 示例和演示
├── jest.config.js    # Jest配置文件
├── tsconfig.json     # TypeScript配置文件
└── package.json      # 项目配置
```

## 快速开始

### 安装依赖
```bash
npm install
```

### 运行测试
```bash
npm test              # 运行所有测试
npm run test:watch   # 监视模式运行测试
npm run test:coverage # 生成测试覆盖率报告
```

### 编译TypeScript
```bash
npm run build        # 编译源代码
npm run clean        # 清理编译和覆盖率输出
```

## Jest 使用场景

### 1. 基础断言 (Basic Assertions)
- test() / it()
- expect() 和各种匹配器
- toBe(), toEqual(), toStrictEqual() 等

### 2. 异步测试 (Async Testing)
- Promises
- async/await
- Callbacks

### 3. 模拟 (Mocking)
- jest.fn()
- jest.spyOn()
- jest.mock()
- 模拟模块和依赖

### 4. 生命周期钩子 (Setup and Teardown)
- beforeEach()
- afterEach()
- beforeAll()
- afterAll()

### 5. 测试分组 (Test Grouping)
- describe() 分组测试
- 嵌套分组

### 6. 快照测试 (Snapshot Testing)
- toMatchSnapshot()

### 7. 覆盖率报告 (Code Coverage)
- 配置覆盖率阈值
- 生成覆盖率报告

## 学习目标

通过这个项目，可以学习到：
- Jest的核心概念和API
- 如何编写高效的单元测试
- 如何使用Jest处理异步代码
- 如何使用模拟(Mock)隔离测试
- 如何组织和管理测试代码
