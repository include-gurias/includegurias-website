    "use client";
    import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    } from "@dnd-kit/core";
    import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    } from "@dnd-kit/sortable";
    import { ReactNode, useState, useEffect } from "react";
    import DraggableItem from "./DraggableItem";
    import { Box, Spinner } from "@chakra-ui/react";

    export interface DraggableListItem {
    id: string | number;
    [key: string]: any;
    }

    interface DraggableListProps<T extends DraggableListItem> {
    items: T[];
    onReorder: (items: T[]) => void;
    isLoading?: boolean;
    renderItem: (item: T, index: number) => ReactNode;
    itemHeight?: string | number;
    }

    export const DraggableList = <T extends DraggableListItem>({
    items,
    onReorder,
    isLoading = false,
    renderItem,
    itemHeight = "auto",
    }: DraggableListProps<T>) => {
    const [orderedItems, setOrderedItems] = useState(items);

    useEffect(() => {
        setOrderedItems(items);
    }, [items]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
            distance: 5,
            },
    }),

        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
        const oldIndex = orderedItems.findIndex((item) => item.id === active.id);
        const newIndex = orderedItems.findIndex((item) => item.id === over.id);

        const newOrder = arrayMove(orderedItems, oldIndex, newIndex);
        // Add order to items
        const itemsWithOrder = newOrder.map((item, index) => ({
            ...item,
            order: index,
        }));

        setOrderedItems(itemsWithOrder);
        onReorder(itemsWithOrder);
        }
    };

    if (isLoading) {
        return (
        <Box display="flex" justifyContent="center" alignItems="center" py={8}>
            <Spinner />
        </Box>
        );
    }

    const itemIds = orderedItems.map((item) => item.id);

    return (
        <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        >
        <SortableContext
            items={itemIds}
            strategy={verticalListSortingStrategy}
        >
            <Box display="flex" flexDirection="column" gap={2}>
            {orderedItems.map((item, index) => (
                <DraggableItem
                key={item.id}
                id={item.id}
                index={index}
                itemHeight={itemHeight}
                >
                {renderItem(item, index)}
                </DraggableItem>
            ))}
            </Box>
        </SortableContext>
        </DndContext>
    );
    };
