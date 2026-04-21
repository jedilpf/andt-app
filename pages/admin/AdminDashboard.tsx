
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, ShoppingCart, BarChart3, Settings, ChevronRight, TrendingUp, Shield, AlertCircle, CheckCircle, Wallet, Clock, DollarSign, MapPin, Zap, Gift } from 'lucide-react';

const menuItems = [
  { path: '/admin', label: '首页概览', icon: <BarChart3 size={20}/> },
  { path: '/admin/users', label: '用户管理', icon: <Users size={20}/> },
  { path: '/admin/orders', label: '订单管理', icon: <ShoppingCart size={20}/> },
  { path: '/admin/stats', label: '数据统计', icon: <TrendingUp size={20}/> },
  { path: '/admin/config', label: '系统配置', icon: <Settings size={20}/> },
];

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    { title: '用户总数', value: '1,258', trend: '+12%', icon: <Users size={20}/>, color: 'bg-blue-500' },
    { title: '认证电工', value: '86', trend: '+8', icon: <Shield size={20}/>, color: 'bg-green-500' },
    { title: '今日订单', value: '48', trend: '+15%', icon: <ShoppingCart size={20}/>, color: 'bg-purple-500' },
    { title: '今日收益', value: '¥8,560', trend: '+8%', icon: <Wallet size={20}/>, color: 'bg-amber-500' },
  ];

  const pendingItems = [
    { type: '电工认证', count: 5, time: '2小时前', icon: <Shield size={18}/> },
    { type: '资质审核', count: 3, time: '5小时前', icon: <CheckCircle size={18}/> },
    { type: '投诉处理', count: 2, time: '1小时前', icon: <AlertCircle size={18}/> },
  ];

  const recentOrders = [
    { id: 'ANDT-2026-0420-1001', user: '张三', electrician: '李师傅', amount: 120, status: 'completed' },
    { id: 'ANDT-2026-0420-1002', user: '王五', electrician: '周师傅', amount: 85, status: 'pending' },
    { id: 'ANDT-2026-0420-1003', user: '钱总', electrician: '-', amount: 200, status: 'pending' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-56' : 'w-0 overflow-hidden'}`}>
        <div className="p-4 border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-800">安电通</h1>
          <p className="text-xs text-gray-400">管理后台</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">管理员</p>
              <p className="text-xs text-gray-400">系统管理员</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-800">管理后台</h1>
                <p className="text-xs text-gray-400">欢迎回来，管理员</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {menuItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white`}>
                    {stat.icon}
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {stat.trend}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-800">待处理事项</h2>
                <button
                  onClick={() => navigate('/admin/users')}
                  className="text-xs text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full"
                >
                  查看全部
                </button>
              </div>
              <div className="space-y-3">
                {pendingItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{item.type}</p>
                        <p className="text-xs text-gray-400">{item.time}</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-amber-600">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-800">近期订单</h2>
                <button
                  onClick={() => navigate('/admin/orders')}
                  className="text-xs text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full"
                >
                  查看全部
                </button>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{order.id}</p>
                      <p className="text-xs text-gray-400">{order.user} → {order.electrician}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">¥{order.amount}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded ${
                        order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {order.status === 'completed' ? '已完成' : '进行中'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-800">快捷入口</h2>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => navigate('/admin/users')}
                className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <Users size={24} className="text-blue-600"/>
                <span className="text-xs font-medium text-gray-700">用户管理</span>
              </button>
              <button
                onClick={() => navigate('/admin/orders')}
                className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
              >
                <ShoppingCart size={24} className="text-green-600"/>
                <span className="text-xs font-medium text-gray-700">订单管理</span>
              </button>
              <button
                onClick={() => navigate('/admin/stats')}
                className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
              >
                <TrendingUp size={24} className="text-purple-600"/>
                <span className="text-xs font-medium text-gray-700">数据统计</span>
              </button>
              <button
                onClick={() => navigate('/admin/config')}
                className="flex flex-col items-center gap-2 p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors"
              >
                <Settings size={24} className="text-amber-600"/>
                <span className="text-xs font-medium text-gray-700">系统配置</span>
              </button>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold mb-1">数据概览</h2>
                <p className="text-blue-200 text-sm">平台运营数据一览</p>
              </div>
              <button
                onClick={() => navigate('/admin/stats')}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors"
              >
                查看详情 <ChevronRight size={16}/>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-blue-200 text-xs">本月收入</p>
                <p className="text-2xl font-bold mt-1">¥89.6万</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-blue-200 text-xs">本月订单</p>
                <p className="text-2xl font-bold mt-1">4,856单</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-blue-200 text-xs">平均评分</p>
                <p className="text-2xl font-bold mt-1">4.8分</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
