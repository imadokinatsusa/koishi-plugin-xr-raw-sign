// 时间段响应消息
export const timeResponses: Record<string, string> = {
  morning: '早上好呀！迎接新一轮的早晨吧，阁下！', // 早晨的问候消息
  noon: '已经是中午了呢~要记得吃饭呀，阁下', // 中午的问候消息
  afternoon: '下午了...哼哼，让我看看是谁在摸鱼————', // 下午的问候消息
  evening: '这么快就进入夜晚啦...也不知道任务完成了没有...欸？是阁下呀~', // 晚上的问候消息
  night: '阁下这么晚了还不睡，抱着手机，在想什么呢？', // 深夜的问候消息
};

// 获取当前时间段
export function getTimeOfDay(): string {
  const hour = new Date().getHours(); // 获取当前小时

  // 根据小时返回对应的时间段
  if (hour >= 5 && hour < 11) {
    return 'morning'; // 早晨：5点到11点
  } else if (hour >= 11 && hour < 13) {
    return 'noon'; // 中午：11点到13点
  } else if (hour >= 13 && hour < 17) {
    return 'afternoon'; // 下午：13点到17点
  } else if (hour >= 17 && hour < 22) {
    return 'evening'; // 晚上：17点到22点
  } else {
    return 'night'; // 深夜：22点到次日早晨5点
  }
}
