import { Skeleton } from '@chakra-ui/react';
import { useEffect } from 'react';
import { InvestmentPortfolioDTO } from '../../../../../../../Contexts/Investment/Portfolio/Domain/Model/Portfolio/InvestmentPortfolioDTO';
import { ApiPortfoliosService } from '../../../core/infraestructure/ApiPortfoliosService';
import { DataSourceHooksPortfolios } from '../../../core/infraestructure/DataSourceHooksPortfolios';
import { SelectedPortfolioIdStore, SelectedPortfolioStore } from '../../../framework/redux/store';
import { REQ_STATUS } from '../../../framework/RequestStatus';
import { PortfoliosListView } from './PortfoliosListView';

export function PortfoliosListPresenter(): JSX.Element {
    const { data: portfolios, status: portfoliosStatus } = DataSourceHooksPortfolios.usePortfolios();

    const [selectedId, onSelectPortfolioId] = SelectedPortfolioIdStore.useDataHook();

    console.log({ selectedId });

    useEffect(
        () => {
            SelectedPortfolioIdStore.set(null);
            SelectedPortfolioStore.setUninitialized();
        },
        [],
    );

    const isPortfolioListLoading = portfoliosStatus === REQ_STATUS.PENDING;

    return (
        <Skeleton isLoaded={!isPortfolioListLoading}>
            <PortfoliosListView
                portfolios={portfolios ?? []}
                onSelectPortfolio={onSelectPortfolioId}
                onNewPortfolio={onNewPortfolio}
            />
        </Skeleton>
    );
}

const onNewPortfolio = async (portfolio: InvestmentPortfolioDTO): Promise<void> => {
    await new ApiPortfoliosService().createPortfolio(portfolio);
};
