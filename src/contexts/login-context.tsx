import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

export interface LoginContext {
  isLoggedIn: boolean;
  token: string;
}

export enum LOGIN_ACTION {
  LOGIN,
  LOGOUT,
}

export interface Event {
  action: LOGIN_ACTION;
  data: any;
}

export const reducer = (context: LoginContext, event: Event): LoginContext => {
  switch (event.action) {
    case LOGIN_ACTION.LOGIN:
      return {
        ...context,
        token: event.data,
        isLoggedIn: true,
      };

    case LOGIN_ACTION.LOGOUT:
      return {
        ...context,
        token: "",
        isLoggedIn: false,
      };
    default:
      return context;
  }
};

interface Props {
  children?: ReactNode;
}

const initData: LoginContext = {
  isLoggedIn: false,
  token: "",
};

const ContentContext = createContext<LoginContext>(initData);
const ContentDispatchContext = createContext<any>(null);

export const LoginContentProvider = ({ children }: Props) => {
  const [content, dispatch] = useReducer(reducer, initData);

  useEffect(() => {
    const storedContent = sessionStorage.getItem("loginContent");
    if (storedContent) {
      const storedToken = JSON.parse(storedContent).token;

      if (storedToken !== "") {
        dispatch({
          action: LOGIN_ACTION.LOGIN,
          data: storedToken,
        });
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("loginContent", JSON.stringify(content));
  }, [content]);

  return (
    <ContentContext.Provider value={content}>
      <ContentDispatchContext.Provider value={dispatch}>
        {children}
      </ContentDispatchContext.Provider>
    </ContentContext.Provider>
  );
};

export const useLoginContent = () => {
  return useContext(ContentContext);
};

export const useLoginContentDispatch = () => {
  return useContext(ContentDispatchContext);
};
