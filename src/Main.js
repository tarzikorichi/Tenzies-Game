// import MyDie from './MyDie'
export default function Main (props) {
    const DieJSX = () => {
        return props.die.map(item => <span key={item.id} className={item.isActive ? 'active flex' : 'p flex'} onClick={(e) => props.handleDie(e, item.id)}> {item.value} </span>)
    }
    return (
        <div className="Main flex">
            <div className="GameScreen flex">
                <h1>TENZIES GAME</h1>
                <p> Roll until all dice are the same. Click each die to freeze it at its current value between rolls </p>
                <div className="pices">
                    <DieJSX />
                </div>
            <button className="btn" onClick={props.random} > Roll </button>
            </div>
        </div>
    )
}
