const request = require('supertest');
const app = require('../src/app');
const {db} = require("../src/database");

describe('Awards Interval API - Additional Tests', () => {
    // Verifica a estrutura dos dados de retorno da API
    it('should have the correct structure for min and max intervals', async () => {
        const response = await request(app).get('/api/awards-interval');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('min');
        expect(response.body).toHaveProperty('max');

        const { min, max } = response.body;

        min.forEach(item => {
            expect(item).toHaveProperty('producers');
            expect(item.producers).toBe("Bo Derek");
            expect(item).toHaveProperty('interval');
            expect(item.interval).toBe(6);
            expect(item).toHaveProperty('previousWin');
            expect(item.previousWin).toBe(1984);
            expect(item).toHaveProperty('followingWin');
            expect(item.followingWin).toBe(1990);
        });

        max.forEach(item => {
            expect(item).toHaveProperty('producers');
            expect(item.producers).toBe("Matthew Vaughn");
            expect(item).toHaveProperty('interval');
            expect(item.interval).toBe(13);
            expect(item).toHaveProperty('previousWin');
            expect(item.previousWin).toBe(2002);
            expect(item).toHaveProperty('followingWin');
            expect(item.followingWin).toBe(2015);
        });
    });

    // Testa se o intervalo mínimo é realmente o menor
    it('should return the correct minimum interval', async () => {
        const response = await request(app).get('/api/awards-interval');
        const { min } = response.body;

        const intervals = min.map(item => item.interval);
        const minInterval = Math.min(...intervals);

        min.forEach(item => {
            expect(item.interval).toBe(minInterval);
        });
    });

    // Testa se o intervalo máximo é realmente o maior
    it('should return the correct maximum interval', async () => {
        const response = await request(app).get('/api/awards-interval');
        const { max } = response.body;

        const intervals = max.map(item => item.interval);
        const maxInterval = Math.max(...intervals);

        max.forEach(item => {
            expect(item.interval).toBe(maxInterval);
        });
    });

    // Testa se a API responde corretamente ao ser chamada várias vezes
    it('should respond correctly to multiple requests', async () => {
        const responses = await Promise.all([
            request(app).get('/api/awards-interval'),
            request(app).get('/api/awards-interval'),
            request(app).get('/api/awards-interval')
        ]);

        responses.forEach(response => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('min');
            expect(response.body).toHaveProperty('max');
        });
    });

    it('should return 500 and an error message if a database error occurs', async () => {
        // Força um erro ao fechar a conexão do banco de dados antes de fazer a requisição
        db.close((err) => {
            if (err) {
                console.error('Failed to close the database:', err.message);
            }
        });

        const response = await request(app).get('/api/awards-interval');

        // Verifica o status 500 e a estrutura da mensagem de erro
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    });
});