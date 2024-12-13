import React from "react";

export function AlertDialog({ children }: { children: React.ReactNode }) {
  return (
    <div className="alert-dialog">
      {children}
    </div>
  );
}
