import { MongoClient } from 'mongodb';
import { expect } from 'chai';
import { async } from 'regenerator-runtime';
import { getUserByUsername } from './db';

describe('getUserByUsername', () => {
    it('gets the correct user from the database given a username', async () => {
        const client = await MongoClient.connect(
            'mongodb://localhost:27017/TEST_DB', {
                useNewUrlParser: true,
                useUnifiedTechnology: true
            }
        );

        const db = client.db('TEST_DB');

        client.close();
    });
});
