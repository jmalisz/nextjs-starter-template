import { Stack, StackProps } from '@chakra-ui/react'

export const Main = (properties: StackProps) => (
  <Stack
    maxWidth="48rem"
    mt="-45vh"
    pt="8rem"
    px="1rem"
    spacing="1.5rem"
    width="100%"
    {...properties}
  />
)
