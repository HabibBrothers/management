import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { footer } from "./footer.js";
const app = d.createElement("div");

app.append(header, footer);
export { app };
