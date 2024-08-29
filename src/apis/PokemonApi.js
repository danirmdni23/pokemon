import axios from "axios";
export default {
    get: async function (limit, offset) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        return response;
    }
}