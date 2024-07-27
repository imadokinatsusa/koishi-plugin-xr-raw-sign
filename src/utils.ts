// 获取当前时间戳（以天为单位）
export function getCurrentTimestamp(): number {
  // 当前时间的零点时间戳（单位为毫秒）
  return Math.floor(Date.now() / 86400000) * 86400000;
  // Date.now() 获取当前时间的时间戳（单位为毫秒）
  // 86400000 毫秒等于 1 天
  // 通过除以 86400000 将时间戳转换为天数，然后使用 Math.floor() 向下取整，得到零点时间戳
}

// 根据等级计算所需经验值（无小数），等级 1 需要基准经验值
export function getExperienceForLevel(level: number, config: any): number {
  // 如果等级为 1，返回基准经验值
  if (level <= 1) return config.experiencePerLevel;

  let experienceNeeded = 0; // 累计所需经验值
  let currentMultiplier = 1; // 当前的经验需求倍增因子

  // 从等级 2 开始逐级计算所需经验值，等级 1 返回默认
  for (let i = 2; i <= level; i++) {
    // 累加每个等级所需的经验值
    experienceNeeded += config.experiencePerLevel * currentMultiplier;
    // 将倍增因子乘以配置中的等级倍增器，实现经验需求的指数级增加
    currentMultiplier *= config.levelMultiplier;
  }

  return Math.floor(experienceNeeded); // 确保经验值为整数
}
