import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Checkbox,
  HStack,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import CustomLink from '../../common/CustomLink';

type AboutBlogWarningProps = {
  // isOpen: boolean;
  showWarning: boolean;
  onClose: () => void;
  onCheckUnderstand: () => void;
  onUncheckUnderstand: () => void;
};

function AboutBlogWarning({
  showWarning,
  onClose,
  onCheckUnderstand,
  onUncheckUnderstand,
}: AboutBlogWarningProps) {
  const onToggleUnderstand = (understand: boolean) => {
    if (understand) {
      onCheckUnderstand();
    } else {
      onUncheckUnderstand();
    }
  };

  return (
    <Modal
      isOpen={showWarning}
      onClose={() => {
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Hello stranger,</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          This blog is a little strange. Take 30 seconds to adjust your
          expectations. Go to{' '}
          <CustomLink
            href="/blog/about-digital-garden-blog"
            // otherProps={{ onClick: onClose }}
            onClick={onClose}
          >
            about blog
          </CustomLink>
        </ModalBody>

        <ModalFooter>
          <VStack>
            <Checkbox
              onChange={(e) => {
                onToggleUnderstand(e.target.checked);
              }}
            >
              I understand, don't show again
            </Checkbox>
            {/* <HStack>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </HStack> */}
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AboutBlogWarning;
