import { ApiFetcher, ApiFetcherOptions } from "./api";
import { SWRResponse } from "swr";

export interface ApiHooks {
  cart: {
    useAddItem: MutationHook;
    useCart: SWRHook;
    useRemoveItem: MutationHook;
    useUpdateItem: MutationHook;
  };
}

export type MutationHookContext<Input, Output> = {
  fetch: (input: Input) => Promise<Output>;
};

export type HookFetcherContext<Input, Output> = {
  input?: Input;
  fetch: ApiFetcher<Output>;
  options: ApiFetcherOptions;
};

export type HookFetcherOptions = {
  query: string;
};

{
  /*
   * Die Fetch Funktion aus dem Handler ist eine Async Function
   * Sie erhält als context eine fetch-Funktion, den Input und Optionen (wie Variablen und Queries)
   * Zurück gibt die aufbearbeitete Daten
   */
}
export type HookFetcherFn<Input, Output, Data> = (
  context: HookFetcherContext<Input, Output>
) => Promise<Data>;

export type HookDescriptor = {
  fetcherInput: any;
  fetcherOutput: any;
  data: any;
};
{
  /*
   * Der Typ MutationsHook bekommt einen Typen übergeben, indem fetcherOptions, der Input Typ und der Output Typ definiert sind
   * H ist vom Aufbau her wie HookDescriptor (H extends HookDescriptor) und hat als default Wert any.
   * useHook bekommt eine fetch Funktion übergeben, die als Input Input aus H bekommt und Daten als Promise zurückgibt, die auch im Type H an MutationsHook-Type übergeben werden
   * Die Response vom useHook ist ein Promiose
   */
}
export type MutationHook<H extends HookDescriptor = any> = {
  fetcherOptions: HookFetcherOptions;
  fetcher: HookFetcherFn<H["fetcherInput"], H["fetcherOutput"], H["data"]>;
  useHook(
    context: MutationHookContext<H["fetcherInput"], H["data"]>
  ): (input: H["fetcherInput"]) => Promise<H["data"]>;
};

export type SWRHookContext<Input, Output> = {
  useData: (input: Input) => Promise<Output>;
};

export type UseDataContext = {
  swrOptions: any;
};

export type UseData<Data> = (context: UseDataContext) => Data;

{
  /*
   * SWRHookResponse gibt die SWRResponse von useSWR zurück
   * und zusätzlich den Boolschen Wert isEmpty
   */
}
export type SWRHookResponse<Data> = SWRResponse<Data, any> & {
  isEmpty: boolean;
};
{
  /*
   * SWRHook ist ein Obj mit typen fetcherOptions, fethcer und useHook.
   * useHook erhält useData als Funktion
   * useData ist eine Funktion, die context als Argument erhält
   * Context sind die swrOptions vom Typ any
   * useData gibt als Return Type SWRResponse vom Type H["Data"] (hier Cart)
   * in useHook wird useData ausgeführt und somit gibt auch useHook als Return Type SWRResponse vom Type H["Data"] (hier Cart)
   */
}
export type SWRHook<H extends HookDescriptor = any> = {
  fetcherOptions: HookFetcherOptions;
  fetcher: HookFetcherFn<H["fetcherInput"], H["fetcherOutput"], H["data"]>;
  useHook(context: {
    useData: UseData<SWRResponse<H["data"], any>>;
  }): SWRHookResponse<H["data"]>;
};

export type Hook = MutationHook | SWRHook;
