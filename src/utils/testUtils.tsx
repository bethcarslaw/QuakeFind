import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

export const ThemeWrapper: React.FC = ({ children }) => (
  <ChakraProvider>{children}</ChakraProvider>
);
