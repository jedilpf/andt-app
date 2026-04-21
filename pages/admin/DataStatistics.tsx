
import React, { useState } from 'react';
import { TrendingUp, Users, ShoppingCart, Wallet, Download, Calendar, ChevronDown } from 'lucide-react';

type TimeRange = 'day' | 'week' | 'month';

interface ChartData {
  label: string;
  value: number;
}

export const DataStatistics = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [selectedDate, setSelectedDate] = useState('2026-04-01 ~ 2026-04-20');

  const statsOverview = {
    totalUsers: 1258,
    userGrowth: 12.5,
    totalOrders: 4856,
    orderGrowth: 8.3,
    totalRevenue: 896500,
    revenueGrowth: 15.2,
    avgRating: 4.8,
  };

  const userGrowthData: ChartData[] = [
    { label: '周一', value: 120 },
    { label: '周二', value: 135 },
    { label: '周三', value: 98 },
    { label: '周四', value: 156 },
    { label: '周五', value: 178 },
    { label: '周六', value: 245 },
    { label: '周日', value: 198 },
  ];

  const serviceTypeData: ChartData[] = [
    { label: '急修', value: 45 },
    { label: '安装', value: 30 },
    { label: '检测', value: 25 },
  ];

  const revenueData: ChartData[] = [
    { label: '服务收入', value: 75 },
    { label: '平台奖励', value: 15 },
    { label: '其他', value: 10 },
  ];

  const maxUserGrowth = Math.max(...userGrowthData.map(d => d.value));
  const maxService = Math.max(...serviceTypeData.map(d => d.value));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white px-4 pt-8 pb-16">
        <h1 className="text-xl font-bold">数据统计</h1>
        <p className="text-blue-200 text-sm mt-1">平台运营数据分析</p>
      </div>

      <div className="px-4 -mt-10">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">数据概览</h2>
            <div className="flex items-center gap-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                className="px-3 py-1.5 bg-gray-50 rounded-lg text-sm border border-gray-200"
              >
                <option value="day">今日</option>
                <option value="week">本周</option>
                <option value="month">本月</option>
              </select>
              <button className="p-2 bg-gray-50 rounded-lg">
                <Download size={16} className="text-gray-500"/>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-blue-600"/>
                <span className="text-xs text-gray-500">用户总数</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{statsOverview.totalUsers.toLocaleString()}</p>
              <span className="text-xs text-green-600 font-bold">+{statsOverview.userGrowth}%</span>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart size={16} className="text-green-600"/>
                <span className="text-xs text-gray-500">订单总数</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{statsOverview.totalOrders.toLocaleString()}</p>
              <span className="text-xs text-green-600 font-bold">+{statsOverview.orderGrowth}%</span>
            </div>

            <div className="bg-amber-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wallet size={16} className="text-amber-600"/>
                <span className="text-xs text-gray-500">总收入</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">¥{(statsOverview.totalRevenue / 10000).toFixed(1)}万</p>
              <span className="text-xs text-green-600 font-bold">+{statsOverview.revenueGrowth}%</span>
            </div>

            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-purple-600"/>
                <span className="text-xs text-gray-500">平均评分</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{statsOverview.avgRating}</p>
              <span className="text-xs text-gray-400">/ 5.0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">用户增长趋势</h2>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-bold">+12.5%</span>
          </div>
          <div className="flex items-end justify-between h-40 px-4">
            {userGrowthData.map((d, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className="w-8 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all"
                  style={{ height: `${(d.value / maxUserGrowth) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-400 mt-2">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4">服务类型分布</h2>
          <div className="space-y-3">
            {serviceTypeData.map((d, idx) => {
              const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500'];
              return (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-12">{d.label}</span>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors[idx]} rounded-full transition-all`}
                      style={{ width: `${(d.value / maxService) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-gray-600 w-10 text-right">{d.value}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4">收入构成</h2>
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="20"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20"
                  strokeDasharray={`${75 * 2.51} 251`} strokeDashoffset="0"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="20"
                  strokeDasharray={`${15 * 2.51} 251`} strokeDashoffset={`${-75 * 2.51}`}/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="20"
                  strokeDasharray={`${10 * 2.51} 251`} strokeDashoffset={`${-90 * 2.51}`}/>
              </svg>
            </div>
            <div className="flex-1 space-y-2">
              {revenueData.map((d, idx) => {
                const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500'];
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${colors[idx]}`}></div>
                    <span className="text-xs text-gray-600 flex-1">{d.label}</span>
                    <span className="text-xs font-bold text-gray-800">{d.value}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">导出报表</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
              <Download size={16} className="text-gray-500"/>
              <span className="text-sm font-medium text-gray-600">导出Excel</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
              <Download size={16} className="text-gray-500"/>
              <span className="text-sm font-medium text-gray-600">导出PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
