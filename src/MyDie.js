export default function MyDie (props) {
    return (
        <span className={props.active ? 'flex active' : 'flex p'} onClick={(event) => props.click(event, props.id)}> {props.num} </span>
    )
}