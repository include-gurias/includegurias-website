"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { MdDragIndicator } from "react-icons/md";

interface DraggableItemProps {
  id: string | number;
  index: number;
  children: ReactNode;
  itemHeight?: string | number;
}

const DraggableItem = ({
  id,
  index,
  children,
  itemHeight = "auto",
}: DraggableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Flex
      ref={setNodeRef}
      style={style}
      gap={3}
      alignItems="center"
      bg={isDragging ? "gray.100" : "white"}
      p={3}
      borderRadius="md"
      border="1px solid"
      borderColor={isDragging ? "blue.300" : "gray.200"}
      cursor={isDragging ? "grabbing" : "grab"}
      _hover={{
        borderColor: "blue.200",
        boxShadow: "md",
      }}
      transition="all 0.2s"
      h={itemHeight}
      {...attributes}
      {...listeners}
    >
      <Box
        display="flex"
        alignItems="center"
        cursor="grab"
        _active={{
          cursor: "grabbing",
        }}
        color="gray.400"
        fontSize="xl"
      >
        <MdDragIndicator />
      </Box>
      <Flex flex={1} alignItems="center">
        {children}
      </Flex>
    </Flex>
  );
};

export default DraggableItem;
