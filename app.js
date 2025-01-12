import { server } from "./src/server.js";
import { PORT } from "./env.js";

// sudo lsof -i -P -n | grep LISTEN
const puerto = PORT || 3000;

server.listen(puerto, () => {
    console.log(`Server escuchando en el puerto ${puerto}...`);
});