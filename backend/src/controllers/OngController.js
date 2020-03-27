const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');


module.exports = {
    async index(req, res) {
        const ongs = await connection('ong').select('*');
    
        return res.json(ongs);
    },

    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;
    
        const id = generateUniqueId();
    
        await connection('ong').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        // console.log(data);
        return res.json({id});
    },

    // Função extra para deletar ONG's e consequentemente todos os casos dela.

    /**
     * async delete(req, res) {
        const {id} = req.params;
        const ong_id = req.headers.authorization;

        const ong = await connection('ong')
        .where('id', id)
        .first();

        if(ong.id != ong_id || ong.id == null) {
            return res.status(401).json({error: 'Operation not permitted'});
        }

        await connection('incidents')
        .where('ong_id', ong_id)
        .delete();

        await connection('ong')
        .where('id', id)
        .delete();

        return res.status(204).send();
         }
     */
    
};