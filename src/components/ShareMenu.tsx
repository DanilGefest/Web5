import shareCopy from "../images/share-button-copy.svg";
import shareVK from "../images/share-button-vk.svg";
import shareTg from "../images/share-button-telegram.svg";
import shareWatsapp from "../images/share-button-whatsapp.svg";
import shareFacebook from "../images/share-button-facebook.svg";

type Props = { setAlert: (alert: JSX.Element) => void };

export default function ShareMenu(props: Props) {
  function closeAlert() {
    props.setAlert(<></>);
  }

  return (
    <div className="blur" onClick={closeAlert}>
      <div className="share-container">
        <button className="share-section-button">
          <img
            className="interact-button-img-scale"
            src={shareCopy}
            alt=""
          ></img>
        </button>

        <button className="share-section-button">
          <img className="interact-button-img-scale" src={shareVK} alt=""></img>
        </button>

        <button className="share-section-button">
          <img className="interact-button-img-scale" src={shareTg} alt=""></img>
        </button>

        <button className="share-section-button">
          <img
            className="interact-button-img-scale"
            src={shareWatsapp}
            alt=""
          ></img>
        </button>

        <button className="share-section-button">
          <img
            className="interact-button-img-scale"
            src={shareFacebook}
            alt=""
          ></img>
        </button>
      </div>
    </div>
  );
}
