import '../../Styles/Utility.css'

const Spinner = ({style}) => (
  <div style={style} className="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Spinner;