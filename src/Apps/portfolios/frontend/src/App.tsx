import {
    ChakraProvider,
    Box,
    Text,
    VStack,
    Grid,
    theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import { Logo } from './components/Logo';
import { PortfoliosListPresenter } from './components/views/PortfoliosList/PortfoliosListPresenter';

export const App = (): JSX.Element => (
    <ChakraProvider theme={theme}>
        <Box textAlign='center' fontSize='xl'>
            <Grid minH='100vh' p={3}>
                <ColorModeSwitcher justifySelf='flex-end' />
                <VStack spacing={8}>
                    <Logo h='40vmin' pointerEvents='none' />
                    <Text>Finizens</Text>
                    <PortfoliosListPresenter />
                </VStack>
            </Grid>
        </Box>
    </ChakraProvider>
);
