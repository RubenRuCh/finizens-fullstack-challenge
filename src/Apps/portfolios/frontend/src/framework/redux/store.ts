import { InvestmentOrderDTO } from '../../../../../../Contexts/Investment/Order/Domain/Model/InvestmentOrderDTO';
import { InvestmentPortfolioDTO } from '../../../../../../Contexts/Investment/Portfolio/Domain/Model/Portfolio/InvestmentPortfolioDTO';
import { combineReducers, createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { GenericRemoteDataStoreFactory, GenericStoreType } from './GenericRemoteDataStoreFactory';
import { GenericDataStoreFactory, GenericValueType } from './GenericDataStoreFactory';

// Redux GlobalState
interface GlobalState {
    domainStore: {
        portfolios: GenericStoreType<InvestmentPortfolioDTO[]>,
        selectedPortfolio: GenericStoreType<InvestmentPortfolioDTO>,
        nonCompletedOrdersFromSelectedPortfolio: GenericStoreType<InvestmentOrderDTO[]>
    };
    uiStore: {
        selectedPortfolioId: GenericValueType<string>,
    };
}

const PrebuildGenericDataStoreFactory = <T>(key: string) => GenericDataStoreFactory<T, GlobalState>(key);
const PrebuildGenericRemoteDataStoreFactory = <T>(key: string) => GenericRemoteDataStoreFactory<T, GlobalState>(key);

// Pre-built stores
const PortfoliosStorePrebuilt = PrebuildGenericRemoteDataStoreFactory<InvestmentPortfolioDTO[]>('PORTFOLIOS');
const SelectedPortfolioStorePrebuilt = PrebuildGenericRemoteDataStoreFactory<InvestmentPortfolioDTO>('SELECTED_PORTFOLIO');
const NonCompletedOrdersFromSelectedPortfolioStorePrebuilt
    = PrebuildGenericRemoteDataStoreFactory<InvestmentOrderDTO[]>('SELECTED_PORTFOLIO_NON_COMPLETED_ORDERS');

const SelectedPortfolioIdStorePrebuilt = PrebuildGenericDataStoreFactory<string>('SELECTED_PORTFOLIO_ID');

const reducer = combineReducers({
    domainStore: combineReducers({
        portfolios: PortfoliosStorePrebuilt.reducer,
        selectedPortfolio: SelectedPortfolioStorePrebuilt.reducer,
        nonCompletedOrdersFromSelectedPortfolio: NonCompletedOrdersFromSelectedPortfolioStorePrebuilt.reducer,
    }),
    uiStore: combineReducers({
        selectedPortfolioId: SelectedPortfolioIdStorePrebuilt.reducer,
    }),
});

export const store = createStore(
    reducer,
    devToolsEnhancer({}),
);

// Build stores
export const PortfoliosStore = PortfoliosStorePrebuilt.buildStore(
    store,
    state => state.domainStore.portfolios,
);

export const SelectedPortfolioStore = SelectedPortfolioStorePrebuilt.buildStore(
    store,
    state => state.domainStore.selectedPortfolio,
);

export const NonCompletedOrdersFromSelectedPortfolioStore = NonCompletedOrdersFromSelectedPortfolioStorePrebuilt.buildStore(
    store,
    state => state.domainStore.nonCompletedOrdersFromSelectedPortfolio,
);

export const SelectedPortfolioIdStore = SelectedPortfolioIdStorePrebuilt.buildStore(
    store,
    state => state.uiStore.selectedPortfolioId,
);
