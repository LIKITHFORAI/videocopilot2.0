import { useState, useCallback } from 'react';

interface DragDropState {
    isDragging: boolean;
}

interface DragDropHandlers {
    onDragOver: (e: React.DragEvent) => void;
    onDragEnter: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => File | null;
}

export const useDragDrop = (onFileDrop?: (file: File) => void) => {
    const [isDragging, setIsDragging] = useState(false);

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const onDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Only set to false if we're leaving the drop zone itself, not entering a child
        if (e.currentTarget.contains(e.relatedTarget as Node)) return;
        
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (onFileDrop) {
                onFileDrop(file);
            }
            return file;
        }
        return null;
    }, [onFileDrop]);

    return {
        isDragging,
        dragHandlers: {
            onDragOver,
            onDragEnter,
            onDragLeave,
            onDrop
        }
    };
};
