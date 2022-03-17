import { useEffect, useReducer, useRef } from 'react'
import { useWeb3React } from 'web3-react-core';
interface State<T> {
  data?: T
  error?: Error,
  loading?: boolean
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error }


const BASE_URL = process.env.REACT_APP_API_URL;

function useFetch<T = unknown>(url?: string, useCustomUrl: boolean = false, dependencies: any[] = [], options?: RequestInit, onSuccess?: () => void, onError?: () => void): State<T> {
  const cache = useRef<Cache<T>>({})
  const { account } = useWeb3React();

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false)

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    loading: false
  }

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState, loading: true }
      case 'fetched':
        return { ...initialState, data: action.payload, loading: false }
      case 'error':
        return { ...initialState, error: action.payload, loading: false }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return

    const fetchData = async () => {
      dispatch({ type: 'loading' });

      try {
        const auth = localStorage.getItem("charity") ? JSON.parse(localStorage.getItem("charity") || ""): {};
        const headers = {
          "Content-Type": "application/json",
          Accept: "application/json"
        } as any;

        console.log(auth, account, useCustomUrl);

        if (!useCustomUrl && account && auth && auth.auth[account]) {
          headers.authorization = `Bearer ${auth.auth[account].token}`;
        }

        const response = await fetch(useCustomUrl ? url: `${BASE_URL}${url}`, {
          headers,
          ...options
        })
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const data = (await response.json()) as T

        dispatch({ type: 'fetched', payload: useCustomUrl ? data: (data as any) })
        onSuccess && onSuccess();
      } catch (error) {
        if (cancelRequest.current) return

        dispatch({ type: 'error', payload: error as Error })
        onError && onError();
      }
    }

    dependencies.every(dependency => dependency !== undefined) && account && void fetchData()

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, account, ...dependencies])

  return state;
}

export default useFetch