import { render, RenderOptions } from '@testing-library/react';
import { ChakraProvider, theme } from '@chakra-ui/react';

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customRender = (ui: React.ReactElement, options?: RenderOptions) => render(ui, {
    wrapper: AllProviders,
    ...options,
});

export { customRender as render };
