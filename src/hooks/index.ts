import {useCallback, useReducer, useState, useEffect} from 'react';
import { State } from '../interfaces/states'

import { CLEAR_ALL, CLEAR_ERROR, FAILED, REQUEST, SUCCESS } from '../constants/actions';
import {Request} from "../interfaces/api";
import {AxiosResponse} from "axios";

const initialFetchState = {
    isFetching: false,
    isFailed: false,
    isSuccess: false,
    data: [],
    error: null
};

const fetchReducer = (state: State, action: { type: string, payload?: any }) => {
    const { type, payload } = action;
    switch (type) {
        case REQUEST:
            return {
                ...state,
                isFetching: true,
                isFailed: false,
                isSuccess: false
            };
        case SUCCESS:
            return {
                ...state,
                isFetching: false,
                isSuccess: true,
                data: payload.data
            };
        case FAILED:
            return {
                ...state,
                isFetching: false,
                isFailed: true,
                error: payload.data
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        case CLEAR_ALL:
            return initialFetchState;
        default:
            throw new Error();
    }
};
export function useFetch (
    fetcher: (data?: any) => Promise<AxiosResponse>): [
    state: State,
    fetchData: (data?: Request) => void,
    restCallbacks: {
        clearError: () => void,
        clearAll: () => void
    }
]{
    const [ state, dispatch ] = useReducer(fetchReducer, initialFetchState);

    const fetchData = useCallback(async (data?: Request) => {
        try {
            dispatch({ type: REQUEST });
            const payload = await fetcher(data);
            dispatch({ type: SUCCESS, payload });
        } catch (error) {
            dispatch({ type: FAILED, payload: error });
        }
    }, [ fetcher ])
    function clearError() {
        dispatch({ type: CLEAR_ERROR, payload: [] });
    }
    function clearAll() {
        dispatch({ type: CLEAR_ALL, payload: [] });
    }

    return [
        state,
        fetchData,
        { clearError, clearAll }
    ];
}

export const useImageLoader = (path: string) => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const image = new Image();
        image.onload = () => {
            setIsLoaded(true)
        };
        image.src = path
    }, [path]);
    return [isLoaded]
};
