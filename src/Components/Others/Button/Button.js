import './style.css'

const Button = (props) => {

    const styles= {
        margin: `${props.margin}`,
        padding: `${props.padding}`,
    }

    return(
        <div onClick={props.onClick} style={styles} className="icon facebook">
            <div className="tooltip">{props.tooltip}</div>
            <span>{props.children}</span>
        </div>
    )
}

export default Button;