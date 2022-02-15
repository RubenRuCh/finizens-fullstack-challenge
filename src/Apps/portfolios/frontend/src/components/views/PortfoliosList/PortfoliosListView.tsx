import { Grid, GridItem } from '@chakra-ui/react';
import { InvestmentPortfolioDTO } from '../../../../../../../Contexts/Investment/Portfolio/Domain/Model/Portfolio/InvestmentPortfolioDTO';
import { PortfolioListSidebar } from './PortfolioListSidebar';

export function PortfoliosListView({
    portfolios,
    onSelectPortfolio,
    onNewPortfolio,
}: {
    portfolios: InvestmentPortfolioDTO[];
    onSelectPortfolio(portfolioId: string): void;
    onNewPortfolio(portfolio: InvestmentPortfolioDTO): Promise<void>;
}): JSX.Element {
    return (
        <main>
            <Grid
                h='90vh'
                templateRows='auto 1fr'
                templateColumns='repeat(5, 1fr)'
                gap={4}
            >
                <GridItem rowSpan={2} colSpan={1} bg='gray.700'>
                    <PortfolioListSidebar
                        portfolios={portfolios}
                        onSelectPortfolio={onSelectPortfolio}
                        onNewPortfolio={onNewPortfolio}
                    />
                </GridItem>

                <GridItem colSpan={4} bg='gray.200' h='10vh'>

                </GridItem>

                <GridItem colSpan={2} bg='gray.200'>

                </GridItem>

                <GridItem colSpan={2} bg='gray.200'>

                </GridItem>
            </Grid>
        </main>
    );
}
