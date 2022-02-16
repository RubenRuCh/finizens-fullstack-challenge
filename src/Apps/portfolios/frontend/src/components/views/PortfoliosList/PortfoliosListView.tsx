import { Grid, GridItem, Skeleton } from '@chakra-ui/react';
import { InvestmentOrderDTO } from '../../../../../../../Contexts/Investment/Order/Domain/Model/InvestmentOrderDTO';
import { InvestmentPortfolioDTO } from '../../../../../../../Contexts/Investment/Portfolio/Domain/Model/Portfolio/InvestmentPortfolioDTO';
import { DataSourceHooksPortfolios } from '../../../core/infraestructure/DataSourceHooksPortfolios';
import { REQ_STATUS } from '../../../framework/RequestStatus';
import { PortfolioListAllocations } from './PortfolioListAllocations';
import { PortfolioListOrders } from './PortfolioListOrders';
import { PortfolioListSidebar } from './PortfolioListSidebar';
import { PortfolioListTitle } from './PortfolioListTitle';

export function PortfoliosListView({
    portfolios,
    onSelectPortfolio,
    onNewPortfolio,
    onCompleteOrder,
    onCreateOrder,
}: {
    portfolios: InvestmentPortfolioDTO[];
    onSelectPortfolio(portfolioId: string): void;
    onNewPortfolio(portfolio: InvestmentPortfolioDTO): Promise<void>;
    onCompleteOrder(order: InvestmentOrderDTO): Promise<void>;
    onCreateOrder(order: InvestmentOrderDTO): Promise<void>;
}): JSX.Element {
    const { data: selectedPortfolio, status: selectedPortfolioStatus } = DataSourceHooksPortfolios.useSelectedPortfolio();

    const isLoadingSelectedPortfolio = selectedPortfolioStatus === REQ_STATUS.PENDING;

    return (
        <main>
            <Grid
                minHeight='90vh'
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

                <GridItem colSpan={4} borderColor='gray.50' h='-moz-min-content' p='5' boxShadow='base'>
                    <Skeleton isLoaded={!isLoadingSelectedPortfolio} justifyContent='center'>
                        <PortfolioListTitle
                            selectedPortfolio={selectedPortfolio}
                            onCreateOrder={onCreateOrder}
                        />
                    </Skeleton>
                </GridItem>

                <GridItem colSpan={1} borderColor='gray.50' boxShadow='base'>
                    <Skeleton isLoaded={!isLoadingSelectedPortfolio} justifyContent='center'>
                        <PortfolioListAllocations
                            selectedPortfolio={selectedPortfolio}
                            onCreateOrder={onCreateOrder}
                        />
                    </Skeleton>
                </GridItem>

                <GridItem colSpan={3} borderColor='gray.50' boxShadow='base'>
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
