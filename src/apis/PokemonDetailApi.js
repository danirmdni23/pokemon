import axios from "axios";
export default {
    get: async function (id) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        return response;
    }
}