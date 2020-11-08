import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  image: ({
    isLoaded,
    src,
    width = "100%",
  }: {
    isLoaded: boolean;
    src: string;
    width?: number | string;
  }) => ({
    paddingTop: "56.25%", // 16:9,
    width,
    position: "relative",
    backgroundImage: isLoaded ? `url(${src})` : "none",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }),
  loader: {
    position: "absolute",
    width: "100%",
    top: 0,
    height: "100%",
  },
}));
