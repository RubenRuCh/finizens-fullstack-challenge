import { Grid, GridItem, Heading, Skeleton } from '@chakra-ui/react';
import { InvestmentOrderDTO } from '../../../../../../../Contexts/Investment/Order/Domain/Model/InvestmentOrderDTO';
import { InvestmentPortfolioDTO } from '../../../../../../../Contexts/Investment/Portfolio/Domain/Model/Portfolio/InvestmentPortfolioDTO';
import { DataSourceHooksPortfolios } from '../../../core/infraestructure/DataSourceHooksPortfolios';
import { REQ_STATUS } from '../../../framework/RequestStatus';
import { PortfolioListAllocations } from './PortfolioListAllocations';
import { PortfolioListOrders } from './PortfolioListOrders';
import { PortfolioListSidebar } from './PortfolioListSidebar';

export function PortfoliosListView({
    portfolios,
    onSelectPortfolio,
    onNewPortfolio,
    onCompleteOrder,
}: {
    portfolios: InvestmentPortfolioDTO[];
    onSelectPortfolio(portfolioId: string): void;
    onNewPortfolio(portfolio: InvestmentPortfolioDTO): Promise<void>;
    onCompleteOrder(order: InvestmentOrderDTO): Promise<void>;
}): JSX.Element {
    const { data: selectedPortfolio, status: selectedPortfolioStatus } = DataSourceHooksPortfolios.useSelectedPortfolio();

    const isLoadingSelectedPortfolio = selectedPortfolioStatus === REQ_STATUS.PENDING;

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

                <GridItem colSpan={4} bg='gray.50' h='10vh'>
                    <Skeleton isLoaded={!isLoadingSelectedPortfolio} justifyContent='center'>
                        <Heading textAlign='center' justifyContent='center' color='gray.900' >
                            {
                                selectedPortfolio
                                    ? `Portfolio: ${selectedPortfolio.id}`
                                    : 'Select a portfolio'
                            }
                        </Heading>
                    </Skeleton>
                </GridItem>

                <GridItem colSpan={1} bg='gray.50'>
                    <Skeleton isLoaded={!isLoadingSelectedPortfolio} justifyContent='center'>
                        <PortfolioListAllocations
                            selectedPortfolio={selectedPortfolio}
                        />
                    </Skeleton>
                </GridItem>

                <GridItem colSpan={3} bg='gray.50'>
                    <Skeleton isLoaded={!isLoadingSelectedPortfolio} justifyContent='center'>
                        <PortfolioListOrders
                            selectedPortfolio={selectedPortfolio}
                            onCompleteOrder={onCompleteOrder}
                        />
                    </Skeleton>
                </GridItem>
            </Grid>
        </main>
    );
}
