import Boom from '@hapi/boom';
import {db} from '../database';

export const getUserListingsRoute = {
    method: 'GET',
    path: '/api/users/{userId}/listings',
    handler: async(req, h) => {
        const userId = '12345'; //req.params.userId;
        const { results } = await db.query(
            'SELECT * FROM listings WHERE user_id=?', [userId]
        )
        if(!results[0]) throw Boom.notFound('User not found');
        return results;
    }
}