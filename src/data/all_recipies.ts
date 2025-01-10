import { createMutable, createStore } from "solid-js/store";
import { Dish } from "../types/dish";
import { createMemo } from "solid-js";


function assert(condition: boolean, message: string) {
        if (!condition) {
            throw new Error(message);
        }
    }


function createResource<T extends object = {}>(fetcher: () => Promise<T>, default_data?: T) {
    assert(typeof fetcher === "function", "fetcher must be a function");
    const [data, setData] = createStore(default_data);
    const state = createMutable({
        loading: false,
        error: false,
        mutating: false
    })
    function doFetching() { 
        state.loading = true;
        fetcher().then((res: T) => { 
            setData(res)
            state.loading = false;
        }).catch(() => {
            state.error = true;
            state.loading = false;
        });
    }
    doFetching();
    return [data, {
        refetch: doFetching,
        mutate: setData,
        state    
    }]
}



    export const [recipeData, { refetch, state }]: any = createResource(async () => {
        const response = await fetch("http://127.0.0.1:8000/recipes");
        return response.json();
      }, [])