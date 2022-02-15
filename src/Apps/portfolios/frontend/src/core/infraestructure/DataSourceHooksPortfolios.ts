import { NonCompletedOrdersFromSelectedPortfolioStore, SelectedPortfolioIdStore, SelectedPortfolioStore } from './../../framework/redux/store';
import { InvestmentPortfolioDTO } from './../../../../../../Contexts/Investment/Portfolio/Domain/Model/Portfolio/InvestmentPortfolioDTO';
import { GenericStoreType } from '../../framework/redux/GenericRemoteDataStoreFactory';
import { useSelector } from 'react-redux';
import { Nullable } from '../../../../../../Contexts/Shared/Domain/Nullable';
import { InvestmentOrderDTO } from '../../../../../../Contexts/Investment/Order/Domain/Model/InvestmentOrderDTO';
import { createSelector } from 'reselect';
import { PortfoliosStore } from '../../framework/redux/store';
import { REQ_STATUS } from '../../framework/RequestStatus';
import { ApiPortfoliosService } from './ApiPortfoliosService';

// Hooks
export const DataSourceHooksPortfolios = {
    usePortfolios: (): GenericStoreType<InvestmentPortfolioDTO[]> => useSelector(getPortfolios),
    useSelectedPortfolio: (): GenericStoreType<Nullable<InvestmentPortfolioDTO>> => useSelector(getSelectedPortfolio),
    useNonCompletedOrdersFromSelectedPortfolio:
        (): GenericStoreType<InvestmentOrderDTO[]> => useSelector(getNonCompletedOrdersFromSelectedPortfolio),
};

// Selectors
const getPortfolios = createSelector(
    PortfoliosStore.getLocalStateFn,
    portfoliosWrapper => {
        const portfolios = portfoliosWrapper.data;

        if (portfolios === null) {
            loadPortfoliosIfNeccesary(portfoliosWrapper.status);
        }

        return {
            ...portfoliosWrapper,
            data: portfolios,
        };
    },
);

const getSelectedPortfolio = createSelector(
    SelectedPortfolioStore.getLocalStateFn,
    SelectedPortfolioIdStore.getLocalStateFn,
    (
        portfolioWrapper,
        selectedPortfolioId,
    ) => {
        const portfolio = portfolioWrapper.data;

        if (!selectedPortfolioId) {
            return {
                ...portfolioWrapper,
                data: null,
            };
        }

        if (portfolio === null) {
            loadSelectedPortfolioIfNeccesary(selectedPortfolioId, portfolioWrapper.status);
        }

        return {
            ...portfolioWrapper,
            data: portfolio,
        };
    },
);

const getNonCompletedOrdersFromSelectedPortfolio = createSelector(
    NonCompletedOrdersFromSelectedPortfolioStore.getLocalStateFn,
    SelectedPortfolioIdStore.getLocalStateFn,
    (
        ordersWrapper,
        selectedPortfolioId,
    ) => {
        const orders = ordersWrapper.data;

        if (!selectedPortfolioId) {
            return {
                ...ordersWrapper,
                data: null,
            };
        }

        if (orders === null) {
            loadNonCompletedOrdersFromSelectedPortfolioIfNeccesary(selectedPortfolioId, ordersWrapper.status);
        }

        return {
            ...ordersWrapper,
            data: orders,
        };
    },
);

function loadPortfoliosIfNeccesary(dataStatus: REQ_STATUS): void {
    if (shouldDataBeLoaded(dataStatus)) {
        loadPortfolios();
    }
}

function loadSelectedPortfolioIfNeccesary(portfolioId: string, dataStatus: REQ_STATUS): void {
    if (shouldDataBeLoaded(dataStatus)) {
        loadSelectedPortfolio(portfolioId);
    }
}

function loadNonCompletedOrdersFromSelectedPortfolioIfNeccesary(portfolioId: string, dataStatus: REQ_STATUS): void {
    if (shouldDataBeLoaded(dataStatus)) {
        loadNonCompletedOrdersFromSelectedPortfolio(portfolioId);
    }
}

function shouldDataBeLoaded(dataStatus: REQ_STATUS): boolean {
    return dataStatus === REQ_STATUS.UNINITIALIZED;
}

async function loadPortfolios(): Promise<void> {
    const service = new ApiPortfoliosService();
    await service.loadPortfolios();
}

async function loadSelectedPortfolio(portfolioId: string): Promise<void> {
    const service = new ApiPortfoliosService();
    await service.loadSelectedPortfolio(portfolioId);
}

async function loadNonCompletedOrdersFromSelectedPortfolio(portfolioId: string): Promise<void> {
    const service = new ApiPortfoliosService();
    await service.loadNonCompletedOrdersFromPortfolio(portfolioId);
}
