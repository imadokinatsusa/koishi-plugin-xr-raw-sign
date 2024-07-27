import { Context, Schema } from 'koishi'; // 从 koishi 库导入 Context 和 Schema 类型
import { apply as applySignInCommands } from './sign-in'; // 从 sign-in 文件导入 apply 函数并重命名为 applySignInCommands
import { setStoragePath } from './data-storage'; // 从 data-storage 文件导入 setStoragePath 函数

// 插件名称
export const name = 'xr-signin'; // 插件的名称

// 插件配置定义
export interface Config {
  minExperience: number; // min_经验值
  maxExperience: number; // max_经验值
  minCoins: number; // min_硬币数
  maxCoins: number; // max_硬币数
  consecutiveBonus: number; // 连签额外经验加成
  experiencePerLevel: number; // 每级所需经验值基准
  levelMultiplier: number; // 经验值倍增系数
  maxLevel: number; // 最大等级
  storagePath: string; // 存储路径
}

// 插件配置的 Schema，作为显示在前端插件的可修改部分
export const Config: Schema<Config> = Schema.object({
  minExperience: Schema.number().default(5).description('min_经验值'), // min_经验值，默认为 5
  maxExperience: Schema.number().default(15).description('max_经验值'), // max_经验值，默认为 15
  minCoins: Schema.number().default(1).description('min_硬币数'), // min_硬币数，默认为 1
  maxCoins: Schema.number().default(10).description('max_硬币数'), // max_硬币数，默认为 10
  consecutiveBonus: Schema.number().default(5).description('连签额外经验加成'), // 连续签到奖励的额外经验值，默认为 5
  experiencePerLevel: Schema.number().default(100).description('每级所需经验值基准'), // 每级所需的基准经验值，默认为 100
  levelMultiplier: Schema.number().default(1.5).description('经验值倍增系数'), // 经验值的倍增系数，默认为 1.5
  maxLevel: Schema.number().default(99).description('最大等级'), // 最高等级，默认为 99
  storagePath: Schema.string().default('data.json').description('存储路径') // 数据存储的路径，默认为 'data.json'
});

// 插件主函数
export function apply(ctx: Context) {
  const config = ctx.config as Config; // 获取插件配置
  setStoragePath(config.storagePath); // 设置存储路径

  applySignInCommands(ctx, config); // 应用sign-in中注册的命令
}
