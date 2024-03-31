type Dict<T = any> = Record<string, T>;

export const theme = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },

  styles: {
    global: {
      table: {
        _dark: {
          bg: "#222",
        },
        _light: {
          bg: "white",
        },
      },
      body: {
        _dark: {
          bg: "#333",
          color: "white",
        },
        _light: {
          bg: "#f1f1f1",
          color: "black",
        },
      },
      button: {},
      option: {
        color: "#333",
      },
    },
  },
} as Dict;
