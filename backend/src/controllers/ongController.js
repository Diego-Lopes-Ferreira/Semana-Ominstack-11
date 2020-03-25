const crypto = require('crypto');
const connecion = require('../database/connections');

module.exports = {
  async index (request, response) {
    const ongs = await connecion('ongs').select('*');
    return response.json(ongs);
  },

  async createOng(request, response) {

    const { name, email, whatsapp, cidade, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');
    

    await connecion('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      cidade,
      uf,
    })
    return response.json({ id });
  }
}