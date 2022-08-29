import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

function PlayButton() {
  return (
    <div className="flex flex-col items-center text-4xl">
      <button>
        <PlayCircleOutlineIcon className="scale-[9] mt-20 mb-20"/>
      </button>
      <label className="text-3xl mt-8">Play</label>
    </div>
  );
}

export default PlayButton;