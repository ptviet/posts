import _ from "lodash";

export const styles: any = (theme: any) => ({
  root: {
    width: "60%",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },
  main: {
    display: "block" // Fix IE 11 issue.
  },
  typography: {
    fontWeightRegular: theme.typography.fontWeightRegular,
    fontWeightMedium: theme.typography.fontWeightMedium
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  card: {
    maxWidth: "auto"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

// @ts-ignore
export const getStyles = (catId, categories, classes) => {
  return {
    fontWeight:
      categories.indexOf(catId) === -1
        ? classes.typography.fontWeightRegular
        : classes.typography.fontWeightMedium
  };
};

// @ts-ignore
export const getCategoryName = (catId, categories) => {
  const cat = _.find(categories, ["_id", catId]);
  return cat.name;
};
