import { StateValue, EventObject, Interpreter, State } from 'xstate';
import React, { useEffect, useState, ReactElement } from 'react';
import { StateListener } from 'xstate/lib/interpreter';


interface StateDefinition<TContext, Events extends EventObject> {
  [K: string]: React.FunctionComponent<{state: State<TContext, Events>}> | StateDefinition<TContext, Events>
}

type AsStateDefinition<T, TContext, TEvents extends EventObject> = T extends {type: "parallel", states: infer Sub} 
  ? ({
    [K in Exclude<keyof Sub, "History">]: AsStateDefinition<Sub[K], TContext, TEvents>
  } & {":merge": React.FunctionComponent<{state: State<TContext, TEvents>, input: {[K in keyof Sub]: React.FunctionComponent<{state: State<TContext, TEvents>}>}}>})
  : T extends {states: infer Sub}
    ? React.FunctionComponent<{state: State<TContext, TEvents>}> | {
      [K in Exclude<keyof Sub, "History">]: AsStateDefinition<Sub[K], TContext, TEvents>
    } | ({"": React.FunctionComponent<{state: State<TContext, TEvents>}>} & {
      [K in Exclude<keyof Sub, "History">]?: AsStateDefinition<Sub[K], TContext, TEvents>
    })
    : React.FunctionComponent<{state: State<TContext, TEvents>}>

export function StateMachineComponent<TContext, Schema, Events extends EventObject>(interpreter: Interpreter<TContext, Schema, Events>, screens: AsStateDefinition<Schema, TContext, Events>): ReactElement {


  return React.createElement(function ThisIsAFunctionComponentNoteTheCapitalFirstLetterYo() {
    const [curState, setState] = useState(interpreter.state);
    useEffect(() => {
      const cb: StateListener<TContext, Events> = state => {
        return setState(state);
      }
      interpreter.onTransition(cb);
      return () => {
        interpreter.off(cb)
      }
    }, [interpreter, screens])
    const view = pickReactComponents(curState.value, screens as any)
    if (view !== undefined) {
      const props: any = {state: curState}
      return React.createElement(view, props)
    } else {
      return <div>No GUI defined for {JSON.stringify(curState.value)}</div>
    }
  })
}

function isFunctionComponent<TContext, Events extends EventObject>(val: StateDefinition<TContext, Events> | React.FunctionComponent<{state: State<TContext, Events>}>): val is React.FunctionComponent<{state: State<TContext, Events>}> {
  return typeof val === "function"
}

function getFirstReactComponent<TContext, Events extends EventObject>(val: StateDefinition<TContext, Events>): React.FunctionComponent<{state: State<TContext, Events>}> | undefined {
  for (const key in val) {
    const item = val[key]
    if (isFunctionComponent(item)) {
      return item
    } else {
      return getFirstReactComponent(item)
    }
  }
  return undefined
}

function pickReactComponents<TContext, Events extends EventObject>(state: StateValue, config: StateDefinition<TContext, Events>): React.FunctionComponent<{state: State<TContext, Events>}> | undefined {
  if (typeof state === "string") {
    const configVal = config[state]
    if (configVal === undefined) {
      return (config[state] === undefined ? config[""] : config[state]) as React.FunctionComponent | undefined
    }
    else if (isFunctionComponent(configVal)) {
      return configVal
    } else {
      console.error("Non-terminal state config for an atomic state!")
      return getFirstReactComponent(configVal)
    }
  } else {
    const result: {[key: string]: React.FunctionComponent<{state: State<TContext, Events>}>} = {}
    let singleResult;
    let count = 0
    for (const key in state) {
      const configVal = config[key]=== undefined ? config[""] : config[key]
      if (isFunctionComponent(configVal)) {
        count++
        result[key] = configVal
        singleResult = configVal
      } else if (typeof configVal === "object") {
        const subResult = pickReactComponents(state[key], configVal)
        if (subResult !== undefined) {
          count++
          result[key] = subResult
          singleResult = subResult
        }
      }
    }
    if (count === 1) {
      return singleResult
    } else {
      const merger = config[":merge"] as any
      return (props: any) => merger({state: props.state, input: result})
    }
  }
}
