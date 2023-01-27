import diceOne from "./images/one.jpg";
import diceTwo from "./images/two.jpg";
import diceThree from "./images/three.jpg";
import diceFour from "./images/four.jpg";
import diceFive from "./images/five.jpg";
import diceSix from "./images/six.jpg";

export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#b12626" : "white",
  };
  function dicePattern() {
    switch (props.value) {
      case 1:
        return <img className="diceNumberImg" src={diceOne} />;
        break;
      case 2:
        return <img className="diceNumberImg" src={diceTwo} />;
        break;
      case 3:
        return <img className="diceNumberImg" src={diceThree} />;
        break;
      case 4:
        return <img className="diceNumberImg" src={diceFour} />;
        break;
      case 5:
        return <img className="diceNumberImg" src={diceFive} />;
        break;
      case 6:
        return <img className="diceNumberImg" src={diceSix} />;
        break;
      default:
          return <h1>Reload</h1>
    }
      
   
  }
  return (
    <div className="dice-face" style={styles} onClick={props.holdDice}>
      {dicePattern()}
    </div>
  );
}
