import {assign, Machine} from "xstate";

export const BrowseMachine = Machine<{
    search_string: string,
    collection_item_id: string,
    dataset_id: string
}, {
    states: {
        home: {},
        metadata: {},
        fourOhFour: {},
        detail: {},
        search: {},
    }
}>(
    {
        id: 'fetch',
        initial: 'home',
        context: {
            search_string: "none",
            collection_item_id: "",
            dataset_id: ""
        },
        on: {
            detail: {
                actions: assign({
                    collection_item_id: (context, event) => event.collection_item_id
                }),
                target: "detail"
            },
            search: {
                actions: assign({
                    search_string: (context, event) => event.search_string
                }),
                target: "search"
            },
            metadata: {
                actions: assign({
                    dataset_id: (context, event) => event.dataset_id
                }),
              target: "metadata"
            },
            "*": "fourOhFour"
        },
        states: {
            home: {
              on: {
                  search: "search",
                  metadata: "metadata"
              }
            },
            metadata: {
                on: {
                    home: "home",
                    search: "search"
                }
            },
            fourOhFour: {},
            detail: {
                on: {
                    home: "home",
                    search: "search",
                    detail: "detail"
                }
            },
            search: {
                on: {
                    home: "home",
                    detail: "detail"
                }
            }
        }
    }
);