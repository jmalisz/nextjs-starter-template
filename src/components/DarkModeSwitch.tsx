import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

export function DarkModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <IconButton
      aria-label="Toggle Theme"
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
    />
  );
}
