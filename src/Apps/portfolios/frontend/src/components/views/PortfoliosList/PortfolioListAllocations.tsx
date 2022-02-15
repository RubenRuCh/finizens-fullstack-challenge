import { Button, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { InvestmentPortfolioDTO } from '../../../../../../../Contexts/Investment/Portfolio/Domain/Model/Portfolio/InvestmentPortfolioDTO';
import { Nullable } from '../../../../../../../Contexts/Shared/Domain/Nullable';

export function PortfolioListAllocations({
    selectedPortfolio,
}: {
    selectedPortfolio: Nullable<InvestmentPortfolioDTO>;
}): JSX.Element {
    if (!selectedPortfolio) {
        return <></>;
    }

    return (
        <Table variant='striped' colorScheme='twitter' color='gray.800'>
            <TableCaption color='gray.800'>Current allocations</TableCaption>
            <Thead>
                <Tr>
                    <Th>Id</Th>
                    <Th>Shares</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    selectedPortfolio.allocations.map(allocation => (
                        <Tr key={allocation.id}>
                            <Td>{allocation.id}</Td>
                            <Td>{allocation.shares}</Td>
                            <Td>
                                <Button
                                    colorScheme='green'
                                    variant='solid'
                                >
                                    Buy more shares
                                </Button>

                                <Button
                                    colorScheme='red'
                                    variant='solid'
                                >
                                    Sell allocation
                                </Button>
                            </Td>
                        </Tr>
                    ))
                }
            </Tbody>
        </Table>
    );
}
