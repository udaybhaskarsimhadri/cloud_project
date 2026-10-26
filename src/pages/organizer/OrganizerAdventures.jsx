import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import OrganizerNav from '../../components/organizer/OrganizerNav';
import AdventureManager from '../../components/organizer/AdventureManager';
import AdventureForm from '../../components/organizer/AdventureForm';
import { organizerService } from '../../services/organizerService';
import { CheckCircle2 } from 'lucide-react';

const OrganizerAdventures = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [adventures, setAdventures] = useState([]);
  const [editingAdventure, setEditingAdventure] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const loadAdventures = () => {
    const list = organizerService.getAdventures();
    setAdventures(list);
  };

  useEffect(() => {
    loadAdventures();
    if (searchParams.get('action') === 'new') {
      setIsCreating(true);
    }
  }, [searchParams]);

  const handleCreateNew = () => {
    setEditingAdventure(null);
    setIsCreating(true);
  };

  const handleEdit = (adv) => {
    setIsCreating(false);
    setEditingAdventure(adv);
  };

  const handleDuplicate = (id) => {
    const copy = organizerService.duplicateAdventure(id);
    if (copy) {
      loadAdventures();
      setToastMessage(`Duplicated adventure: ${copy.name}`);
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleDelete = (id) => {
    organizerService.deleteAdventure(id);
    loadAdventures();
    setToastMessage('Adventure removed from catalog.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSaveForm = (formData) => {
    if (editingAdventure?.id) {
      organizerService.updateAdventure(editingAdventure.id, formData);
      setToastMessage(`Updated ${formData.name}`);
    } else {
      organizerService.createAdventure(formData);
      setToastMessage(`Created and published ${formData.name}`);
    }
    loadAdventures();
    setIsCreating(false);
    setEditingAdventure(null);
    setSearchParams({});
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleCancelForm = () => {
    setIsCreating(false);
    setEditingAdventure(null);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20">
      <OrganizerNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        )}

        {isCreating || editingAdventure ? (
          <AdventureForm
            initialData={editingAdventure}
            onSave={handleSaveForm}
            onCancel={handleCancelForm}
          />
        ) : (
          <AdventureManager
            adventures={adventures}
            onCreateNew={handleCreateNew}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default OrganizerAdventures;
