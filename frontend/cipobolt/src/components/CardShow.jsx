import { useLocation, useNavigate } from "react-router-dom";
import Card from "./Card"


const CardShow = () => {
    const location = useLocation()
    const props = location.state
    const navigate = useNavigate()
    
    const handleClick = () => {
    navigate(`/edit/${props.id}`, { state: props });
    }
    

    return (
        <>
            <article className="col-lg-3 col-md-6 col-sm-12 card">
                <div className="card">
                    <img src={props.img} alt=""/>
                        <h3>{props.markanev}</h3>
                        <h4>{props.ciponev}</h4>
                        <h5>{props.ar}</h5>
                        <div>
                            <button>Részletek</button>
                            <></>
                        </div>
                </div>
            </article>
        </>
    )
}
export default Card