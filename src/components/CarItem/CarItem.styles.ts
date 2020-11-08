import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    width: "100%",
  },
  carColor: (props: { color?: string }) => ({
    width: 25,
    height: 25,
    borderRadius: "50%",
    backgroundColor: props.color,
  }),
}));
