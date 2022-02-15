import { NonCompletedOrdersFromSelectedPortfolioStore, PortfoliosStore, SelectedPortfolioStore } from './../../framework/redux/store';
import { InvestmentOrderDTO } from '../../../../../../Contexts/Investment/Order/Domain/Model/InvestmentOrderDTO';
import { InvestmentPortfolioDTO } from './../../../../../../Contexts/Investment/Portfolio/Domain/Model/Portfolio/InvestmentPortfolioDTO';
import { CustomFetch } from './CustomFetch';
import { REQ_STATUS } from '../../framework/RequestStatus';

export class ApiPortfoliosService {

    private readonly apiBaseUrl = process.env.REACT_APP_FINIZENS_API_BASE_URL || 'http://localhost:8000/api';

    public static URLS = {
        GET_PORTFOLIOS: '/portfolios',
        GET_PORTFOLIO_BY_ID: '/portfolios/:portfolioId',
        PUT_PORTFOLIO: '/portfolios/:portfolioId',

        GET_NON_COMPLETED_ORDERS: '/orders/non-completed/:portfolioId',
        POST_NEW_ORDER: '/orders',
        PATCH_ORDER: '/orders/:orderId',
    };

    public async loadPortfolios(): Promise<void> {
        const isResolved = PortfoliosStore.get().status === REQ_STATUS.RESOLVED;

        try {
            if (!isResolved) {
                PortfoliosStore.setPending();
            }

            const loadedPortfolios = await this.getPortfolios();
            PortfoliosStore.setResolved(loadedPortfolios);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            PortfoliosStore.setError(error.message);
        }
    }

    public async loadSelectedPortfolio(portfolioId: string): Promise<void> {
        try {
            SelectedPortfolioStore.setPending();
            const loadedPortfolio = await this.getPortfolioById(portfolioId);
            SelectedPortfolioStore.setResolved(loadedPortfolio);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            SelectedPortfolioStore.setError(error.message);
        }
    }

    public async loadNonCompletedOrdersFromPortfolio(portfolioId: string): Promise<void> {
        try {
            NonCompletedOrdersFromSelectedPortfolioStore.setPending();
            const loadedOrders = await this.getNonCompletedOrdersFromPortfolio(portfolioId);
            NonCompletedOrdersFromSelectedPortfolioStore.setResolved(loadedOrders);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            NonCompletedOrdersFromSelectedPortfolioStore.setError(error.message);
        }
    }

    public async getPortfolios(): Promise<InvestmentPortfolioDTO[]> {
        const portfolios = await CustomFetch
            .get<InvestmentPortfolioDTO[]>(`${this.apiBaseUrl}${ApiPortfoliosService.URLS.GET_PORTFOLIOS}`);

        return portfolios;
    }

    public async getPortfolioById(portfolioId: string): Promise<InvestmentPortfolioDTO> {
        const endpoint = CustomFetch.buildEndpoint(ApiPortfoliosService.URLS.GET_PORTFOLIO_BY_ID, [{
            key: 'portfolioId',
            value: portfolioId,
        }]);

        const portfolio = await CustomFetch.get<InvestmentPortfolioDTO>(`${this.apiBaseUrl}${endpoint}`);

        return portfolio;
    }

    public async getNonCompletedOrdersFromPortfolio(portfolioId: string): Promise<InvestmentOrderDTO[]> {
        const endpoint = CustomFetch.buildEndpoint(ApiPortfoliosService.URLS.GET_NON_COMPLETED_ORDERS, [{
            key: 'portfolioId',
            value: portfolioId,
        }]);

        const orders = await CustomFetch.get<InvestmentOrderDTO[]>(`${this.apiBaseUrl}${endpoint}`);

        return orders;
    }

    public async createPortfolio(newPortfolio: InvestmentPortfolioDTO): Promise<void> {
        const endpoint = CustomFetch.buildEndpoint(ApiPortfoliosService.URLS.PUT_PORTFOLIO, [{
            key: 'portfolioId',
            value: newPortfolio.id,
        }]);

        await CustomFetch.put<void>(`${this.apiBaseUrl}${endpoint}`, {
            allocations: newPortfolio.allocations,
        });
        await this.loadPortfolios();
    }

    public async createOrder(newOrder: InvestmentOrderDTO): Promise<void> {
        await CustomFetch.post<void>(`${this.apiBaseUrl}${ApiPortfoliosService.URLS.POST_NEW_ORDER}`, {
            id: newOrder.id,
            portfolio: newOrder.portfolioId,
            allocation: newOrder.allocationId,
            shares: newOrder.shares,
            type: newOrder.type,
        });

        await this.loadNonCompletedOrdersFromPortfolio(newOrder.portfolioId);
    }

    public async patchOrder(order: InvestmentOrderDTO): Promise<void> {
        const endpoint = CustomFetch.buildEndpoint(ApiPortfoliosService.URLS.PATCH_ORDER, [{
            key: 'orderId',
            value: order.id,
        }]);

        await CustomFetch.patch<void>(`${this.apiBaseUrl}${endpoint}`, {
            status: 'completed',
        });

        await this.loadNonCompletedOrdersFromPortfolio(order.portfolioId);
        await this.loadSelectedPortfolio(order.portfolioId);
    }

}
