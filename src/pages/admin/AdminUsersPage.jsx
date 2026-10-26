import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Download } from 'lucide-react';
import AdminNav from '../../components/admin/AdminNav';
import UserManagement from '../../components/admin/UserManagement';
import { adminService } from '../../services/adminService';

const AdminUsersPage = () => {
  const [users, setUsers] = useState(() => adminService.getUsers());

  const refreshUsers = () => {
    setUsers(adminService.getUsers());
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                User Management
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                {users.length} Total Users
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Audit registered travelers, manage account permissions, and suspend unauthorized logins
            </p>
          </div>
        </div>

        {/* User Management Module */}
        <UserManagement
          initialUsers={users}
          onUsersUpdated={refreshUsers}
        />
      </main>
    </div>
  );
};

export default AdminUsersPage;
