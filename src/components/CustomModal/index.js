import { forwardRef, useImperativeHandle } from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button
} from '@chakra-ui/react'



function CustomModal({
    children,
    title,
    cancelText,
    okText
}, ref) {
    
    const { isOpen, onOpen, onClose } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen
    }))

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title || "Title"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        {cancelText || "Close"}
                    </Button>
                    <Button variant='ghost'>{okText || "Comfirm"}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default forwardRef(CustomModal)