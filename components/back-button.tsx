"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const BackButton = ({ 
    path,
    platform,
    origin
}: { 
    path: string; 
    origin: string; 
    platform?: "mobile" | null;  
}): JSX.Element => {
    
    const platformClass: string = platform
      ? "flex md:hidden ml-auto pl-1 rounded-r-none"
      : "hidden md:flex";
    
    const onclick = () => {
        window.location.assign(path);
    };
    
    return (
      <Button
        onClick={onclick}
        role="button"
        variant="outline"
        className={`${platformClass} w-fit items-center text-sm transition
        hover:bg-slate-400/75 dark:hover:bg-slate-700
        hover:text-sky-600 
        `}
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        {origin === "course" && "Back to the course page"}
        {origin === "dashboard" && "Back to dashboard"}
      </Button>
    );
}