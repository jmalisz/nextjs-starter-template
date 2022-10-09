import { useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export function DarkModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <IconButton
      aria-label="Toggle Theme"
      colorScheme="green"
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      position="fixed"
      right={4}
      top={4}
      onClick={toggleColorMode}
    />
  );
}
