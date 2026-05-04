const Controls = ({
    handleCheck,
    handleReset,
    handleHint,
    handleSolve,
    handleNewGame,
    handleChangeDifficulty
}) => {
    return (
        <div style={{marginTop: 16}}>
            <button onClick={handleCheck} style={{marginRight: 8}}>Check</button>
            <button onClick={handleReset} style={{marginRight: 8}}>Reset</button>
            <button onClick={handleHint} style={{marginRight: 8}}>Hint</button>
            <button onClick={handleSolve} style={{marginRight: 8}}>Solve</button>
            <button onClick={handleNewGame} style={{marginRight: 8}}>New Game</button>
            <select onChange={(e) => handleChangeDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
            </select>
        </div>
    )
}
export default Controls;