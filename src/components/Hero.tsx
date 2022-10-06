import { Flex, Heading } from '@chakra-ui/react'

export const Hero = ({ title }: { title: string }) => (
  <Flex
    alignItems="center"
    bgClip="text"
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    height="100vh"
    justifyContent="center"
  >
    <Heading fontSize="6vw">{title}</Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'with-chakra-ui-typescript',
}
