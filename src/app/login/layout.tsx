import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <div className="grid place-items-center h-screen">{children}</div>;
};

export default layout;
