import { Router } from "express";
import { create, deleteSingleNote, getAllNotes, getSingleNote, updateSingleNote } from "../controller/note";

const router = Router()

router.post('/create', create);

//for update
router.patch('/:noteID', updateSingleNote);

//for delete
router.delete('/:noteID', deleteSingleNote);

//to read whole database
router.get("/", getAllNotes);

//to read the specific document
router.get("/:id", getSingleNote);

export default router 