import { ReactNode, createContext, useContext, useReducer } from "react";
import { AppContext, DocData, contentMapper } from "../interfaces";

export enum ACTION {
  SELECT_PDF,
  NEW_PDF_RESULT
}

export interface Event {
  action: ACTION;
  data: DocData | string;
}

export const reducer = (context: AppContext, event: Event): AppContext => {
  switch (event.action) {
    case ACTION.NEW_PDF_RESULT:
      const { rawData, pdf, fileName } = event.data as DocData;
      const newFileContents = contentMapper(rawData);
      return {
        selectedIndex: context.data.length,
        data: [
          ...context.data,
          {
            rawData,
            fileContents: newFileContents,
            pdf,
            fileName
          }
        ]
      };
    case ACTION.SELECT_PDF:
      const selectedFileName = event.data as string;
      const selectedIndex = context.data.findIndex(doc => doc.fileName === selectedFileName);
      return {
        ...context,
        selectedIndex
      };
    default:
      return context;
  }

}

interface Props {
  children?: ReactNode
}

const initData: AppContext = {
  selectedIndex: -1,
  data: []
};

const ContentContext = createContext<AppContext>(initData);
const ContentDispatchContext = createContext<any>(null);

export const AppContentProvider = ({ children }: Props) => {

  const [content, dispatch] = useReducer(reducer, initData);

  return (
    <ContentContext.Provider value={content}>
      <ContentDispatchContext.Provider value={dispatch}>
        {children}
      </ContentDispatchContext.Provider>
    </ContentContext.Provider>
  );
}

export const useAppContent = () => {
  return useContext(ContentContext);
}

export const useAppContentDispatch = () => {
  return useContext(ContentDispatchContext);
}