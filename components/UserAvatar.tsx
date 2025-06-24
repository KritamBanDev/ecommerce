import React from "react";

const UserAvatar = () => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-darkColor">
      {/* Placeholder initials */}
      U
    </div>
    <div className="flex flex-col">
      <span className="font-semibold text-white">Guest User</span>
      <span className="text-xs text-gray-400">Welcome!</span>
    </div>
  </div>
);

export default UserAvatar;
