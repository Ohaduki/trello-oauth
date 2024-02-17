import styled from 'styled-components';

function Board({ board }) {
  return (
    <a href={board.url} target="_blank" style={{display:"block", width:"300px", height:"200px", textDecoration:"none"}}>
        <BoardDiv>
            <h1>{board.name}</h1>
            <p>{board.desc}</p>
        </BoardDiv>
    </a>
  )
}

const BoardDiv = styled.div`
    width: 300px;
    height: 200px;
    border-radius: 10px;
    background-color: #2E8BC0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & h1 {
        color: #f1f2f4;
        text-decoration: none;
    }
    & p {
        color: #3F506C;
        text-decoration: none;
    }
`

export default Board;