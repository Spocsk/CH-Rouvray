function Card(props) {

    return (
        <div 
            className="bg-white rounded-md p-4 m-0"
            style={{
                width: props.width, 
                height: props.height,
                marginTop: props.marginTop,
                marginBottom: props.marginBottom,
                marginLeft: props.marginLeft,
                marginRight: props.marginRight,
                paddingTop: props.paddingTop,
                paddingBottom: props.paddingBottom,
                paddingLeft: props.paddingLeft,
                paddingRight: props.paddingRight,
                backgroundColor: props.backgroundColor,
                display: props.display,
                overflowY: props.overflowY,
                overflowX: props.overflowX,
            }}
        >
            {props.children}
        </div>
    )

}

export default Card;