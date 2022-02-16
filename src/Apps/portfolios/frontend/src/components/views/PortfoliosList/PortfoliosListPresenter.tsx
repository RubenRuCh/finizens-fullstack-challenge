import { Skeleton } from '@chakra-ui/react';
import { useEffect } from 'react';
import { InvestmentOrderDTO } from '../../../../../../../Contexts/Investment/Order/Domain/Model/InvestmentOrderDTO';
import { InvestmentPortfolioDTO } from '../../../../../../../Contexts/Investment/Portfolio/Domain/Model/Portfolio/InvestmentPortfolioDTO';
import { ApiPortfoliosService } from '../../../core/infraestructure/ApiPortfoliosService';
import { DataSourceHooksPortfolios } from '../../../core/infraestructure/DataSourceHooksPortfolios';
import { NonCompletedOrdersFromSelectedPortfolioStore, SelectedPortfolioIdStore, SelectedPortfolioStore } from '../../../framework/redux/store';
import { REQ_STATUS } from '../../../framework/RequestStatus';
import { PortfoliosListView } from './PortfoliosListView';

const clearDomainStores = () => {
    SelectedPortfolioStore.setUninitialized();
    NonCompletedOrdersFromSelectedPortfolioStore.setUninitialized();
};

export function PortfoliosListPresenter(): JSX.Element {
    const { data: portfolios, status: portfoliosStatus } = DataSourceHooksPortfolios.usePortfolios();

    const [, onSelectPortfolioId] = SelectedPortfolioIdStore.useDataHook();

    const onLocalSelectPortfolio = (portfolioId: string) => {
        onSelectPortfolioId(portfolioId);

        clearDomainStores();
    };

    useEffect(
        () => {
            SelectedPortfolioIdStore.set(null);

            clearDomainStores();
        },
        [],
    );

    const isPortfolioListLoading = portfoliosStatus === REQ_STATUS.PENDING;

    return (
        <Skeleton isLoaded={!isPortfolioListLoading}>
            <PortfoliosListView
                portfolios={portfolios ?? []}
                onSelectPortfolio={onLocalSelectPortfolio}
                onNewPortfolio={onNewPortfolio}
                onCompleteOrder={onCompleteOrder}
                onCreateOrder={onCreateOrder}
            />
        </Skeleton>
    );
}

const onNewPortfolio = async (portfolio: InvestmentPortfolioDTO): Promise<void> => {
    await new ApiPortfoliosService().createPortfolio(portfolio);
};

const onCompleteOrder = async (order: InvestmentOrderDTO): Promise<void> => {
    await new ApiPortfoliosService().patchOrder(order);
};

const onCreateOrder = async (order: InvestmentOrderDTO): Promise<void> => {
    await new ApiPortfoliosService().createOrder(order);
};
