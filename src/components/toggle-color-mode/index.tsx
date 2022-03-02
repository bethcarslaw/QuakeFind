import { Switch, useColorMode, HStack } from "@chakra-ui/react";
import { Label } from "../label";

const ToggleColorMode: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack>
      <Label>Dark Mode</Label>
      <Switch
        onChange={toggleColorMode}
        isChecked={colorMode === "dark"}
        data-testid="toggle-color-mode-switch"
      ></Switch>
    </HStack>
  );
};

export { ToggleColorMode };
