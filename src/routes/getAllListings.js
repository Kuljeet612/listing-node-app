//import { fakeListings } from './fake-data';
import { db } from '../database';

export const getAllListingsRoute = {
    method: 'GET',
    path: '/api/listings',
    handler: async (req, h) => {
        //return fakeListings;   - Old code
        const { results } = await db.query(
            'SELECT * FROM listings'
        );
        return results;
    }
}