import path from "path"
import express from "express";
import IndexRouter from "./router/index.js";
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(IndexRouter);


app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
