import { db } from '../database';
import { v4 as uuid } from 'uuid';

export const createNewListingRoute = {
    method: 'POST',
    path: '/api/listings',
    handler: async (req, h) => {
const id = uuid();
const { name = '', description = '', price = 0 } = req.payload;
const userId = '12345';
const views = 0;
    await db.query(
        `INSERT INTO listings (id, name, description, price, user_id, views)
        VALUES (?,?,?,?,?,?)`, 
        [id, name, description, price, userId, views]
    );
    //Returning the data added from request itself insteda of calling the DB again with a GET query
    return { id, name, description, price, user_id: userId, views };
    }
}