import { Router } from "express";

const router = Router ();
import Thought from "../../controllers/thoughtController
import User from "../../controllers/userController";

// GET for /api/thoughts
router.route('/').get(getThoughts)

// POST for /api/thoughts
router.route('/').post(createThought);

// PUT for /api/thoughts
router.route('/').post(updateThought);

// DELETE for /api/thoughts
router.route('/').post(deleteThought);

// POST for /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId').post(addReaction);

// DELETE for /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId').delete(removeReaction);


export { router as thoughtRouter };