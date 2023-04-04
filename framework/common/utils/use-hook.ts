import { useApiProvider } from "@common";
import { ApiHooks, Hook, UseDataContext } from "@common/types/hooks";
import { MutationHook } from "@common/types/hooks";
import useSWR from "swr";
import { ApiFetcher } from "@common/types/api";
import { HookDescriptor } from "@common/types/hooks";
{
  /*
* Das ist das selbe wie: 

const useHook = (fn) => {
  const string = "test"
  return fn(string) //hier wird fn gecalled! In fn wird string übergeben
}
console.log(useHook((a)=> a)); // "test"
* useHook wird eine Arrow-Funktion übergeben.
* Diese nimmt den Ihr übergebenen Wert und returned Ihn

*/
}
export const useHook = (fn: (apiHooks: ApiHooks) => any) => {
  const { hooks } = useApiProvider();
  return fn(hooks);
};

export const useMutationHook = <T extends HookDescriptor>(
  hook: MutationHook<T>
) => {
  // debugger;
  const { fetcher } = useApiProvider();

  return hook.useHook({
    fetch: (input: any) => {
      return hook.fetcher({
        input,
        options: hook.fetcherOptions,
        fetch: fetcher,
      });
    },
  });
};

//Folge 183

const useData = (hook: any, fetcher: ApiFetcher, ctx: any) => {
  const hookFetcher = async (query: string) => {
    console.log("ich mach einen Fetch!!!");

    try {
      return await hook.fetcher({
        fetch: fetcher,
        options: { query },
        input: {},
      });
    } catch (error) {
      throw error;
    }
  };

  const response = useSWR(
    hook.fetcherOptions.query,
    hookFetcher,
    ctx.swrOptions
  );
  //Folge 184
  return response;
};

// cache data first if possible
//?!?!?!?!?!?!
//Wieso nicht einfach die handler-Struktur wie bei use-add-item mit useMutationHook?!?

export const useSWRHook = (hook: any) => {
  const { fetcher } = useApiProvider();

  return hook.useHook({
    // Das selbe wie: useData() {...}
    //ctx sind die SWR options wie revalidate etc.
    useData: (ctx: any) => {
      const data = useData(hook, fetcher, ctx);
      return data;
    },
  });
};
