import express from 'express';
import { PostUserRoute, GetUserRoute } from './UserActions';

const router = express.Router();

/*
  POST: api/user
  Adds or updates user to MongoDB
*/
router.post('/user', (req, res) => PostUserRoute(req, res));

/*
  GET: api/user/{:id}
  Gets user from database
*/
router.get('/user/:id', (req, res) => GetUserRoute(req, res));
