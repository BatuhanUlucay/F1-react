import React from 'react';
import TeamCard from './TeamCard';

function TeamCards({ teams }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
      {teams.map((team) => {
        return <TeamCard team={team} />;
      })}
    </div>
  );
}

export default TeamCards;
