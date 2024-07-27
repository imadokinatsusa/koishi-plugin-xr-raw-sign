import { Context } from 'koishi'; // 从 koishi 库导入 Context 类型
import { getCurrentTimestamp, getExperienceForLevel } from './utils'; // 从 utils 文件导入获取当前时间戳和经验值计算函数
import { timeResponses, getTimeOfDay } from './time-responses'; // 从 time-responses 文件导入时间段响应和获取时间段的函数
import { loadData, saveData } from './data-storage'; // 从 data-storage 文件导入数据加载和保存函数

export function apply(ctx: Context, config: any) {
  // 注册 command[签到]
  ctx.command('签到', '来签个到吧~')
    .action(async ({ session }) => {
      const userId = session.userId; // 获取当前用户的 ID
      const currentTime = getCurrentTimestamp(); // 获取当前时间戳
      
      // 加载用户数据
      let data = loadData();
      if (!data[userId]) {
        // 如果该用户数据不存在，则初始化用户数据
        data[userId] = {
          lastSignIn: 0, // 上次签到时间，初始为 0
          consecutiveDays: 0, // 连续签到天数，初始为 0
          level: 1, // 用户等级，初始为 1
          experience: 0, // 用户经验值，初始为 0
          coins: 0 // 用户硬币数量，初始为 0
        };
      }
      
      const userData = data[userId]; // 获取用户数据
      const timeSinceLastSignIn = currentTime - userData.lastSignIn; // 计算上次签到至今的时间差

      // 判断是否断签
      if (timeSinceLastSignIn > 86400000) { // 超过 24 小时未签到视为断签
        userData.consecutiveDays = 0; // 断签则重置连续签到天数
      }

      // 检查是否已经签到
      if (userData.lastSignIn === currentTime) {
        return '阁下今天已经签到过了哦~'; // 如果今天已签到，则返回提示信息
      }

      // 计算今日奖励
      const experience = Math.floor(Math.random() * (config.maxExperience - config.minExperience + 1)) + config.minExperience; // 随机生成经验值
      const todayCoins = Math.floor(Math.random() * (config.maxCoins - config.minCoins + 1)) + config.minCoins; // 随机生成硬币数量
      const consecutiveBonus = userData.consecutiveDays > 0 ? config.consecutiveBonus : 0; // 连续签到奖励
      const todayAllExperience = experience + consecutiveBonus; // 今日总经验值，包括连续签到奖励

      // 更新用户数据
      userData.lastSignIn = currentTime; // 更新签到时间
      userData.consecutiveDays += 1; // 增加连续签到天数
      userData.experience += todayAllExperience; // 增加经验值
      userData.coins += todayCoins; // 增加硬币数量

      // 处理用户升级
      while (userData.experience >= getExperienceForLevel(userData.level, config)) {
        // 如果经验值足够升级
        userData.experience -= getExperienceForLevel(userData.level, config); // 扣除升级所需经验值
        userData.level += 1; // 升级
        if (userData.level > config.maxLevel) userData.level = config.maxLevel; // 如果超过最大等级限制，则设置为最大等级
      }

      // 保存用户数据
      saveData(data);

      // 返回签到结果
      const timeOfDay = getTimeOfDay(); // 获取当前时间段
      const response = timeResponses[timeOfDay] || '恭喜阁下签到成功~'; // 根据时间段选择响应信息，如果没有匹配，则使用默认信息
      return `${response}\n此次签到经验值+${todayAllExperience}，硬币+ ${todayCoins}\n阁下当前等级: ${userData.level}`; // 返回签到结果信息
    });

  // 注册 command[个人信息]
  ctx.command('个人信息', '查询阁下的签到信息')
    .action(async ({ session }) => {
      const userId = session.userId; // 获取当前用户的 ID

      // 加载用户数据
      let data = loadData();
      if (!data[userId]) {
        return '您还没有签到过哦，阁下\n请发送 /签到 来进行签到吧~'; // 如果该用户数据不存在，则返回提示信息
      }

      const userData = data[userId]; // 获取用户数据
      const currentLevel = userData.level; // 当前等级
      const nextLevelExperience = getExperienceForLevel(currentLevel + 1, config); // 获取下一级所需的经验值
      const currentExperience = userData.experience; // 当前经验值
      const experienceForNextLevel = nextLevelExperience; // 下一级所需经验值

      // 返回个人信息和距离升级所需经验值
      return `阁下的信息：\n当前等级: ${currentLevel}\n当前经验值: ${currentExperience}/${experienceForNextLevel}\n阁下持有的硬币数量: ${userData.coins}`;
    });
}
