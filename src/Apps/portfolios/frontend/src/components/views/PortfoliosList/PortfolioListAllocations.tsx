import { Badge, Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Table, TableCaption, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { InvestmentOrderDTO } from '../../../../../../../Contexts/Investment/Order/Domain/Model/InvestmentOrderDTO';
import { InvestmentAllocationDTO } from '../../../../../../../Contexts/Investment/Portfolio/Domain/Model/Allocation/InvestmentAllocationDTO';
import { InvestmentPortfolioDTO } from '../../../../../../../Contexts/Investment/Portfolio/Domain/Model/Portfolio/InvestmentPortfolioDTO';
import { Nullable } from '../../../../../../../Contexts/Shared/Domain/Nullable';
import { IdGenerator } from '../../../core/domain/IdGenerator';
import { useCommand } from '../../../framework/hooks/useCommand';

const minimumSharesToBuy = 1;

export function PortfolioListAllocations({
    selectedPortfolio,
    onCreateOrder,
}: {
    selectedPortfolio: Nullable<InvestmentPortfolioDTO>;
    onCreateOrder(order: InvestmentOrderDTO): Promise<void>;
}): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedAllocation, setSelectedAllocation] = useState<Nullable<InvestmentAllocationDTO>>(null);
    const [sharesToBuy, setSharesToBuy] = useState(0);

    const { action: onAsyncSellAlocation, isPending: isMakeSellOrderPending } = useCommand(onCreateOrder);
    const { action: onAsyncBuyAlocation, isPending: isMakeBuyOrderPending } = useCommand(onCreateOrder);

    if (!selectedPortfolio) {
        return <></>;
    }

    const onLocalSellAlocation = (allocationToSell: InvestmentAllocationDTO) => {
        const newSellOrder: InvestmentOrderDTO = {
            id: IdGenerator.random(),
            allocationId: allocationToSell.id,
            portfolioId: selectedPortfolio.id,
            shares: allocationToSell.shares,
            status: 'pending',
            type: 'sell',
        };

        onAsyncSellAlocation(newSellOrder);
    };

    const onLocalBuyAlocation = async () => {
        if (!selectedAllocation) {
            return;
        }

        const newSellOrder: InvestmentOrderDTO = {
            id: IdGenerator.random(),
            allocationId: selectedAllocation.id,
            portfolioId: selectedPortfolio.id,
            shares: sharesToBuy,
            status: 'pending',
            type: 'buy',
        };

        await onAsyncBuyAlocation(newSellOrder);
        onCloseModal();
    };

    const onOpenBuyMoreShadesModal = (allocationToBuy: InvestmentAllocationDTO) => {
        setSelectedAllocation(allocationToBuy);
        onOpen();
    };

    const onCloseModal = () => {
        setSharesToBuy(0);
        onClose();
    };

    return (
        <section>

            <Table variant='striped' colorScheme='twitter'>
                <TableCaption>Current allocations</TableCaption>
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
                                <Td>
                                    {allocation.id}
                                </Td>
                                <Td>
                                    <Badge colorScheme='purple'>
                                        {allocation.shares}
                                    </Badge>
                                </Td>
                                <Td>
                                    <Button
                                        colorScheme='green'
                                        variant='solid'
                                        marginBottom='1'
                                        onClick={() => onOpenBuyMoreShadesModal(allocation)}
                                    >
                                        Buy more shares
                                    </Button>

                                    <Button
                                        isLoading={isMakeSellOrderPending}
                                        loadingText='Creating order'
                                        colorScheme='red'
                                        variant='solid'
                                        onClick={() => onLocalSellAlocation(allocation)}
                                    >
                                        Sell allocation
                                    </Button>
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>

            <Modal onClose={onCloseModal} isOpen={isOpen && !!selectedAllocation} isCentered motionPreset='slideInBottom'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Buy more shares to allocation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel htmlFor='amount'>Amount to buy (current shares: {selectedAllocation?.shares})</FormLabel>
                            <NumberInput min={0} value={sharesToBuy} onChange={value => setSharesToBuy(+value)}>
                                <NumberInputField id='amount' />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            isLoading={isMakeBuyOrderPending}
                            loadingText='Creating order'
                            colorScheme='blue'
                            mr={3}
                            onClick={onLocalBuyAlocation}
                            isDisabled={sharesToBuy < minimumSharesToBuy}
                        >
                            Save
                        </Button>
                        <Button onClick={onCloseModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    );
}
