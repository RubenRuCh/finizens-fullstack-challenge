import {
    ChakraProvider,
    Box,
    Grid,
    theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import { PortfoliosListPresenter } from './components/views/PortfoliosList/PortfoliosListPresenter';

export const App = (): JSX.Element => (
    <ChakraProvider theme={theme}>
        <Box textAlign='center' fontSize='xl'>
            <Grid p={3}>
                <ColorModeSwitcher justifySelf='flex-end' />
                <PortfoliosListPresenter />
            </Grid>
        </Box>
    </ChakraProvider>
);
