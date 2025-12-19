import type { Config } from "tailwindcss";
import sharedConfig from "@essencia/tailwind-config";

const config: Config = {
  ...sharedConfig,
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
};

export default config;
