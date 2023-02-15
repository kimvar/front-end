import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";

function CustomModal({ isOpen, onClose, title, children, size }) {
  return (
    <Modal size={size} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mt={4}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box minH="calc(100vh - var(--chakra-space-28))">{children}</Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;
