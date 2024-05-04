export const Button = (props) =>{
    return (
        <button
        onClick={props.onClick}
        className={props.class}>
            {props.icon}
            {props.title}
        </button>
    )
}