import { Box, BoxProps, HStack, useColorModeValue } from "@chakra-ui/react";

interface AppBarProps extends BoxProps {
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
}

const AppBar: React.FC<AppBarProps> = ({ leftSide, rightSide, ...rest }) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  return (
    <HStack bg={bgColor} p={5} justifyContent="space-between" {...rest}>
      <Box>{leftSide}</Box>
      <Box>{rightSide}</Box>
    </HStack>
  );
};

export { AppBar };
