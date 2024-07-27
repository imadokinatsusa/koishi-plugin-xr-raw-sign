import * as fs from 'fs'; // 导入文件系统模块
import * as path from 'path'; // 导入路径模块

// 存储路径
let storagePath: string; // 存储文件的路径

// 设置存储路径
export function setStoragePath(path: string) {
  storagePath = path; // 设置存储路径
}

// 确保存储目录存在
function ensureDirectoryExistence(filePath: string) {
  const dir = path.dirname(filePath); // 获取文件所在的目录
  if (!fs.existsSync(dir)) { // 如果目录不存在
    fs.mkdirSync(dir, { recursive: true }); // 创建目录，递归创建所有必要的子目录
  }
}

// 加载数据
export function loadData(): Record<string, any> {
  if (fs.existsSync(storagePath)) { // 如果存储文件存在
    const data = fs.readFileSync(storagePath, 'utf8'); // 读取文件内容
    return JSON.parse(data); // 解析 JSON 数据并返回
  }
  return {}; // 如果文件不存在，则返回空对象
}

// 保存数据
export function saveData(data: Record<string, any>) {
  ensureDirectoryExistence(storagePath); // 确保存储目录存在
  fs.writeFileSync(storagePath, JSON.stringify(data, null, 2)); // 将数据转换为格式化的 JSON 字符串并保存到文件
}
