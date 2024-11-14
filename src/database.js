const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const db = new sqlite3.Database(':memory:');

const initializeDatabase = () => {
    db.serialize(() => {
        db.run(`
    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY,
      title TEXT,
      year INTEGER,
      producers TEXT,
      winner INTEGER
    )`);

        const insertStmt = db.prepare('INSERT INTO movies (title, year, producers, winner) VALUES (?, ?, ?, ?)');

        fs.createReadStream(path.join(__dirname, '../data/movielist.csv'))
            .pipe(csv({
                separator: ';',
            }))
            .on('data', (row) => {
                let splitedProducers = row.producers.split(',');
                if(splitedProducers.length > 1) {
                    if (splitedProducers[splitedProducers.length - 1].indexOf(' and ') > -1) {
                        let splitedProducersWithAnd = splitedProducers[splitedProducers.length - 1].split(' and ');
                        splitedProducers.pop();
                        splitedProducersWithAnd.forEach(producer => {
                            insertStmt.run(row.title, row.year, producer.trim(), row.winner === 'yes' ? 1 : 0);
                        })
                        splitedProducers.forEach(producer => {
                            insertStmt.run(row.title, row.year, producer.trim(), row.winner === 'yes' ? 1 : 0);
                        })
                    }else {
                        splitedProducers.forEach(producer => {
                            insertStmt.run(row.title, row.year, producer.trim(), row.winner === 'yes' ? 1 : 0);
                        })
                    }
                }
                insertStmt.run(row.title, row.year, row.producers.trim(), row.winner === 'yes' ? 1 : 0);
            })
            .on('end', () => {
                insertStmt.finalize();
                console.log('CSV data has been inserted');
            });
    });
};

module.exports = { db, initializeDatabase };
