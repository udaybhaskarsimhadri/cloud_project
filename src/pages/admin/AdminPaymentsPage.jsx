import React from 'react';
import { CreditCard } from 'lucide-react';
import AdminNav from '../../components/admin/AdminNav';
import PaymentDashboard from '../../components/admin/PaymentDashboard';

const AdminPaymentsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Payment Dashboard & Financial Settlements</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Reconcile customer debits, automated 15% platform commissions, host NEFT payouts, and reversed transactions in INR (₹)
          </p>
        </div>

        {/* Payment Module */}
        <PaymentDashboard />
      </main>
    </div>
  );
};

export default AdminPaymentsPage;
