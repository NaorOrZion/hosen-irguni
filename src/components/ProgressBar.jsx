import * as React from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

function ProgressBar() {
  const [progress, setProgress] = React.useState(30);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles("dark", {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 10,
      backgroundColor: "#F7941D",
      ...theme.applyStyles("dark", {
        backgroundColor: "#F7941D",
      }),
    },
  }));

  return (
    <div className="progress-bar">
      <BorderLinearProgress variant="determinate" value={progress} />
    </div>
  );
}

export default ProgressBar;
