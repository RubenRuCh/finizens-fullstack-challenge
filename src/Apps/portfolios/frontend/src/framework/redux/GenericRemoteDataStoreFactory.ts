/* eslint-disable @typescript-eslint/no-explicit-any */
import { Nullable } from '../../../../../../Contexts/Shared/Domain/Nullable';
import { useSelector } from 'react-redux';
import { REQ_STATUS } from '../RequestStatus';

export type GenericStoreType<T> = {
    data: Nullable<T>,
    status: REQ_STATUS,
    error: string,
};

type GenericPrebuildStore<T, GlobalStateType> = {
    reducer(state: any, action: any): GenericStoreType<T>;
    buildStore(
        store: {
            dispatch: DispatchType<T>,
            getState(): any;
        },
        getLocalStateFn: (globalState: GlobalStateType) => GenericStoreType<T>): GenericValueStore<T, GlobalStateType>;
};

type GenericValueStore<T, GlobalStateType> = {
    setResolved(data: Nullable<T>): void;
    setError(error: string): void;
    setPending(): void;
    setUninitialized(): void;
    get(): GenericStoreType<T>;
    useDataHook(): [GenericStoreType<T>, (value: Nullable<T>) => void];
    getLocalStateFn(globalState: GlobalStateType): GenericStoreType<T>;
};

type DispatchType<T> = ({ type, data, error }: ActionType<T>) => void;

type ActionType<T> = {
    type: string;
    data?: Nullable<T>;
    error?: string;
};

export function GenericRemoteDataStoreFactory<T, GlobalStateType>(ID: string): GenericPrebuildStore<T, GlobalStateType> {
    const ACTIONS = {
        SET_UNINITIALIZED: ID + '_SET_UNINITIALIZED',
        SET_PENDING: ID + '_SET_PENDING',
        SET_RESOLVED: ID + '_SET_RESOLVED',
        SET_ERROR: ID + '_SET_ERROR',
    };

    const initialState: GenericStoreType<T> = {
        data: null,
        status: REQ_STATUS.UNINITIALIZED,
        error: '',
    };

    function reducer(
        state = initialState,
        action: ActionType<T> = {
            type: '',
            data: null,
            error: '',
        },
    ): GenericStoreType<T> {
        switch (action.type) {
            case ACTIONS.SET_UNINITIALIZED:
                return {
                    ...state,
                    data: null,
                    status: REQ_STATUS.UNINITIALIZED,
                };

            case ACTIONS.SET_PENDING:
                return {
                    ...state,
                    status: REQ_STATUS.PENDING,
                };

            case ACTIONS.SET_RESOLVED:
                return {
                    ...state,
                    data: action.data ?? null,
                    status: REQ_STATUS.RESOLVED,
                };

            case ACTIONS.SET_ERROR:
                return {
                    ...state,
                    error: action.error ?? '',
                    status: REQ_STATUS.ERROR,
                };

            default:
                return state;
        }
    }

    function buildStore(
        store: {
            dispatch: DispatchType<T>,
            getState(): any;
        },
        getLocalStateFn: (globalState: GlobalStateType) => GenericStoreType<T>,
    ): GenericValueStore<T, GlobalStateType> {
        function dataSelector(state: any): GenericStoreType<T> {
            return getLocalStateFn(state);
        }

        function get(): GenericStoreType<T> {
            return dataSelector(store.getState());
        }

        function setResolved(data: Nullable<T>): void {
            store.dispatch({
                type: ACTIONS.SET_RESOLVED,
                data,
            });
        }

        function setUninitialized(): void {
            store.dispatch({
                type: ACTIONS.SET_UNINITIALIZED,
            });
        }

        function setPending(): void {
            store.dispatch({
                type: ACTIONS.SET_PENDING,
            });
        }

        function setError(error: string): void {
            store.dispatch({
                type: ACTIONS.SET_ERROR,
                error,
            });
        }

        function useDataHook(): [data: GenericStoreType<T>, setData: (data: Nullable<T>) => void] {
            const data = useSelector(dataSelector);

            return [
                data,
                setResolved,
            ];
        }

        return {
            get,
            setUninitialized,
            setPending,
            setError,
            setResolved,
            useDataHook,
            getLocalStateFn,
        };
    }

    return {
        reducer,
        buildStore,
    };
}
