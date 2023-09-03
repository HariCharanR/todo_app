import {create} from "zustand"
import { getTodosGroupedByColumn } from "@/utils/getTodosGroupedBuColumn";
import { dbs } from "@/appwrite";


interface BoardState {
    board : Board ;
    getBoard : () => void ;
    setBoardState : (board : Board) => void;
    updateTodoInDb: (todo:Todo , columnId : TypedColumn) => void ; 
    searchString : string;
    setSs: (ss : string) => void;

}

export const useBoardStore  = create<BoardState>(set => ({
    board : {
        columns : new Map<TypedColumn , Column>()
    },
    getBoard : async () => {
            const board = await getTodosGroupedByColumn();
            set({ board });
    },
    setBoardState : (board) => {
        set({board});
    },
    updateTodoInDb : async(todo,columnId) => {
        await dbs.updateDocument(
            process.env.NEXT_PUBLIC_DB_ID!,
            process.env.NEXT_PUBLIC_COLLECTION_ID!,
            todo.$id,
            {
                title: todo.title,
                status:columnId
            }
        )
    }



}))