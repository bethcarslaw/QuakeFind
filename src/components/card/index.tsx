import { Box, BoxProps } from "@chakra-ui/react";

const Card: React.FC<BoxProps> = ({ children, ...rest }) => (
  <Box p={4} borderRadius={10} borderWidth={1} {...rest}>
    {children}
  </Box>
);

export { Card };
