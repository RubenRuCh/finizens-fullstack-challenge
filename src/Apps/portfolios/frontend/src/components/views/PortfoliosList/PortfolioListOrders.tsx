import { Button, Skeleton, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { InvestmentPortfolioDTO } from '../../../../../../../Contexts/Investment/Portfolio/Domain/Model/Portfolio/InvestmentPortfolioDTO';
import { CheckIcon } from '@chakra-ui/icons';
import { useCommand } from '../../../framework/hooks/useCommand';
import { Nullable } from '../../../../../../../Contexts/Shared/Domain/Nullable';
import { DataSourceHooksPortfolios } from '../../../core/infraestructure/DataSourceHooksPortfolios';
import { REQ_STATUS } from '../../../framework/RequestStatus';
import { InvestmentOrderDTO } from '../../../../../../../Contexts/Investment/Order/Domain/Model/InvestmentOrderDTO';

export function PortfolioListOrders({
    selectedPortfolio,
    onCompleteOrder,
}: {
    selectedPortfolio: Nullable<InvestmentPortfolioDTO>;
    onCompleteOrder(order: InvestmentOrderDTO): Promise<void>;
}): JSX.Element {
    const { action: onAsyncCompleteOrder, isPending } = useCommand(onCompleteOrder);
    const { data: orders, status: ordersStatus } = DataSourceHooksPortfolios.useNonCompletedOrdersFromSelectedPortfolio();
    const isLoadingOrders = ordersStatus === REQ_STATUS.PENDING;

    if (!selectedPortfolio) {
        return <></>;
    }

    return (
        <Skeleton isLoaded={!isLoadingOrders}>
            <Table variant='striped' colorScheme='twitter' color='gray.800'>
                <TableCaption color='gray.800'>Non-completed orders of portfolio</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Allocation</Th>
                        <Th>Shares</Th>
                        <Th>Type</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        orders?.map(order => (
                            <Tr key={order.id}>
                                <Td>{order.id}</Td>
                                <Td>{order.allocationId}</Td>
                                <Td>{order.shares}</Td>
                                <Td>{order.type}</Td>
                                <Td>
                                    <Button
                                        isLoading={isPending}
                                        loadingText='Completing order'
                                        leftIcon={<CheckIcon />}
                                        colorScheme='teal'
                                        variant='solid'
                                        onClick={() => onAsyncCompleteOrder(order)}
                                    >
                                        Complete order
                                    </Button>
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </Skeleton>
    );
}
