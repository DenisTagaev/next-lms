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
        className={`${platformClass} w-fit items-center text-sm hover:bg-slate-400/75 hover:text-sky-600 transition`}
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        {origin === "course" && "Back to the course page"}
        {origin === "dashboard" && "Back to dashboard"}
      </Button>
    );
}