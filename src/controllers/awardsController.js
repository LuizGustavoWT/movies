const { db } = require('../database');

const getAwardsInterval = (req, res) => {
    const query = `SELECT producers, year AS winYear FROM movies WHERE winner = 1 ORDER BY producers, year`;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const producerWins = {};

        rows.forEach(({ producers, winYear }) => {
            if (!producerWins[producers]) producerWins[producers] = [];
            producerWins[producers].push(winYear);
        });

        const intervals = Object.keys(producerWins).flatMap((producers) => {
            const wins = producerWins[producers];
            return wins.slice(1).map((win, i) => ({
                producers,
                interval: win - wins[i],
                previousWin: wins[i],
                followingWin: win
            }));
        });

        const minInterval = Math.min(...intervals.map(i => i.interval));
        const maxInterval = Math.max(...intervals.map(i => i.interval));

        const result = {
            min: intervals.filter(i => i.interval === minInterval),
            max: intervals.filter(i => i.interval === maxInterval)
        };

        res.json(result);
    });
};

module.exports = { getAwardsInterval };
