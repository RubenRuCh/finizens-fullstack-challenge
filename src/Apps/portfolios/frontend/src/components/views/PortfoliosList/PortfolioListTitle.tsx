import { Button, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useDisclosure } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { InvestmentOrderDTO } from '../../../../../../../Contexts/Investment/Order/Domain/Model/InvestmentOrderDTO';
import { InvestmentPortfolioDTO } from '../../../../../../../Contexts/Investment/Portfolio/Domain/Model/Portfolio/InvestmentPortfolioDTO';
import { Nullable } from '../../../../../../../Contexts/Shared/Domain/Nullable';
import { IdGenerator } from '../../../core/domain/IdGenerator';
import { useCommand } from '../../../framework/hooks/useCommand';

const minimumSharesToBuy = 1;

export function PortfolioListTitle({
    selectedPortfolio,
    onCreateOrder,
}: {
    selectedPortfolio: Nullable<InvestmentPortfolioDTO>;
    onCreateOrder(order: InvestmentOrderDTO): Promise<void>;
}): JSX.Element {
    const { action: onAsyncBuyAlocation, isPending: isMakeBuyOrderPending } = useCommand(onCreateOrder);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [sharesToBuy, setSharesToBuy] = useState(0);
    const [allocationId, setAllocationId] = useState(IdGenerator.random());

    const isAllocationIdValid = useMemo(
        () => IdGenerator.isValid(allocationId),
        [allocationId],
    );

    const isSharesValid = sharesToBuy >= minimumSharesToBuy;

    if (!selectedPortfolio) {
        return (<Heading textAlign='center' justifyContent='center'>Select a portfolio</Heading>);
    }

    const onLocalBuyAlocation = async () => {
        const newSellOrder: InvestmentOrderDTO = {
            id: IdGenerator.random(),
            allocationId: allocationId,
            portfolioId: selectedPortfolio.id,
            shares: sharesToBuy,
            status: 'pending',
            type: 'buy',
        };

        await onAsyncBuyAlocation(newSellOrder);
        onCloseModal();
    };

    const onCloseModal = () => {
        setSharesToBuy(0);
        setAllocationId(IdGenerator.random());
        onClose();
    };

    return (
        <section>
            <Heading textAlign='center' justifyContent='center'>
                <Flex direction='column' alignItems='center'>
                    <span>{`Portfolio: ${selectedPortfolio.id}`}</span>
                    <Button
                        colorScheme='green'
                        variant='solid'
                        maxWidth='-webkit-min-content'
                        onClick={onOpen}
                    >
                        Buy new allocation
                    </Button>
                </Flex>
            </Heading>

            <Modal onClose={onCloseModal} isOpen={isOpen} isCentered motionPreset='slideInBottom'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Buy a new allocation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isRequired isInvalid={!isAllocationIdValid}>
                            <FormLabel htmlFor='allocation'>Allocation ID</FormLabel>
                            <Input
                                id='allocation'
                                placeholder={allocationId}
                                value={allocationId}
                                onChange={event => setAllocationId(event.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='amount'>Amount of shares</FormLabel>
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
                            isDisabled={!isSharesValid || !isAllocationIdValid}
                        >
                            Buy
                        </Button>
                        <Button onClick={onCloseModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    );
}
