import React, { useState, useEffect } from 'react';
import OrganizerNav from '../../components/organizer/OrganizerNav';
import OrganizerCalendar from '../../components/organizer/OrganizerCalendar';
import { organizerService } from '../../services/organizerService';

const OrganizerCalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const evs = organizerService.getCalendarEvents();
    setEvents(evs);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20">
      <OrganizerNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <OrganizerCalendar events={events} />
      </div>
    </div>
  );
};

export default OrganizerCalendarPage;
