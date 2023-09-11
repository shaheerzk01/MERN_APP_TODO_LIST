import {FC, } from "react"
import NoteButton from "./NoteButton";

interface Props{
    title: string;
    description?: string;
    onEditClick?(): void
    onDeleteClick?(): void
    onViewClick?(): void
}

const NoteItem: FC<Props> = (props) => {
    return (
        <div className="space-y-4  bg-white p-5 shadow-lg rounded border border-gray-400 ">
            <p className="font-semibold text-lg text-gray-700">
            {props.title}
            </p>
            {props.description ? <p className="ml-2 mt-2 mb-2">{props.description}</p>:null}
            <div className="space-x-6">
                <NoteButton onClick={props.onViewClick} title={props.description? "Hide" :"View"} color={"blue"}></NoteButton>
                <NoteButton onClick={props.onEditClick} title="Edit" color={"gray"}></NoteButton>
                <NoteButton onClick={props.onDeleteClick} title="Delete" color={"red"}></NoteButton>
            </div>
        </div>
    )
    
}

export default NoteItem