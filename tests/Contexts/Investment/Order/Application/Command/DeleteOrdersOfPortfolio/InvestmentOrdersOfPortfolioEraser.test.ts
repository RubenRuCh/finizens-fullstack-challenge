import { DeleteInvestmentOrdersOfPortfolioCommandHandler } from '../../../../../../../src/Contexts/Investment/Order/Application/Command/DeleteOrdersOfPortfolio/DeleteInvestmentOrdersOfPortfolioCommandHandler';
import { InvestmentPortfolioMother } from './../../../../Portfolio/Domain/Model/InvestmentPortfolioMother';
import { InvestmentOrderRepositoryMock } from '../../../__mocks/InvestmentOrderRepositoryMock';
import { InvestmentOrderMother } from '../../../Domain/Model/InvestmentOrderMother';
import { InvestmentOrdersOfPortfolioEraser } from '../../../../../../../src/Contexts/Investment/Order/Application/Command/DeleteOrdersOfPortfolio/InvestmentOrdersOfPortfolioEraser';
import { DeleteInvestmentOrdersOfPortfolioCommandMother } from './DeleteInvestmentOrdersOfPortfolioCommandMother';

let repository: InvestmentOrderRepositoryMock;
let handler: DeleteInvestmentOrdersOfPortfolioCommandHandler;

describe('InvestmentOrdersOfPortfolioEraser.test', () => {
  beforeEach(() => {
    repository = new InvestmentOrderRepositoryMock();

    const eraser = new InvestmentOrdersOfPortfolioEraser(repository);
    handler = new DeleteInvestmentOrdersOfPortfolioCommandHandler(eraser);
  });

  it('should delete all orders related to a portfolio', async () => {
    const portfolio = InvestmentPortfolioMother.random();

    const firstOrder = InvestmentOrderMother.withPortfolioId(InvestmentOrderMother.random(), portfolio.id);
    const secondOrder = InvestmentOrderMother.withPortfolioId(InvestmentOrderMother.random(), portfolio.id);
    const thirdOrder = InvestmentOrderMother.withPortfolioId(InvestmentOrderMother.random(), portfolio.id);

    const ordersToDelete = [firstOrder, secondOrder, thirdOrder];

    const command = DeleteInvestmentOrdersOfPortfolioCommandMother.createFromPortfolio(portfolio);

    repository.whenSearchByPortfolioIdThenReturn(ordersToDelete);

    await handler.handle(command);

    repository.assertLastSearchedPortfolioIdIs(portfolio.id);
    repository.assertLastDeletedOrderIdIs(thirdOrder.id);
  });
});
