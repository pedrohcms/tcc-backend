import { config } from "dotenv";
config();

import express from "./App";

express.listen(process.env.PORT || 3333);
