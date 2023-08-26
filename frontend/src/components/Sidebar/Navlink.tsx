import React, { FC } from "react";
import { Link } from "react-router-dom";

interface INavlinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const Navlink: FC<INavlinkProps> = ({ icon, label, to }) => {
  return (
    <div>
      <Link
        to={to}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {icon}
        <span className="flex-1 ml-3 whitespace-nowrap">{label}</span>
      </Link>
    </div>
  );
};

export default Navlink;
