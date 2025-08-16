const init$ = (() => {
    const $ = (k, v) => {
        if (k in globalThis)
            delete globalThis[k];
        Object.defineProperty(globalThis, k, { value: v, configurable: true });
    };
    const deleteKey = (k) => {
        if (!k.startsWith('$'))
            k = `$${k}`;
        if (k in globalThis)
            delete globalThis[k];
    };
    const service = ((s) => Object.entries(s).forEach(([k, v]) => $(`$${k}`, v)));
    service.delete = (keys) => Array.isArray(keys) ? keys.forEach(deleteKey) : deleteKey(keys);
    return service;
})();
export default init$;
