import { config } from "dotenv";
config();

import express from "./App";

express.listen(process.env.PORT || 3333, () => console.log('API online na porta: ' + process.env.PORT || 3333));
