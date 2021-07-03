import Boom from '@hapi/boom';
import {db} from '../database';

export const addViewToListingRoute = {
    method: 'POST',
    path: '/api/listings/{id}/add-view',
    handler: async (req, h) => {
        const id = req.params.id;
        await db.query(
            'UPDATE listings SET views=views+1 WHERE id=?', [id]
        )
        const { results } = await db.query(
            'SELECT * FROM listings WHERE id=?',[id]
        )
        const updatedItem = results[0];
        // if(!item) throw Boom.notFound(`Item with id: ${id} does not exist`);
        // return item;
        if(!updatedItem) throw Boom.notFound(`Item with id: ${id} does not exist in the database.`);
        return updatedItem;

    }
}