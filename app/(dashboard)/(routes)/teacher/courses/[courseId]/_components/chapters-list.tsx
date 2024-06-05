"use client"

import { useEffect, useState } from "react";
import { Chapter } from "@prisma/client";
import { cn } from "@/lib/utils";

import { IChapterListProps } from "@/lib/interfaces";

import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult
} from '@hello-pangea/dnd';
import { Badge } from "@/components/ui/badge";
import { Grip, Pencil } from "lucide-react";

export const ChaptersList = ({
    items,
    onEdit,
    onReorder,
}: IChapterListProps): JSX.Element | null=> {
    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    const onDragEnd = (result: DropResult): void => {
      if (!result.destination) return;

      const items: Chapter[] = Array.from(chapters);
      const [reorderedChapter] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedChapter);

      const startIndex: number = Math.min(result.source.index, result.destination.index);
      const endIndex: number = Math.max(result.source.index, result.destination.index);
      const updatedChapters: Chapter[] = items.slice(startIndex, endIndex + 1);
      setChapters(items);

      const bulkUpdateData: {
        id: string;
        position: number;
      }[] = updatedChapters.map((chapter) => ({
        id: chapter.id,
        position: items.findIndex((item) => item.id === chapter.id),
      }));
      onReorder(bulkUpdateData);
    }
    
    useEffect(() =>{
      setChapters(items)
    }, [items]);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    return !isMounted ? null : (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chapters">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {chapters.map((chapter, index) => (
                <Draggable
                  key={chapter.id}
                  draggableId={chapter.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={cn(
                        `flex items-center gap-x-2 border
                        bg-slate-200 dark:bg-slate-900
                        border-slate-300 dark:border-slate-700
                        text-slate-700 dark:text-slate-200
                        rounded-md mb-4 text-sm overflow-hidden`,
                        chapter.isPublished &&
                          `bg-white dark:bg-slate-800
                          border-sky-200 dark:border-sky-700
                          text-sky-700 dark:text-sky-200`
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className={cn(
                          `px-2 py-3 border-r transition
                          border-r-slate-300 dark:border-r-slate-700
                          hover:bg-slate-300 dark:hover:bg-slate-700`,
                          chapter.isPublished &&
                            `border-r-sky-200 dark:border-r-sky-700
                            hover:bg-sky-200 dark:hover:bg-sky-700`
                        )}
                        {...provided.dragHandleProps}
                      >
                        <Grip className="h-5 w-5" />
                      </div>
                      {chapter.title}
                      <div className="ml-auto pr-2 flex items-center gap-x-2">
                        {chapter.isFree && <Badge>Free</Badge>}
                        <Badge
                            className={cn(
                                "bg-slate-700 dark:text-slate-400",
                                chapter.isPublished && "bg-emerald-600"
                            )
                            }
                        >
                            {chapter.isPublished ? "Published" : "Draft"}
                        </Badge>
                        <Pencil
                            className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                            onClick={() => onEdit(chapter.id)}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
};
