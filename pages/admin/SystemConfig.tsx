
import React, { useState } from 'react';
import { Settings, Save, RotateCcw, Check, DollarSign, MapPin, Zap, Bell, Gift, MessageSquare } from 'lucide-react';

interface ConfigItem {
  id: string;
  label: string;
  description: string;
  type: 'input' | 'select' | 'switch';
  value: any;
  options?: { label: string; value: string }[];
  icon: React.ReactNode;
}

export const SystemConfig = () => {
  const [configs, setConfigs] = useState<Record<string, any>>({
    servicePriceMin: 50,
    servicePriceMax: 5000,
    distanceBase: 3,
    distanceFree: 5,
    dispatchMode: 'auto',
    platformFee: 15,
    pointsRate: 1,
    pointsPerYuan: 10,
    messageTemplate: 'default',
    pushEnabled: true,
  });
  const [saved, setSaved] = useState(false);

  const configItems: ConfigItem[] = [
    {
      id: 'price',
      label: '服务价格设置',
      description: '设置平台服务价格范围',
      type: 'input',
      value: configs.servicePriceMin,
      icon: <DollarSign size={18}/>,
    },
    {
      id: 'distance',
      label: '距离计算规则',
      description: '基础距离和免费距离配置',
      type: 'input',
      value: configs.distanceBase,
      icon: <MapPin size={18}/>,
    },
    {
      id: 'dispatch',
      label: '派单策略',
      description: '自动派单或手动派单',
      type: 'select',
      value: configs.dispatchMode,
      options: [
        { label: '自动派单', value: 'auto' },
        { label: '手动派单', value: 'manual' },
        { label: '抢单模式', value: 'grab' },
      ],
      icon: <Zap size={18}/>,
    },
    {
      id: 'platformFee',
      label: '平台服务费比例',
      description: '从每笔订单中收取的平台服务费比例',
      type: 'input',
      value: configs.platformFee,
      icon: <Settings size={18}/>,
    },
    {
      id: 'points',
      label: '积分规则',
      description: '用户消费获取积分的比例',
      type: 'input',
      value: configs.pointsPerYuan,
      icon: <Gift size={18}/>,
    },
    {
      id: 'message',
      label: '消息模板',
      description: '订单状态通知消息模板',
      type: 'select',
      value: configs.messageTemplate,
      options: [
        { label: '默认模板', value: 'default' },
        { label: '简洁模板', value: 'simple' },
        { label: '详情模板', value: 'detail' },
      ],
      icon: <MessageSquare size={18}/>,
    },
    {
      id: 'push',
      label: '消息推送',
      description: '开启或关闭系统消息推送',
      type: 'switch',
      value: configs.pushEnabled,
      icon: <Bell size={18}/>,
    },
  ];

  const handleChange = (id: string, value: any) => {
    setConfigs(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    alert('配置已保存');
  };

  const handleReset = () => {
    setConfigs({
      servicePriceMin: 50,
      servicePriceMax: 5000,
      distanceBase: 3,
      distanceFree: 5,
      dispatchMode: 'auto',
      platformFee: 15,
      pointsRate: 1,
      pointsPerYuan: 10,
      messageTemplate: 'default',
      pushEnabled: true,
    });
    alert('配置已重置为默认值');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 py-3 border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-800">系统配置</h1>
          <p className="text-xs text-gray-400 mt-0.5">平台参数设置与管理</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <DollarSign size={20}/>
            </div>
            <div>
              <h2 className="font-bold text-gray-800">服务价格设置</h2>
              <p className="text-xs text-gray-400">设置订单价格范围限制</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">最低价格 (元)</label>
              <input
                type="number"
                value={configs.servicePriceMin}
                onChange={(e) => handleChange('servicePriceMin', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">最高价格 (元)</label>
              <input
                type="number"
                value={configs.servicePriceMax}
                onChange={(e) => handleChange('servicePriceMax', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <MapPin size={20}/>
            </div>
            <div>
              <h2 className="font-bold text-gray-800">距离计算规则</h2>
              <p className="text-xs text-gray-400">计算服务距离和费用</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">基础距离 (km)</label>
              <input
                type="number"
                value={configs.distanceBase}
                onChange={(e) => handleChange('distanceBase', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">免费距离 (km)</label>
              <input
                type="number"
                value={configs.distanceFree}
                onChange={(e) => handleChange('distanceFree', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Zap size={20}/>
            </div>
            <div>
              <h2 className="font-bold text-gray-800">派单策略配置</h2>
              <p className="text-xs text-gray-400">订单分配方式</p>
            </div>
          </div>

          <div className="flex gap-2">
            {[
              { label: '自动派单', value: 'auto' },
              { label: '手动派单', value: 'manual' },
              { label: '抢单模式', value: 'grab' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => handleChange('dispatchMode', option.value)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  configs.dispatchMode === option.value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-500 border border-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Settings size={20}/>
            </div>
            <div>
              <h2 className="font-bold text-gray-800">平台服务费</h2>
              <p className="text-xs text-gray-400">按订单金额比例收取</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="number"
              value={configs.platformFee}
              onChange={(e) => handleChange('platformFee', parseInt(e.target.value))}
              className="w-24 px-3 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:border-blue-400 text-center font-bold"
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
              <Gift size={20}/>
            </div>
            <div>
              <h2 className="font-bold text-gray-800">积分规则</h2>
              <p className="text-xs text-gray-400">用户获取积分比例</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">每消费</span>
            <input
              type="number"
              value={1}
              disabled
              className="w-16 px-2 py-1 bg-gray-100 rounded text-sm text-center"
            />
            <span className="text-sm text-gray-500">元获得</span>
            <input
              type="number"
              value={configs.pointsPerYuan}
              onChange={(e) => handleChange('pointsPerYuan', parseInt(e.target.value))}
              className="w-20 px-2 py-1 bg-gray-50 rounded text-sm text-center border border-gray-200"
            />
            <span className="text-sm text-gray-500">积分</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
              <Bell size={20}/>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-gray-800">消息推送</h2>
              <p className="text-xs text-gray-400">开启系统消息推送</p>
            </div>
            <button
              onClick={() => handleChange('pushEnabled', !configs.pushEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                configs.pushEnabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                configs.pushEnabled ? 'right-1' : 'left-1'
              }`}></div>
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-md mx-auto">
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw size={16}/> 重置
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            {saved ? <Check size={16}/> : <Save size={16}/>}
            {saved ? '已保存' : '保存配置'}
          </button>
        </div>
      </div>
    </div>
  );
};
