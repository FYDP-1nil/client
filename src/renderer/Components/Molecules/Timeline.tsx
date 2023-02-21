import '../../Styles/Molecules/SoccerTimeline.css'
const Timeline = (props) => {
  return (
    <div className='timeline' style={{"visibility":'hidden'}}>
        <div className='timeline-btn'>
        <p>TIMELINE</p>
        <p>LINEUP</p>
        </div>
      <div className='timeline-info'>

      </div>
      {/* <div className='lineup-info'>

      </div> */}
    </div>
  );
};

export default Timeline;
