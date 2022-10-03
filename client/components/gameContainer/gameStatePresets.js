const gameStatePresets = {
  small: {
    size: {
      rows: 9,
      columns: 9,
    },
    bombs: 10,
  },
  medium: {
    size: {
      rows: 16,
      columns: 16,
    },
    bombs: 40,
  },
  large: {
    size: {
      rows: 16,
      columns: 30,
    },
    bombs: 99,
  },

  default: {
    size: {
      rows: 16,
      columns: 30,
    },
    bombs: 99,
  },
};

export default gameStatePresets;
