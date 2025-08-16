interface InitService {
    (s: Record<string, any>): void;
    delete: (k: string | string[]) => void;
}
declare const init$: InitService;
export default init$;
