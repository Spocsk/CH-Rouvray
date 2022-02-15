function Img(props) {

    return (
        <img 
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
                objectFit: props.objectFit
            }}
            alt={props.alt}
            src={props.src}
        >
        </img>
    )

}

export default Img;