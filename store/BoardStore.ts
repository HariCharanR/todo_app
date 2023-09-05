import {create} from "zustand"
import { getTodosGroupedByColumn } from "@/utils/getTodosGroupedBuColumn";
import { dbs, id, storage } from "@/appwrite";
import uploadImage from "@/utils/uploadImage";


interface BoardState {
    board : Board ;
    getBoard : () => void ;
    setBoardState : (board : Board) => void;
    updateTodoInDb: (todo:Todo , columnId : TypedColumn) => void ; 
    searchString : string;
    setSs: (searchString : string) => void;
    deleteTask: (taskidx : number , todoId :Todo , id:TypedColumn ) => void ;
    newTaskInput : string;
    setNewTaskInput : (input : string) => void;
    newTaskType: TypedColumn;
    setNewTaskType : (tasktype : TypedColumn)=>void;
    image : File |null;
    setImage : (image:File | null) => void;
    addTask : (todo : string , columnId : TypedColumn , image:File|null ) => void;


}

export const useBoardStore  = create<BoardState>((set,get) => ({
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
    },
    searchString : "",
    setSs : (searchString) => set({ searchString }),
    deleteTask : async (taskidx : number , todo : Todo , id  : TypedColumn) => {
            const newCols = new Map(get().board.columns);
            newCols.get(id)?.todos.splice(taskidx,1);

            set({board:{columns:newCols}});

            if(todo.image){
                await storage.deleteFile(todo.image.bucketId,todo.image.fileId);
            }

            await dbs.deleteDocument(process.env.NEXT_PUBLIC_DB_ID! , process.env.NEXT_PUBLIC_COLLECTION_ID! , todo.$id) 

    } ,
    newTaskInput:"",
    setNewTaskInput : (input : string) => set({ newTaskInput : input}),
    newTaskType : "todo",
    setNewTaskType : (input : TypedColumn) => set({newTaskType : input}),
    image:null,
    setImage : (image:File |null) => set({image:image}),
    addTask: async (todo:string , columnId : TypedColumn , image?:File|null) => {
        let file : Image | undefined;

        if(image) {
            const fileUploaded  = await uploadImage(image);
            if(fileUploaded){
                file = {
                    bucketId : fileUploaded.bucketId,
                    fileId : fileUploaded.$id,
                }
            } 

        }

        const {$id} = await dbs.createDocument(
            process.env.NEXT_PUBLIC_DB_ID! , process.env.NEXT_PUBLIC_COLLECTION_ID!,
            id.unique(),
            {
                title:todo,
                status:columnId,
                ...(file && {image : JSON.stringify(file)}),
            }
        );

        set({newTaskInput : ""});

        set((state) => {
            const newCols = new Map(state.board.columns);
            const newTodo : Todo = {
                $id , 
                $createdAt: new Date().toString(),
                title:todo,
                status:columnId,
                ...(file && {image : file}),
            };

            const col = newCols.get(columnId);
            if(!col){
                newCols.set(columnId , {
                    id:columnId,
                    todos:[newTodo],
                });
            }else{
                newCols.get(columnId)?.todos.push(newTodo);
            }

            return {
                board :{
                    columns : newCols
                }
            }
        })
    }

}))