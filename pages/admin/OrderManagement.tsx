
import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Clock, CheckCircle, AlertCircle, Eye, Refund, MapPin, Phone, User, Shield, ChevronRight, X } from 'lucide-react';

type OrderStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
type ServiceType = 'repair' | 'install' | 'inspection';

interface OrderItem {
  id: string;
  orderId: string;
  serviceType: ServiceType;
  title: string;
  userName: string;
  userPhone: string;
  electricianName?: string;
  electricianPhone?: string;
  address: string;
  amount: number;
  status: OrderStatus;
  createTime: string;
  scheduledTime?: string;
}

export const OrderManagement = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | ServiceType>('all');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const mockOrders: OrderItem[] = [
    { id: 'O001', orderId: 'ANDT-2026-0420-1001', serviceType: 'repair', title: '电路跳闸维修', userName: '张三', userPhone: '138****1234', electricianName: '李师傅', electricianPhone: '139****5678', address: '浦东新区浦电路57号', amount: 120, status: 'completed', createTime: '2026-04-20 10:30', scheduledTime: '尽快' },
    { id: 'O002', orderId: 'ANDT-2026-0420-1002', serviceType: 'install', title: '开关安装服务', userName: '王五', userPhone: '137****9012', electricianName: '周师傅', electricianPhone: '133****6789', address: '黄浦区淮海中路888号', amount: 85, status: 'in_progress', createTime: '2026-04-20 09:15', scheduledTime: '今天 14:00' },
    { id: 'O003', orderId: 'ANDT-2026-0420-1003', serviceType: 'inspection', title: '电路安全检测', userName: '钱总', userPhone: '135****7890', address: '徐汇区建国西路256号', amount: 150, status: 'pending', createTime: '2026-04-20 08:45', scheduledTime: '明天 10:00' },
    { id: 'O004', orderId: 'ANDT-2026-0419-0956', serviceType: 'repair', title: '插座更换', userName: '赵先生', userPhone: '136****3456', electricianName: '李师傅', electricianPhone: '139****5678', address: '静安区胶州路11弄', amount: 60, status: 'completed', createTime: '2026-04-19 16:20', scheduledTime: '昨天' },
    { id: 'O005', orderId: 'ANDT-2026-0419-0957', serviceType: 'install', title: '灯具安装', userName: '孙女士', userPhone: '132****0123', address: '长宁区中山公园5号', amount: 200, status: 'cancelled', createTime: '2026-04-19 14:00', scheduledTime: '取消' },
  ];

  const getStatusInfo = (status: OrderStatus) => {
    switch(status) {
      case 'pending': return { label: '待接单', color: 'bg-amber-100 text-amber-700', icon: Clock };
      case 'accepted': return { label: '已接单', color: 'bg-blue-100 text-blue-700', icon: CheckCircle };
      case 'in_progress': return { label: '服务中', color: 'bg-purple-100 text-purple-700', icon: AlertCircle };
      case 'completed': return { label: '已完成', color: 'bg-green-100 text-green-700', icon: CheckCircle };
      case 'cancelled': return { label: '已取消', color: 'bg-red-50 text-red-500', icon: X };
    }
  };

  const getTypeInfo = (type: ServiceType) => {
    switch(type) {
      case 'repair': return { label: '急修', color: 'bg-red-500' };
      case 'install': return { label: '安装', color: 'bg-blue-500' };
      case 'inspection': return { label: '检测', color: 'bg-green-500' };
    }
  };

  const filteredOrders = mockOrders.filter(order => {
    const matchSearch = searchKeyword === '' ||
      order.orderId.includes(searchKeyword) ||
      order.title.includes(searchKeyword) ||
      order.userName.includes(searchKeyword);
    const matchStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchType = typeFilter === 'all' || order.serviceType === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 py-3 border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-800">订单管理</h1>
          <p className="text-xs text-gray-400 mt-0.5">管理平台所有服务订单</p>
        </div>

        <div className="p-4 space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="搜索订单号、服务内容、用户名..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none"
            >
              <option value="all">全部状态</option>
              <option value="pending">待接单</option>
              <option value="accepted">已接单</option>
              <option value="in_progress">服务中</option>
              <option value="completed">已完成</option>
              <option value="cancelled">已取消</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none"
            >
              <option value="all">全部类型</option>
              <option value="repair">急修</option>
              <option value="install">安装</option>
              <option value="inspection">检测</option>
            </select>
          </div>
        </div>

        <div className="px-4 pb-2 flex justify-between items-center">
          <span className="text-xs text-gray-400">
            共 <span className="font-bold text-gray-600">{filteredOrders.length}</span> 个订单
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {filteredOrders.map(order => {
          const statusInfo = getStatusInfo(order.status);
          const typeInfo = getTypeInfo(order.serviceType);
          const StatusIcon = statusInfo.icon;

          return (
            <div key={order.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${typeInfo.color}`}>
                    {typeInfo.label}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">{order.orderId}</span>
                </div>
                <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold ${statusInfo.color}`}>
                  <StatusIcon size={10}/>
                  {statusInfo.label}
                </span>
              </div>

              <h3 className="font-bold text-gray-800 mb-2">{order.title}</h3>

              <div className="flex items-start space-x-2 mb-3">
                <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0"/>
                <span className="text-sm text-gray-600">{order.address}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 mb-3 bg-gray-50 p-2 rounded-lg">
                <span className="flex items-center gap-1">
                  <User size={10}/> {order.userName} {order.userPhone}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  {order.electricianName && (
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <Shield size={10}/> {order.electricianName}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">{order.createTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-red-600">¥{order.amount}</span>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-blue-600"
                  >
                    <Eye size={16}/>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="text-center py-20">
            <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4"/>
            <p className="text-gray-400">未找到符合条件的订单</p>
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setSelectedOrder(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-white w-full max-w-md rounded-t-3xl max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">订单详情</h2>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-500"/>
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${getTypeInfo(selectedOrder.serviceType).color}`}>
                      {getTypeInfo(selectedOrder.serviceType).label}
                    </span>
                    <h3 className="font-bold text-gray-800 mt-2">{selectedOrder.title}</h3>
                  </div>
                  <span className="text-2xl font-bold text-red-600">¥{selectedOrder.amount}</span>
                </div>
                <p className="text-xs text-gray-500 font-mono bg-white px-2 py-1 rounded inline-block">{selectedOrder.orderId}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <MapPin size={16} className="text-blue-600"/>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">服务地址</p>
                    <p className="font-medium text-gray-800">{selectedOrder.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <User size={16} className="text-green-600"/>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">用户信息</p>
                    <p className="font-medium text-gray-800">{selectedOrder.userName} {selectedOrder.userPhone}</p>
                  </div>
                </div>

                {selectedOrder.electricianName && (
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                      <Shield size={16} className="text-purple-600"/>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">电工信息</p>
                      <p className="font-medium text-gray-800">{selectedOrder.electricianName} {selectedOrder.electricianPhone}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                    <Clock size={16} className="text-amber-600"/>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">预约时间</p>
                    <p className="font-medium text-gray-800">{selectedOrder.scheduledTime}</p>
                    <p className="text-xs text-gray-400 mt-1">创建时间: {selectedOrder.createTime}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm"
                >
                  处理订单
                </button>
                <button
                  className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm"
                  onClick={() => setSelectedOrder(null)}
                >
                  返回
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
