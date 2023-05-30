// import React, {useState} from "react";
// import {Analysis, M2ContextType} from "./m2";
//
// export const M2Context = React.createContext<M2ContextType>({
//     searchQuery: "",
//     currentPage: 1,
//     totalPages: 1,
//     totalRecords: 1,
//     analyzes: [],
//     opened: [],
//     loading: true,
//     setSearchQuery: value => {},
//     setCurrentPage: value => {},
//     setTotalPages: value => {},
//     setTotalRecords: value => {},
//     setAnalyzes: value => {},
//     setLoading: value => {},
//     toggleAnalysisOpen: (value: string) => {},
// });
//
// export default function M2ContextProvider(props: any) {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(0);
//     const [totalRecords, setTotalRecords] = useState(0);
//     const [analyzes, setAnalyzes] = useState<Analysis[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [opened, setOpened] = useState<string[]>([]);
//
//     function toggleAnalysisOpen(id: string) {
//         const index = opened.findIndex(value => value === id);
//         if (index === -1) {
//             setOpened([...opened, id]);
//         } else {
//             opened.splice(index, 1);
//             setOpened([...opened]);
//         }
//     }
//
//     const context: M2ContextType = {
//         searchQuery,
//         currentPage,
//         totalPages,
//         totalRecords,
//         analyzes,
//         loading,
//         opened,
//         setSearchQuery,
//         setCurrentPage,
//         setTotalPages,
//         setTotalRecords,
//         setAnalyzes,
//         setLoading,
//         toggleAnalysisOpen
//     }
//
//     return (
//         <M2Context.Provider value={{...context}}>
//             {props.children}
//         </M2Context.Provider>
//     )
// }