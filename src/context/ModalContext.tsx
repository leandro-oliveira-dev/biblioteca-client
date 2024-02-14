import { useDisclosure } from "@chakra-ui/react";
import React, { createContext, useContext, useState } from "react";

type IModal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const ModalContext = createContext({} as IModal);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
