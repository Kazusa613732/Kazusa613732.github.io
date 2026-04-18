import { existsSync } from 'node:fs';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function resolveBaseUrl() {
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }

  if (existsSync('CNAME')) {
    return '/';
  }

  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
  if (process.env.GITHUB_ACTIONS && repoName) {
    return `/${repoName}/`;
  }

  return '/';
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: resolveBaseUrl(),
});
