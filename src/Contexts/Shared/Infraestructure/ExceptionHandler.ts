import { InvestmentAllocationNotFoundException } from './../../Investment/Portfolio/Domain/Exception/Allocation/InvestmentAllocationNotFoundException';
import { InvestmentPortfolioNotFoundException } from './../../Investment/Portfolio/Domain/Exception/Portfolio/InvestmentPortfolioNotFoundException';
import { InvestmentOrderNotFoundException } from './../../Investment/Order/Domain/Exception/InvestmentOrderNotFoundException';
import { Response } from 'express';
import httpStatus from 'http-status';
import { BaseException } from '../Domain/Exception/BaseException';
import { MissingMandatoryParameterException } from '../Domain/Exception/MissingMandatoryParameterException';
import { InvestmentOrderCannotSellMoreSharesThanAvailableInAllocationException } from '../../Investment/Order/Domain/Exception/InvestmentOrderCannotSellMoreSharesThanAvailableInAllocationException';

export const ExceptionHandler = (error: Error, res: Response): void => {
    if (error instanceof BaseException) {
        const httpCode = domainCodeToHttpCode(error);

        res.status(httpCode).json({
            error: error.message,
            errorType: error.constructor.name,
        });
    } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error: 'Unknown error',
            name: error.name,
            message: error.message,
            stack: error.stack,
        });
    }
};

const domainCodeToHttpCode = (exception: BaseException) => {
    switch (exception.constructor) {
        case MissingMandatoryParameterException:
            return httpStatus.BAD_REQUEST;

        case InvestmentOrderNotFoundException:
        case InvestmentPortfolioNotFoundException:
        case InvestmentAllocationNotFoundException:
            return httpStatus.NOT_FOUND;

        case InvestmentOrderCannotSellMoreSharesThanAvailableInAllocationException:
            return httpStatus.INTERNAL_SERVER_ERROR;

        default:
            return 500;
    }
};
