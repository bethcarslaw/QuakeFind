import { Text, TextProps } from "@chakra-ui/react";

const Label: React.FC<TextProps> = ({ children, ...rest }) => (
  <Text fontSize={10} textTransform="uppercase" letterSpacing={3} {...rest}>
    {children}
  </Text>
);

export { Label };
