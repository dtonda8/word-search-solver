import { Box, Button, Collapse, useDisclosure, Container } from "@chakra-ui/react";

function CollapseDiv({btnTitle, content}) {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box p={3}>
      <Button colorScheme="blue" onClick={onToggle}>{btnTitle}</Button>
      <Collapse in={isOpen} unmountOnExit>
        <Container maxW='container.sm'>
          {content}
        </Container>
      </Collapse>
    </Box>
  );
}

export default CollapseDiv;
