import { useEffect } from 'react';
import { DataSourceHooksPortfolios } from '../../../core/infraestructure/DataSourceHooksPortfolios';
import { SelectedPortfolioIdStore, SelectedPortfolioStore } from '../../../framework/redux/store';
import { REQ_STATUS } from '../../../framework/RequestStatus';

export function PortfoliosListPresenter(): JSX.Element {
    const { data: portfolios, status: portfoliosStatus } = DataSourceHooksPortfolios.usePortfolios();
    console.log({ portfolios });
    console.log({ portfoliosStatus });

    // const [, onSelectPortfolio] = SelectedPortfolioIdStore.useDataHook();

    useEffect(
        () => {
            SelectedPortfolioIdStore.set(null);
            SelectedPortfolioStore.setUninitialized();
        },
        [],
    );

    const isPortfolioListLoading = portfoliosStatus === REQ_STATUS.PENDING;

    return (
        <section>
            <div>hola</div>
            <div>{isPortfolioListLoading}</div>
        </section>
    );
}
