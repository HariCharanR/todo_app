'use client'
import { useBoardStore } from '@/store/BoardStore';
import React, { useEffect } from 'react'
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from './Column';
function Board() {
    const [board,getBoard,setBoard,updateBoard]  =  useBoardStore((state) => [state.board,state.getBoard , state.setBoardState,state.updateTodoInDb]);
    useEffect(() => {
            getBoard();
    },[getBoard])
    // console.log(board);

    const handleOnDragEnd = ( result: DropResult) => {
        const {destination ,source ,type} = result ;
        // console.log("Source:");
        // console.log(source);
        // console.log("Destination");
        // console.log(destination);
        //dragging outside the box 
        if(!destination) return;

        //dragging to another column 
        if(type==='column'){
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(source.index,1);
            entries.splice(destination.index,0,removed);
            const re_columns = new Map(entries);
            setBoard({
                ...board , columns:re_columns
            });
        }


        const cols = Array.from(board.columns);
        const start = cols[Number(source.droppableId)];
        const end = cols[Number(destination.droppableId)];

        const startCol:Column = {
            id:start[0],
            todos : start[1].todos,
        }
        
        const endCol:Column = {
            id:end[0],
            todos : end[1].todos,
        }

        if(!startCol || !endCol) return ;

        if(source.index === destination.index && startCol === endCol) return ;
        
        const newTodos = startCol.todos;
        const [todoMoved] = newTodos.splice(source.index,1);
        
        if(startCol.id === endCol.id){
            //Same column task drag
            newTodos.splice(destination.index,0,todoMoved);

            const newCol = {
                id:startCol.id,
                todos:newTodos
            }
            //constructing new columns container 
            const newCols = new Map(board.columns);
            // basically updating the specific columns with the change 
            newCols.set(startCol.id , newCol);

            setBoard({...board , columns: newCols});
        }else{
            //dragging to another column
            const endTodos = Array.from(endCol.todos);
            endTodos.splice(destination.index,0,todoMoved);
        
            const newCols = new Map(board.columns);
            const newCol = {
                id:startCol.id,
                todos:newTodos
            };
            newCols.set(startCol.id,newCol);
            newCols.set(endCol.id,{
                id:endCol.id,
                todos:endTodos,
            });
            updateBoard(todoMoved,endCol.id);
            setBoard({...board , columns:newCols});
        }
        // console.log("cols from the board State");
        // console.log(cols);
        // console.log("start index");
        // console.log(start);
        // console.log("end index");
        // console.log(end);
        // console.log(startCol);
        // console.log(endCol);
    };
    return (
        // <h1>Hello</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="column">
                {
                    provided => (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
                         {...provided.droppableProps}
                         ref={provided.innerRef}
                        >
                            {Array.from(board.columns.entries()).map(
                                ([id,column],index) => (

                                    <Column 
                                        key={id}
                                        id={id}
                                        todos={column.todos}
                                        index={index}
                                    />
                                )
                            )}
                        </div>
                    )
                }

            </Droppable>
        </DragDropContext>
    )
}

export default Board