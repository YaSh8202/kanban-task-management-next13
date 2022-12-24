import "../styles/globals.css";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  cssresources: [
    {
      id: "tailwind",
      code: `<style>@import "../node_modules/tailwindcss/dist/tailwind.min.css";</style>`,
      picked: true,
    },
  ],
  list: [
    {
      name: "Light",
      class: [],
      color: "#ffffff",
      default: true,
    },
    {
      name: "Dark",
      // The class dark will be added to the body tag
      class: ["dark"],
      color: "#000000",
    },
  ],
  darkMode: true,
};
