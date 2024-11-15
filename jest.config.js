module.exports = {
    // Define o ambiente de teste como Node
    testEnvironment: 'node',

    // Especifica o diretório onde estão os arquivos de teste
    roots: ['<rootDir>/tests'],

    // Define o padrão de correspondência dos arquivos de teste
    testMatch: [
        '**/?(*.)+(spec|test).js' // Encontra arquivos que terminam em .spec.js ou .test.js
    ],

    // Configuração para permitir o uso do ECMAScript Modules (caso necessário)
    transform: {
        '^.+\\.js$': 'babel-jest'
    },

    // Define a cobertura de código para arquivos de teste, opcional
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js'],

    // Define o diretório onde o Jest salva os relatórios de cobertura
    coverageDirectory: 'coverage',

    // Relatórios de cobertura, como HTML e texto
    coverageReporters: ['html', 'text'],

    // Ativa saída de depuração (opcional)
    verbose: true,
};
