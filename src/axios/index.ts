import axios from 'axios';

const auth = localStorage.getItem("charity") ? JSON.parse(localStorage.getItem("charity") || ""): {};

const instance = axios.create({});

instance.defaults.headers.common['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept";
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.common['authorization'] = auth.token;
instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;