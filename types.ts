
export interface CategoryCounts {
  classicCoffee: number;  // 经典咖啡
  flavorLatte: number;    // 风味奶咖
  fruitCoffee: number;    // 元气果咖
  caffeineFree: number;   // 无咖无茶特调
  milkTea: number;        // 鲜萃奶茶
  fruitTea: number;       // 清爽果茶
}

// Added OrderItem interface to support Order
export interface OrderItem {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

// Added Order interface to fix import error
export interface Order {
  id: string;
  date: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
}

// Added CategoryStat interface to fix import error
export interface CategoryStat {
  name: string;
  value: number;
  color: string;
}

// Added MonthlyStat interface to fix import error
export interface MonthlyStat {
  month: string;
  amount: number;
}

export interface CustomerData {
  phoneNumber: string;
  name: string;
  
  // Basic Info
  firstOrderDate: string;    // 第一杯时间
  firstOrderItem: string;    // 第一杯饮品
  
  // Favorite Item Stats
  favoriteItem: string;      // 年度最爱饮品
  favoriteItemCount: number; // 最爱饮品杯数
  preferenceDepth: string;   // 偏好深度 (e.g. "69.23%")
  favoriteItemRank: number;  // 最爱饮品单品排名
  topUserCount: number;      // 榜首用户杯数
  
  // Total Stats
  totalCups: number;         // 年度总杯数
  totalCupsRank: number;     // 总杯数排名
  totalCupsTitle?: string;   // 总杯数排名称号 (e.g. "年度冠军·牛饮至尊")
  
  // Exploration Stats
  distinctItemsCount: number; // 喝过的饮品种类数量
  explorationProgress: string; // 探索度 (e.g. "24/91")
  explorationTitle?: string;   // 探索度称号 (e.g. "风味探索达人")
  explorationRank: number;     // 探索度排名
  itemTitles: string[];        // 单品称号数组 (1-5)

  // Chart Data
  monthlyCounts: number[];   // 2025.01 - 2026.01 (13 elements)
  categoryCounts: CategoryCounts;
  
  orders: Order[]; // Updated from any[] to Order[] for better type safety
}
