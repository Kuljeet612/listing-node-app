import Boom from '@hapi/boom';
//import {fakeListings} from './fake-data';
import { db } from '../database';

export const getListingRoute = {
    method: 'GET',
    path: '/api/listings/{id}',
    handler: async (req,h) => {
        const id = req.params.id;
        //const item = fakeListings.find(listing => listing.id === id); //OC
        const { results } = await db.query(
            'SELECT * FROM listings WHERE id=?',
            [id]
        )
        const item = results[0];
        if(!item) throw Boom.notFound(`Item with id: ${id} does not exist`);
        return item;
       // return fakeListings.find(listing => listing.id === id);  //Older code
    }
}