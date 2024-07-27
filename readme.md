# xr--Raw-Sign

## 概述

**xr-Raw-Sign** 是一个为 Koishi 设计的插件，旨在通过提供签到功能来增强用户互动。该插件允许用户每天签到以获得奖励，如经验值和硬币。插件高度可定制，并且包含详细的中文注释，方便适应和修改。

## 功能

- **每日签到**：用户每天可以签到一次以获得奖励。
- **奖励系统**：用户根据可配置的参数获得经验值和硬币。
- **升级系统**：经验值用于用户升级，更高等级需要更多经验。
- **连续签到**：用户可以通过连续签到获得额外奖励。
- **可定制**：轻松调整奖励范围、额外经验等设置。

## 配置

插件可以通过 Koishi 插件配置文件进行配置。以下是一些关键配置选项：

- `minExperience`：每次签到的最低经验值。
- `maxExperience`：每次签到的最高经验值。
- `minCoins`：每次签到的最低硬币数。
- `maxCoins`：每次签到的最高硬币数。
- `consecutiveBonus`：连续签到的额外经验值。
- `experiencePerLevel`：升级所需的基础经验值。
- `levelMultiplier`：随着等级增加的经验需求倍增系数。
- `maxLevel`：用户可以达到的最高等级。
- `storagePath`：本地存储的 JSON 文件路径。

## 使用

将插件添加到你的 Koishi 机器人并根据需要配置设置后，用户就可以使用提供的命令进行每日签到。

### 命令

- `/签到`：执行每日签到以获得奖励。
- `/个人信息`：查看个人签到信息，包括当前等级、经验值和硬币数量。

## 自定义

插件内包含详细的中文注释，以便于自定义。你可以自由修改代码以更好地满足你的需求。

## 许可证和归属

该插件在以下条件下开放修改：

- **归属**：在修改或分发插件时，必须包含指向原始仓库的链接。
- **无担保**：插件按原样提供，不提供任何形式的担保。

有关更多详细信息，请参见 [LICENSE](https://choosealicense.com/licenses/mit/) 文件。

## 贡献

欢迎贡献！请通过 GitHub 仓库提交问题和拉取请求。

## 联系

- [@imadokinatsusa](https://github.com/imadokinatsusa)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)