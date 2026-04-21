
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Power, MapPin, Filter, X, ChevronDown } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Order, OrderStatus } from '../../../types';

type ServiceType = 'Repair' | 'Inspection' | 'Install' | 'Checkup';
type FilterDimension = 'serviceType' | 'scheduledTime' | 'priceRange' | 'distanceRange';

interface ActiveFilter {
  dimension: FilterDimension;
  value: string;
  label: string;
}

export const WorkStatusToggle = () => {
    const [isOnline, setIsOnline] = useState(true);
    return (
        <div className="flex items-center bg-white rounded-full p-1 border border-gray-200 shadow-sm">
            <button 
                onClick={() => setIsOnline(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${isOnline ? 'bg-green-500 text-white shadow-sm' : 'text-gray-500'}`}
            >
                听单中
            </button>
            <button 
                onClick={() => setIsOnline(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${!isOnline ? 'bg-gray-500 text-white shadow-sm' : 'text-gray-500'}`}
            >
                休息中
            </button>
        </div>
    )
}

export const TaskHall = () => {
  const { orders, currentUser, updateOrder } = useApp();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'Recommend' | 'Distance' | 'Price'>('Recommend');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);

  const mockExtraOrders: Order[] = [
      {
          id: 'ANDT-2026-0412-0891', type: 'Install', title: '写字楼排线改造', description: '企业订单：100平米办公室网络布线',
          images: [], location: { lat: 31.2, lng: 121.5, address: '浦东新区浦电路57号 3号楼15层' },
          status: OrderStatus.PENDING, createdAt: Date.now() - 5000, scheduledTime: '明天 09:00',
          priceEstimate: { min: 1200, max: 1500 }, clientId: 'c1', clientName: '科技公司', timeline: []
      },
      {
          id: 'ANDT-2026-0412-0892', type: 'Repair', title: '商铺跳闸急修', description: '餐饮店后厨总闸跳闸，影响营业',
          images: [], location: { lat: 31.21, lng: 121.48, address: '黄浦区淮海中路888号 2楼后厨' },
          status: OrderStatus.PENDING, createdAt: Date.now() - 2000, scheduledTime: '尽快',
          priceEstimate: { min: 200, max: 400 }, clientId: 'c2', clientName: '餐饮店主', timeline: []
      },
      {
          id: 'ANDT-2026-0412-0893', type: 'Inspection', title: '家庭电路安全检测', description: '新房验收电路检测',
          images: [], location: { lat: 31.23, lng: 121.45, address: '徐汇区建国西路256号 单元502' },
          status: OrderStatus.PENDING, createdAt: Date.now() - 3000, scheduledTime: '后天 14:00',
          priceEstimate: { min: 150, max: 200 }, clientId: 'c3', clientName: '王先生', timeline: []
      }
  ];

  const allOrders = [...orders.filter(o => o.status === OrderStatus.PENDING), ...mockExtraOrders];

  const filterOptions = {
    serviceType: [
      { value: 'Repair', label: '急修' },
      { value: 'Install', label: '安装' },
      { value: 'Inspection', label: '检测' },
      { value: 'Checkup', label: '巡检' },
    ],
    scheduledTime: [
      { value: 'asap', label: '尽快上门' },
      { value: 'today', label: '今天' },
      { value: 'tomorrow', label: '明天' },
      { value: 'thisweek', label: '本周' },
    ],
    priceRange: [
      { value: '0-200', label: '200元以下' },
      { value: '200-500', label: '200-500元' },
      { value: '500-1000', label: '500-1000元' },
      { value: '1000+', label: '1000元以上' },
    ],
    distanceRange: [
      { value: '0-1', label: '1km以内' },
      { value: '1-3', label: '1-3km' },
      { value: '3-5', label: '3-5km' },
      { value: '5+', label: '5km以上' },
    ],
  };

  const addFilter = (dimension: FilterDimension, value: string, label: string) => {
    setActiveFilters(prev => {
      const existing = prev.findIndex(f => f.dimension === dimension && f.value === value);
      if (existing >= 0) return prev;
      return [...prev, { dimension, value, label }];
    });
    setShowFilterPanel(false);
  };

  const removeFilter = (index: number) => {
    setActiveFilters(prev => prev.filter((_, i) => i !== index));
  };

  const filteredOrders = useMemo(() => {
    let result = [...allOrders];

    activeFilters.forEach(f => {
      switch (f.dimension) {
        case 'serviceType':
          result = result.filter(o => o.type === f.value);
          break;
        case 'scheduledTime':
          if (f.value === 'asap') result = result.filter(o => o.scheduledTime === '尽快');
          else if (f.value === 'today') result = result.filter(o => o.scheduledTime.includes('今天'));
          else if (f.value === 'tomorrow') result = result.filter(o => o.scheduledTime.includes('明天'));
          else if (f.value === 'thisweek') result = result.filter(o => !o.scheduledTime.includes('尽快') && !o.scheduledTime.includes('今天') && !o.scheduledTime.includes('明天'));
          break;
        case 'priceRange':
          const [min, max] = f.value.split('-').map(v => v === '+' ? Infinity : parseInt(v));
          result = result.filter(o => {
            const price = o.priceEstimate.min;
            return max === Infinity ? price >= min : price >= min && price <= max;
          });
          break;
      }
    });

    if (filter === 'Price') result.sort((a, b) => b.priceEstimate.min - a.priceEstimate.min);
    return result;
  }, [allOrders, activeFilters, filter]);

  const handleGrab = (id: string) => {
    if (id.startsWith('ANDT-')) {
        alert("演示订单，模拟抢单成功");
        return;
    }

    updateOrder(id, {
      status: OrderStatus.ACCEPTED,
      electricianId: currentUser?.id,
      electricianName: currentUser?.name
    });
    setTimeout(() => navigate(`/electrician/task/${id}`), 100);
  };

  const getDistance = (orderId: string) => {
    const distances: Record<string, string> = {
      'ANDT-2026-0412-0891': '2.3km',
      'ANDT-2026-0412-0892': '1.5km',
      'ANDT-2026-0412-0893': '3.8km',
    };
    return distances[orderId] || '1.0km';
  };

  return (
    <div className="min-h-[100dvh] bg-gray-50 pb-24">
      {/* Top Bar */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-lg font-bold text-gray-800">任务大厅</h1>
            <WorkStatusToggle />
          </div>
          {/* Filter Tabs */}
          <div className="flex items-center gap-2">
            <div className="flex flex-1 p-1 bg-gray-100 rounded-lg">
                {['Recommend', 'Distance', 'Price'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f as any)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${filter === f ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                    >
                        {f === 'Recommend' ? '综合' : (f === 'Distance' ? '距离' : '金额')}
                    </button>
                ))}
            </div>
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${showFilterPanel ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200'}`}
            >
              <Filter size={14} className="inline mr-1" />
              筛选
            </button>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {activeFilters.map((f, idx) => (
                <span key={idx} className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-100">
                  {f.label}
                  <button onClick={() => removeFilter(idx)} className="ml-1 hover:text-blue-800">
                    <X size={12} />
                  </button>
                </span>
              ))}
              <button onClick={() => setActiveFilters([])} className="text-xs text-gray-400 hover:text-gray-600">
                清除全部
              </button>
            </div>
          )}
      </div>

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className="bg-white border-b border-gray-100 p-4">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">服务类型</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.serviceType.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => addFilter('serviceType', opt.value, opt.label)}
                    className="px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-full hover:border-blue-400 hover:text-blue-600 transition-all"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">预约时间</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.scheduledTime.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => addFilter('scheduledTime', opt.value, opt.label)}
                    className="px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-full hover:border-blue-400 hover:text-blue-600 transition-all"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">订单金额</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.priceRange.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => addFilter('priceRange', opt.value, opt.label)}
                    className="px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-full hover:border-blue-400 hover:text-blue-600 transition-all"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">距离范围</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.distanceRange.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => addFilter('distanceRange', opt.value, opt.label)}
                    className="px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-full hover:border-blue-400 hover:text-blue-600 transition-all"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 space-y-4">
        {filteredOrders.length === 0 && (
            <div className="text-center mt-20 opacity-50">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Power size={40} className="text-gray-400"/>
                </div>
                <p className="text-gray-500">暂时没有符合条件的订单</p>
            </div>
        )}

        {filteredOrders.map(order => (
          <div key={order.id} className="bg-white p-0 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden transition-all active:scale-[0.99] group">
            {/* Order Header */}
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-400 font-mono">{order.id}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${order.type === 'Repair' ? 'bg-red-500' : (order.type === 'Install' ? 'bg-blue-500' : (order.type === 'Inspection' ? 'bg-green-500' : 'bg-indigo-500'))}`}>
                {order.type === 'Repair' ? '急修' : (order.type === 'Install' ? '安装' : (order.type === 'Inspection' ? '检测' : '巡检'))}
              </span>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-base mb-1">{order.title}</h3>
                        <p className="text-xs text-gray-400 flex items-center">
                            <Clock size={12} className="mr-1"/> 预约时间：{order.scheduledTime}
                        </p>
                    </div>
                    <div className="text-right pl-3">
                         <p className="text-xl font-extrabold text-red-600"><span className="text-sm font-medium text-gray-500">¥</span>{order.priceEstimate.min}</p>
                         <p className="text-[10px] text-gray-400">起</p>
                    </div>
                </div>

                <div className="flex items-start space-x-2 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <span className="text-sm text-gray-700 font-medium block">{order.location.address}</span>
                        <div className="flex items-center mt-1.5 space-x-2">
                             <span className="text-[10px] text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded">{getDistance(order.id)}</span>
                             <span className="text-[10px] text-gray-500 bg-white border border-gray-200 px-1.5 py-0.5 rounded">{order.clientName}</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => handleGrab(order.id)}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-base shadow-lg shadow-blue-200 group-active:scale-[0.98] transition-all flex justify-center items-center hover:bg-blue-700"
                >
                    立即抢单
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
