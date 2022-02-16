/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { REQ_STATUS } from '../RequestStatus';

export interface CommandHookReturn {
    action(...props: any[]): Promise<void>;
    status: REQ_STATUS;
    error: string;
    isPending: boolean;
}

export function useCommand(domainAction: (...props: any[]) => Promise<void>): CommandHookReturn {
    const [status, setStatus] = useState<REQ_STATUS>(REQ_STATUS.UNINITIALIZED);
    const [error, setError] = useState<string>('');

    const isPending = status === REQ_STATUS.PENDING;

    const action = useCallback(async (...props: any[]): Promise<void> => {
        try {
            setStatus(REQ_STATUS.PENDING);
            await domainAction(...props);
            setStatus(REQ_STATUS.RESOLVED);
        } catch (e) {
            setStatus(REQ_STATUS.ERROR);
            setError('Error happened: ' + e);
        }
    }, [domainAction]);

    return {
        action,
        status,
        error,
        isPending,
    };
}
