
import React from 'react';
import { Users, Shield, ShoppingCart, Wallet, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface StatCard {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendUp?: boolean;
  icon: React.ReactNode;
  color: string;
}

export const AdminDashboard = () => {
  const stats: StatCard[] = [
    { title: '用户总数', value: 1258, subtitle: '较上月 +12%', trend: '+12%', trendUp: true, icon: <Users size={20}/>, color: 'bg-blue-500' },
    { title: '认证电工', value: 86, subtitle: '待审核 5人', trend: '+8', trendUp: true, icon: <Shield size={20}/>, color: 'bg-green-500' },
    { title: '今日订单', value: 48, subtitle: '完单 42单', trend: '+15%', trendUp: true, icon: <ShoppingCart size={20}/>, color: 'bg-purple-500' },
    { title: '今日收益', value: '¥8,560', subtitle: '较昨日 +8%', trend: '+8%', trendUp: true, icon: <Wallet size={20}/>, color: 'bg-amber-500' },
  ];

  const recentOrders = [
    { id: 'ANDT-2026-0420-1001', user: '张三', electrician: '李师傅', amount: 120, status: 'completed' },
    { id: 'ANDT-2026-0420-1002', user: '王五', electrician: '周师傅', amount: 85, status: 'pending' },
    { id: 'ANDT-2026-0420-1003', user: '钱总', electrician: '-', amount: 200, status: 'pending' },
  ];

  const pendingReviews = [
    { type: '电工认证', count: 5, time: '2小时前' },
    { type: '资质审核', count: 3, time: '5小时前' },
    { type: '投诉处理', count: 2, time: '1小时前' },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return { label: '已完成', class: 'bg-green-100 text-green-700' };
      case 'pending':
        return { label: '进行中', class: 'bg-amber-100 text-amber-700' };
      default:
        return { label: status, class: 'bg-gray-100 text-gray-700' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white px-4 pt-8 pb-16">
        <h1 className="text-xl font-bold">管理后台</h1>
        <p className="text-blue-200 text-sm mt-1">欢迎回来，管理员</p>
      </div>

      <div className="px-4 -mt-10">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
                {stat.trend && (
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${stat.trendUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {stat.trend}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">待处理事项</h2>
            <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-full">全部</span>
          </div>
          <div className="space-y-3">
            {pendingReviews.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Clock size={18}/>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{item.type}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-amber-600">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">近期订单</h2>
            <span className="text-xs text-blue-600 font-bold">查看更多</span>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order, idx) => {
              const badge = getStatusBadge(order.status);
              return (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{order.id}</p>
                    <p className="text-xs text-gray-400">{order.user} → {order.electrician}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">¥{order.amount}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded ${badge.class}`}>{badge.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
