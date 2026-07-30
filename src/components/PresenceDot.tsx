import React, { useEffect, useState } from "react";
import { FirebaseService } from "../services/firebaseService";

export const PresenceDot: React.FC<{ uid: string; className?: string }> = ({
  uid,
  className,
}) => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (!uid) return;
    const unsubscribe = FirebaseService.subscribeToPresence(uid, (online) => {
      setIsOnline(online);
    });
    return () => unsubscribe();
  }, [uid]);

  if (!isOnline) return null;

  return (
    <div
      className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white ${className || ""}`}
    />
  );
};
