const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async() => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async() => {
        await connection.destroy()
    })

    it('should be able to create a new ONG', async() => {
        const response = await request(app)
            .post('/ongs')
            .send({
                "name": "APAD2",
                "email": "constato@apad.com",
                "whatsapp": "64992547020",
                "city": "Bom Jesus",
                "uf": "GO"
            })

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8)
    })
})