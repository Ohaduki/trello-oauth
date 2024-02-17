import axios from 'axios';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import Board from './components/Board';

function App() {
  
  const [cookies, setCookies, removeCookie] = useCookies(['trello_token'])
  const [boards, setBoards] = useState([])
  const [newBoardName, setNewBoardName] = useState('')
  const [newBoardDesc, setNewBoardDesc] = useState('')
  
  useEffect(() => {
    const fetchBoards = async () => {
      try{
        const response = await axios.get('http://localhost:3001/boards', {withCredentials: true})
        setBoards(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBoards()
  }, [cookies, boards])

  return (
    <div className="App">
      {cookies.trello_token ?
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <h1>Your Boards</h1>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", rowGap:"50px", width:"90%", marginLeft:"100px", marginBottom:"50px"}}>
          {boards.map(board => <Board board={board}/>)}
        </div>
        <h1>Create a new Board</h1>
        <BoardForm>
          <h2>Board Name</h2>
          <input type="text" placeholder='Please type the board name' value={newBoardName} onChange={(e) => {setNewBoardName(e.target.value)}}/>
          <h2>Board Description</h2>
          <input type='text' placeholder='Type a description' value={newBoardDesc} onChange={(e) => {setNewBoardDesc(e.target.value)}}/>
          <Button onClick={
            async () => {
              try{
                await axios.post('http://localhost:3001/boards', {name: newBoardName, desc: newBoardDesc}, {withCredentials: true})
                setNewBoardName('')
                setNewBoardDesc('')
                setBoards([])
              } catch (error) {
                console.error(error)
              }
            }
          }>Create Board
          </Button>
        </BoardForm>
        <Button onClick={() => removeCookie("trello_token")}>Log out</Button>
      </div>
      :
      <div style={{display:"grid", placeItems:"center", height:"100vh"}}>
        <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
          <h1>Welcome to Ohad's Trello Site</h1>
          <Button onClick={async () => {
            try{
              const response = await axios.get('http://localhost:3001/login')
              window.open(response.data, 'newwindow', 'width=500,height=500')
            } catch (error) {
              console.error(error)
            }
          }}>
            Login
          </Button>
        </div>
      </div>
      }
    </div>
  );
}

const BoardForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & h2 {
    margin-bottom: 10px;
  }
  & input {
    margin-bottom: 10px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #2E8BC0;
    padding: 5px;
    font-size: 16px;
    width: 400px;
  }
`

const Button = styled.button`
  margin-bottom: 10px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #3F506C;
  padding: 10px;
  font-size: 16px;
  background-color: #2E8BC0;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #3F506C;
  }
`


export default App;
