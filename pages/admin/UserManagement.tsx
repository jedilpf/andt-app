
import React, { useState } from 'react';
import { Search, Filter, User, Shield, Eye, Ban, CheckCircle, MoreVertical, ChevronDown, Calendar, Phone, Mail, Clock } from 'lucide-react';

type UserRole = 'user' | 'electrician' | 'admin';
type UserStatus = 'active' | 'disabled';

interface UserItem {
  id: string;
  username: string;
  role: UserRole;
  phone: string;
  email?: string;
  registerTime: string;
  lastLogin?: string;
  status: UserStatus;
  avatar?: string;
}

export const UserManagement = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | UserStatus>('all');
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const mockUsers: UserItem[] = [
    { id: 'U001', username: '张三', role: 'user', phone: '138****1234', registerTime: '2026-01-15', lastLogin: '2026-04-20', status: 'active' },
    { id: 'U002', username: '李师傅', role: 'electrician', phone: '139****5678', registerTime: '2026-02-01', lastLogin: '2026-04-19', status: 'active' },
    { id: 'U003', username: '王五', role: 'user', phone: '137****9012', registerTime: '2026-02-20', lastLogin: '2026-04-18', status: 'active' },
    { id: 'U004', username: '赵工', role: 'electrician', phone: '136****3456', registerTime: '2026-03-05', lastLogin: '2026-04-17', status: 'disabled' },
    { id: 'U005', username: '钱总', role: 'user', phone: '135****7890', registerTime: '2026-03-10', lastLogin: '2026-04-15', status: 'active' },
    { id: 'U006', username: '孙管', role: 'admin', phone: '134****2345', registerTime: '2026-01-01', lastLogin: '2026-04-20', status: 'active' },
    { id: 'U007', username: '周师傅', role: 'electrician', phone: '133****6789', registerTime: '2026-03-15', lastLogin: '2026-04-14', status: 'active' },
    { id: 'U008', username: '吴女士', role: 'user', phone: '132****0123', registerTime: '2026-03-20', lastLogin: '2026-04-12', status: 'disabled' },
  ];

  const getRoleLabel = (role: UserRole) => {
    switch(role) {
      case 'user': return { label: '普通用户', color: 'bg-blue-100 text-blue-700', icon: User };
      case 'electrician': return { label: '电工', color: 'bg-green-100 text-green-700', icon: Shield };
      case 'admin': return { label: '管理员', color: 'bg-purple-100 text-purple-700', icon: Shield };
    }
  };

  const getStatusLabel = (status: UserStatus) => {
    return status === 'active'
      ? { label: '正常', color: 'bg-green-50 text-green-600', dot: 'bg-green-500' }
      : { label: '已禁用', color: 'bg-red-50 text-red-600', dot: 'bg-red-500' };
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchSearch = searchKeyword === '' ||
      user.username.includes(searchKeyword) ||
      user.phone.includes(searchKeyword) ||
      user.id.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchRole = roleFilter === 'all' || user.role === roleFilter;
    const matchStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const handleToggleStatus = (user: UserItem) => {
    const newStatus = user.status === 'active' ? 'disabled' : 'active';
    console.log(`更新用户 ${user.id} 状态为: ${newStatus}`);
    alert(`${user.username} 已${newStatus === 'active' ? '启用' : '禁用'}`);
  };

  const handleViewDetail = (user: UserItem) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 py-3 border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-800">用户管理</h1>
          <p className="text-xs text-gray-400 mt-0.5">管理平台所有用户信息</p>
        </div>

        <div className="p-4 space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="搜索用户名、手机号、用户ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none"
            >
              <option value="all">全部角色</option>
              <option value="user">普通用户</option>
              <option value="electrician">电工</option>
              <option value="admin">管理员</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none"
            >
              <option value="all">全部状态</option>
              <option value="active">正常</option>
              <option value="disabled">已禁用</option>
            </select>
          </div>
        </div>

        <div className="px-4 pb-2 flex justify-between items-center">
          <span className="text-xs text-gray-400">
            共 <span className="font-bold text-gray-600">{filteredUsers.length}</span> 个用户
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {filteredUsers.map(user => {
          const roleInfo = getRoleLabel(user.role);
          const statusInfo = getStatusLabel(user.status);
          const RoleIcon = roleInfo.icon;

          return (
            <div key={user.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    {user.username.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-800">{user.username}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${roleInfo.color}`}>
                        <RoleIcon size={10} className="inline mr-0.5"/>
                        {roleInfo.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold ${statusInfo.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`}></span>
                    {statusInfo.label}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={10}/> 注册: {user.registerTime}
                  </span>
                  {user.lastLogin && (
                    <span className="flex items-center gap-1">
                      <Eye size={10}/> 最后: {user.lastLogin}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleViewDetail(user)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                    title="查看详情"
                  >
                    <Eye size={16}/>
                  </button>
                  <button
                    onClick={() => handleToggleStatus(user)}
                    className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${
                      user.status === 'active' ? 'text-orange-500' : 'text-green-500'
                    }`}
                    title={user.status === 'active' ? '禁用' : '启用'}
                  >
                    {user.status === 'active' ? <Ban size={16}/> : <CheckCircle size={16}/>}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center py-20">
            <User size={48} className="mx-auto text-gray-300 mb-4"/>
            <p className="text-gray-400">未找到符合条件的用户</p>
          </div>
        )}
      </div>

      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowDetailModal(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-white w-full max-w-md rounded-2xl mx-4 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">用户详情</h2>
                <button onClick={() => setShowDetailModal(false)} className="p-1 hover:bg-white/10 rounded-full">
                  <ChevronDown size={20}/>
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {selectedUser.username.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedUser.username}</h3>
                  <p className="text-sm text-blue-200">ID: {selectedUser.id}</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Phone size={14}/> 手机号
                  </span>
                  <span className="font-medium text-gray-800">{selectedUser.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <User size={14}/> 用户角色
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${getRoleLabel(selectedUser.role).color}`}>
                    {getRoleLabel(selectedUser.role).label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <CheckCircle size={14}/> 账号状态
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${getStatusLabel(selectedUser.status).color}`}>
                    {getStatusLabel(selectedUser.status).label}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Calendar size={14}/> 注册时间
                  </span>
                  <span className="font-medium text-gray-800">{selectedUser.registerTime}</span>
                </div>
                {selectedUser.lastLogin && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                      <Clock size={14}/> 最后登录
                    </span>
                    <span className="font-medium text-gray-800">{selectedUser.lastLogin}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleToggleStatus(selectedUser);
                    setShowDetailModal(false);
                  }}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] ${
                    selectedUser.status === 'active'
                      ? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                >
                  {selectedUser.status === 'active' ? '禁用账号' : '启用账号'}
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all active:scale-[0.98]"
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
