import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full pt-20 space-y-6">
      <div className="w-full h-16 bg-white opacity-30 rounded-lg"></div>
      <div className="flex items-center justify-between w-full h-4/5">
        <div className="w-8/12 h-full bg-white opacity-30 rounded-lg"></div>
        <div className="w-4/12 h-full bg-white opacity-30 rounded-lg ml-6"></div>
      </div>
    </div>
  );
};

export default Dashboard;
