export default {
    control: {
      fontSize: 16,
    },
    width: '100%',
    borderRadius: 6,

    "&multiLine": {
        borderRadius: 6,

      control: {
        minHeight: 63,
      },
      highlighter: {
        padding: 9,
        paddingBottom: 34,
        border: "2px solid transparent",
      },
      input: {
        padding: 10,
        borderRadius: 6,
        border: '1px solid rgba(0, 0, 0, 0.2)',
        backgroundColor: 'var(--input-color)',

    },
    },
    "&singleLine": {
      display: "inline-block",
      width: 180,
      highlighter: {
        padding: 1,
        borderRadius: 6,
    },
      input: {
        padding: 1,

      },
    },
    suggestions: {
        borderRadius: 6,
        boxShadow: '5px 4px 24px 0px rgba(0, 0, 0, 0.2)',
        maxHeight: 150,
        overflowY: 'scroll',
      list: {
        borderRadius: 6,
        backgroundColor: "var(--card-bg-color)",
        fontSize: 18,
      },
      item: {
        padding: "10px 20px",
        "&focused": {
          backgroundColor: "var(--sidebar-hover)",
          borderRadius: 6,

        },
      },
    },
  };