import React from 'react';
import DestinationCard from './DestinationCard';

const RelatedDestinations = ({ currentDestination, allDestinations = [] }) => {
  // Find 4 related destinations based on same category, state or difficulty, excluding current
  const related = allDestinations
    .filter((d) => d.id !== currentDestination.id)
    .sort((a, b) => {
      // Prioritize same primary category or difficulty
      const aMatchesCat = a.primaryCategory === currentDestination.primaryCategory ? 2 : 0;
      const bMatchesCat = b.primaryCategory === currentDestination.primaryCategory ? 2 : 0;
      const aMatchesDiff = a.difficulty === currentDestination.difficulty ? 1 : 0;
      const bMatchesDiff = b.difficulty === currentDestination.difficulty ? 1 : 0;
      return (bMatchesCat + bMatchesDiff) - (aMatchesCat + aMatchesDiff);
    })
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {related.map((dest) => (
        <DestinationCard
          key={dest.id}
          destination={dest}
          viewMode="grid"
        />
      ))}
    </div>
  );
};

export default RelatedDestinations;
