const Card = (props) => {
    return (
        <>
            <article className="col-lg-3 col-md-6 col-sm-12">
                <div>
                    <img src={props.img} alt=""/>
                        <h3>{props.marka}</h3>
                        <h4>{props.meret}</h4>
                        <h5>{props.ar}</h5>
                        <div>
                            <button>Részletek</button>
                        </div>
                </div>
            </article>
        </>
    )
}
export default Card;