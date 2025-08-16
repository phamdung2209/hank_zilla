declare const store: {
    state: Record<string, any>;
    getState: () => Record<string, any>;
    subscribe: (callback: () => void) => () => boolean;
    setState: (newState: Record<string, any>, silent?: boolean) => void;
};
export declare const useAppState: <T>(key: string, defaultValue?: T, removeOnUnmount?: boolean, silent?: boolean) => T;
export declare const setAppState: (key: string, newValue: any, silent?: boolean) => void;
export declare const getAppState: (key?: string) => any;
export declare const deleteAppState: (key: string) => void;
export default store;
