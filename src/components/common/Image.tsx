import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { useImageLoader } from "../../hooks";
import { useStyles } from "./Image.styles";

interface Props {
  src: string;
  width: number | string | undefined;
}

export const Image: React.FC<Props> = ({ src, width = 250 }: Props) => {
  const [isLoaded] = useImageLoader(src);
  const classes = useStyles({ isLoaded, src, width });

  return (
    <div className={classes.image}>
      {!isLoaded && (
        <Skeleton className={classes.loader} animation="wave" variant="rect" />
      )}
    </div>
  );
};
