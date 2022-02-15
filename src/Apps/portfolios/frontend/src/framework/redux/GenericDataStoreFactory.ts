/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';

export type GenericValueType<T> = T | null;

type GenericPrebuildStore<T, GlobalStateType> = {
    reducer(state: any, action: any): GenericValueType<T>;
    buildStore(
        store: {
            dispatch({ type, data }: { type: string; data: GenericValueType<T> }): void;
            getState(): any;
        },
        getLocalStateFn: (globalState: GlobalStateType) => GenericValueType<T>): GenericValueStore<T, GlobalStateType>;
};

type GenericValueStore<T, GlobalStateType> = {
    set(value: GenericValueType<T>): void;
    get(): GenericValueType<T>;
    useDataHook(): [GenericValueType<T>, (value: GenericValueType<T>) => void];
    getLocalStateFn(globalState: GlobalStateType): GenericValueType<T>;
};

export function GenericDataStoreFactory<T, GlobalStateType>(ID: string): GenericPrebuildStore<T, GlobalStateType> {
    const ACTIONS = {
        SET: ID + '_SET',
    };

    const initialState: GenericValueType<T> = null;

    function reducer(
        state = initialState,
        action: { type: string, data: GenericValueType<T> } = {
            type: '',
            data: null,
        },
    ): GenericValueType<T> {
        switch (action.type) {
            case ACTIONS.SET:
                return action.data;

            default:
                return state;
        }
    }

    function buildStore(
        store: {
            dispatch({ type, data }: { type: string; data: GenericValueType<T> }): void;
            getState(): any;
        },
        getLocalStateFn: (globalState: GlobalStateType) => GenericValueType<T>,
    ): GenericValueStore<T, GlobalStateType> {
        function dataSelector(state: any): GenericValueType<T> {
            return getLocalStateFn(state);
        }

        function get(): GenericValueType<T> {
            return dataSelector(store.getState());
        }

        function set(data: GenericValueType<T>): void {
            store.dispatch({
                type: ACTIONS.SET,
                data,
            });
        }

        function useDataHook(): [data: GenericValueType<T>, setData: (data: GenericValueType<T>) => void] {
            const data = useSelector(dataSelector);

            return [
                data,
                set,
            ];
        }

        return {
            get,
            set,
            useDataHook,
            getLocalStateFn,
        };
    }

    return {
        reducer,
        buildStore,
    };
}
