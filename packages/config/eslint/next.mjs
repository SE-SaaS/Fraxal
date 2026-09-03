import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";

import base from "./base.mjs";

// eslint-config-next has shipped its flat config as both a bare object and an
// array across releases. Normalising here means a minor bump can't break every
// app's lint run at once.
const next = Array.isArray(nextCoreWebVitals) ? nextCoreWebVitals : [nextCoreWebVitals];

// `prettier` is re-appended after `next` because ordering decides the winner —
// eslint-config-next reintroduces stylistic rules that Prettier must override.
export default [...base, ...next, prettier];
