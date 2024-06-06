import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';

interface CircularProgressTimerProps {
    time: number; // Максимальний час
    remainingTime: number; // Залишений час
  }

const CircularProgressTimer: React.FC<CircularProgressTimerProps> = ({time, remainingTime}) => {

   

return (
    <div 
        style={{
            
        }}
    >
   
        <CircularProgress 
            sx={{
                "--CircularProgress-size": "40px",
                "--CircularProgress-trackThickness": "6px",
                "--CircularProgress-progressThickness": "8px",
                "& .MuiCircularProgress-progress": {
                    strokeLinecap: "butt"
                }
              }}
            size="md" 
            determinate 
            value={(time-remainingTime)*100/time}
            color="success"
            variant="soft"
        >
            <Typography
                style={{ 
                    color: "white",
                    fontSize: "2em"

                 }}
            >{remainingTime}</Typography>
        </CircularProgress>
   
    </div>
  );
}

export default CircularProgressTimer
