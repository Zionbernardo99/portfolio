import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Este site mora dentro do repositório do Lifelyst. Sem fixar a raiz, o
  // Next sobe uma pasta (acha o package-lock.json de lá) e tenta compilar o
  // app do Lifelyst junto.
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
  images: {
    qualities: [75, 85],
  },
};

export default nextConfig;
