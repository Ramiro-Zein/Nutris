const OpenAI = require('openai');
const pool = require('../database');

const api = new OpenAI({ apiKey: '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' });

async function getData(ide) {
    const res = await pool.query('SELECT objetivo, edad, peso, talla, estatura, sexo FROM Dieta WHERE id_dieta = ?', ide);
    return {
        objetivo: res[0].objetive,
        edad: res[0].age,
        peso: res[0].peso,
        talla: res[0].talla,
        estatura: res[0].estatura,
        sexo: res[0].sexo,
    };
};

let cache = {};

async function getResponse(prompt) {

    if (cache[prompt]) {
        return cache[prompt];
    }

    const messages = [{ role: 'user', content: prompt }];
    const response = await api.chat.completions.create({
        model: 'gpt-4',
        max_tokens: 1500,
        temperature: 0,
        messages: messages
    });

    const respuesta = {
        Respuesta: response.choices[0].message.content,
    };
    
    cache[prompt] = respuesta;
    return respuesta;
}


module.exports = { getData, getResponse };
