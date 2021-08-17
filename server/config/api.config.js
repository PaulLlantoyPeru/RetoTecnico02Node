module.exports = {
    APP: {
        title : "RETO TECNICO 02",
    },
    PORT: process.env.PORT || 5000,
    JWT: {
        seed: 'Assessment',
        expires: '1h',
    },
    TIMEZONE : process.env.TIMEZONE || 'America/Lima',
    FIREBASESTORAGE : process.env.FIREBASESTORAGE || ''  
};