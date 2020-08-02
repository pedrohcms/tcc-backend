import { config } from "dotenv";
config();

import express from "./App";

express.listen(3333);
