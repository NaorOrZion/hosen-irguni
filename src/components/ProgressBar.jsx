import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

// Hoist styled component so it doesn't get recreated on each render
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
    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    willChange: "transform",
    ...theme.applyStyles("dark", {
      backgroundColor: "#F7941D",
      transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      willChange: "transform",
    }),
  },
}));

function ProgressBar({ numerator, denominator }) {
  const [progress, setProgress] = useState(0);

  // whenever numerator/denominator change → update progress smoothly
  useEffect(() => {
    const newValue = denominator > 0 ? (numerator / denominator) * 100 : 0;
    setProgress(newValue);
  }, [numerator, denominator]);

  return (
    <div className="progress-bar">
      <BorderLinearProgress variant="determinate" value={progress} />
    </div>
  );
}

export default ProgressBar;
