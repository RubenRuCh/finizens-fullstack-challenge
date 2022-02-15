import { Button, Center, chakra, Stack } from '@chakra-ui/react';
import { InvestmentPortfolioDTO } from '../../../../../../../Contexts/Investment/Portfolio/Domain/Model/Portfolio/InvestmentPortfolioDTO';
import { v4 } from 'uuid';
import { AddIcon } from '@chakra-ui/icons';
import blueLogo from '../../../assets/img/blue_logo.svg';
import { useCommand } from '../../../framework/hooks/useCommand';

export function PortfolioListSidebar({
    portfolios,
    onSelectPortfolio,
    onNewPortfolio,
}: {
    portfolios: InvestmentPortfolioDTO[];
    onSelectPortfolio(portfolioId: string): void;
    onNewPortfolio(portfolio: InvestmentPortfolioDTO): Promise<void>;
}): JSX.Element {
    const { action: onAsyncNewPortfolio, isPending } = useCommand(onNewPortfolio);

    const onLocalNewPortfolio = () => {
        const randomPortfolio: InvestmentPortfolioDTO = {
            id: v4(),
            allocations: [],
        };

        onAsyncNewPortfolio(randomPortfolio);
    };

    return (
        <aside>
            <Stack direction='row' p={4} justifyContent='center'>
                <section>
                    <Center>
                        <chakra.img src={blueLogo} pointerEvents='none' />
                    </Center>
                </section>
            </Stack>

            <Stack direction='column' p={4} justifyContent='center'>
                <Button
                    leftIcon={<AddIcon />}
                    colorScheme='twitter'
                    variant='solid'
                    isLoading={isPending}
                    loadingText='Creating new portfolio'
                    onClick={onLocalNewPortfolio}
                >
                    New portfolio
                </Button>
            </Stack>

            <Stack
                direction='column'
                p={5}
                justifyContent='start'
                overflow='auto'
                maxHeight='60vh'

                css={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'teal',
                        borderRadius: '24px',
                    },
                }}
            >
                {portfolios.map(portfolio => (
                    <Button colorScheme='twitter' variant='outline' key={portfolio.id} onClick={() => onSelectPortfolio(portfolio.id)}>
                        {portfolio.id}
                    </Button>
                ))}
            </Stack>
        </aside>
    );
}
