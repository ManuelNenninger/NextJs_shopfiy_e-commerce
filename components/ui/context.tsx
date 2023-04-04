import {
  createContext,
  FC,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
} from "react";

export interface StateModifiers {
  openSidebar: () => void;
  closeSidebar: () => void;
}

export interface StateValues {
  isSidebarOpen: boolean;
}

const stateModifiers = {
  openSidebar: () => {},
  closeSidebar: () => {},
};

const initialState = { isSidebarOpen: false };

type Action = { type: "OPEN_SIDEBAR" | "CLOSE_SIDEBAR" };

function uiReducer(state: StateValues, action: Action) {
  {
    /*
     *Jenachdem, welche action in dispatch übergeben wird, wird der State in dem Stateobject geändert.
     * useReducer wird für sehr große State-Objecte verwändet.
     * Hier ist es einfach, jeweils eine action weiter zu geben und entsprechend der action wird über switch der zu ändernde State angepasst.
     * Dabei wird das State-Object über den spread-Operator zurück gegeben und nur der entsprechende State verändert.
     * Der state ist hier vom Type "StateValues". Achte also darauf, den Typ entsprechend anzupassen
     * Auch der initiale Value sollte entsprechend angepasst sein.
     */
  }
  switch (action.type) {
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        isSidebarOpen: true,
      };
    }
    case "CLOSE_SIDEBAR": {
      return {
        ...state,
        isSidebarOpen: false,
      };
    }
  }
}

type State = StateValues & StateModifiers;

const UIContext = createContext<State>({
  ...stateModifiers,
  ...initialState,
});

export const UIProvider: FC<{ children: ReactNode[] | ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openSidebar = () => dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });

  {
    /*
  * Alle Komponenten, die den Context konsumieren (useUI) werden re-rendered, wenn sich der State ändert
  * Das kann für probleme sorgen. 
  * Das Object, dass in value ist, sollte deshalb mit useMemo returned werden.
  * Das verhindert, dass alle Komponenten ständig re-rendered werden.

*/
  }
  const value = useMemo(() => {
    return {
      ...state,
      openSidebar,
      closeSidebar,
    };
  }, [state.isSidebarOpen]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  return context;
};
