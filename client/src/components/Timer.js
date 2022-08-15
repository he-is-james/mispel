import TimelapseIcon from '@mui/icons-material/Timelapse';

function Timer() {
  return (
    <div className="flex flex-col items-center text-4xl">
      <label className="text-3xl">Timer</label>
      <div>
        <TimelapseIcon className="scale-[8] mt-20 mb-20"/>
      </div>
    </div>
  );
}

export default Timer;