"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

const PurchaseNotice = (): JSX.Element => {
    const [isOpened, setIsOpened] = useState(false);
    const onToggleCard = () => {
        setIsOpened(!isOpened);
    }
    return (
      <p className="p-2 text-sm text-slate-600 dark:text-slate-400">
        **Please note, as this is a demo site, you can use dummy card{" "}
        <span
          onClick={onToggleCard}
          className="cursor-pointer hover:text-sky-600"
        >
          {!isOpened ? (
            <>
              <Eye size={20} className="inline" /> **** **** **** ****
            </>
          ) : (
            <>
              <EyeOff size={20} className="inline" /> 4242 4242 4242 4242
            </>
          )}
        </span>{" "}
        for test purposes. Fill rest of the fields with any valid info.
      </p>
    );
};

export default PurchaseNotice;