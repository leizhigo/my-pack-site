// @ts-check
import { defineConfig } from 'astro/config';

import decapCmsOauth from 'astro-decap-cms-oauth';

// https://astro.build/config
export default defineConfig({
  integrations: [decapCmsOauth()],
  // 👇 这是关键：强制设置为纯静态模式
  output: "static"
});