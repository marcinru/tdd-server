import { expect } from 'chai';
import { async } from 'regenerator-runtime';
import { getUserByUsername } from './db';
import { getDatabaseData, setDatabaseData, resetDatabase } from './test-helpers';

describe('getUserByUsername', () => {
    const fakeData = [{
        id: '123',
        username: 'abc',
        email: 'abc@gmail.com'
    }, {
        id: '124',
        username: 'wrong',
        email: 'wrong@gmail.com'
    }];

    afterEach('reset the database', async () => {
        await resetDatabase();
    });

    it('gets the correct user from the database given a username', async () => {
        await setDatabaseData('users', fakeData);

        const actual = await getUserByUsername('abc');
        const finalDBState = await getDatabaseData('users');

        const expected = {
            id: '123',
            username: 'abc',
            email: 'abc@gmail.com'
        };

        expect(actual).excludingEvery('_id').to.deep.equal(expected);
        expect(finalDBState).excludingEvery('_id').to.deep.equal(fakeData);
    });

    it('returns null when the user is not found', async () => {
        await setDatabaseData('users', fakeData);

        const actual = await getUserByUsername('notExistingOne');

        expect(actual).to.be.null;
    });
});
