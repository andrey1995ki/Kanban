import type { Preview } from "@storybook/react";
import '../src/index.scss'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    themes: [
      { name: 'dark-theme', class: 'dark-theme', color: '#2c2c38', default: true },
      { name: 'light-theme', class: 'light-theme', color: '#eaeffb' }
    ],
    backgrounds: {
      default: 'theme',
      values: [
        {
          name: 'theme',
          value: 'var(--background-color)',
        },
      ],
    },
  },
};

export default preview;
