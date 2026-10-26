import React, { useState, useEffect } from 'react';
import OrganizerNav from '../../components/organizer/OrganizerNav';
import RevenueAnalytics from '../../components/organizer/RevenueAnalytics';
import { organizerService } from '../../services/organizerService';

const OrganizerRevenuePage = () => {
  const [revenueData, setRevenueData] = useState(null);

  useEffect(() => {
    const data = organizerService.getRevenueData();
    setRevenueData(data);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20">
      <OrganizerNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <RevenueAnalytics revenueData={revenueData} />
      </div>
    </div>
  );
};

export default OrganizerRevenuePage;
