"use client";

import { BottomHeader, BottomPortal } from "./components";
import { useChangeSheetHeight, useSheetAnimationState, useSheetDrag } from "./hooks";

import { AnimatePresence, motion } from "framer-motion";

interface BottomSheetProps {
  children: React.ReactNode;
  isShow: boolean;
  onClose: () => void;

  defaultHeight?: string | number;
  maxHeight?: string | number;
}

const BottomSheet = ({
  children,
  isShow,
  onClose,

  defaultHeight = "35dvh",
  maxHeight = "80dvh",
}: BottomSheetProps) => {
  const { isOpenSheet, activePortal, handleUnActivePortal, handelCloseSheet } =
    useSheetAnimationState({
      isShow,
    });

  const { targetRef, handleDragStart, movementHeight, sheetState, initState } = useSheetDrag();

  const sheetHeight = useChangeSheetHeight({
    sheetState,
    defaultHeight,
    maxHeight,
    handelCloseSheet,
  });

  return (
    <BottomPortal isShow={activePortal}>
      <AnimatePresence
        onExitComplete={() => {
          onClose();
          handleUnActivePortal();
          initState();
        }}
      >
        {isOpenSheet && (
          <motion.article
            initial={{ y: "100%" }}
            animate={{ y: `0%`, height: sheetHeight }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            whileTap={{
              height: movementHeight ? `${movementHeight}px` : sheetHeight,
              transition: { duration: 0 },
            }}
            className="w-full rounded-tl-[2.4rem] rounded-tr-[2.4rem] bg-slate-500 overflow-hidden"
            style={{
              maxHeight: maxHeight,
              minHeight: "3.2rem",
              willChange: "all",
            }}
          >
            <BottomHeader
              onMouseDown={handleDragStart}
              ref={targetRef}
            />
            {children}
          </motion.article>
        )}
      </AnimatePresence>
    </BottomPortal>
  );
};

export default BottomSheet;