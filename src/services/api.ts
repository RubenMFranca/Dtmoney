//pasta service para serviços de dados
import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    
})