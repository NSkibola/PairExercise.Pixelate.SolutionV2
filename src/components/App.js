import React from 'react'
import store from '../store'
import { addRow } from '../store'
import { selectColor } from '../store'
import { changeColor } from '../store'

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state = store.getState()
  }
  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })  }
  componentWillUnmount(){
    this.unsubscribe()
  }

  addRow() {
    store.dispatch(addRow);
  }

  selectColor(event) {
    store.dispatch(selectColor(event.target.value));
  }

  changeColor(rowIndex, cellIndex) {
    store.dispatch(changeColor(rowIndex, cellIndex));
  }

  render(){
    return (
      <div id ='pixelate'>
      <h1>Pixelate</h1>
      <div>
        <button id='add-row' onClick={this.addRow}>Add a row</button>
        <select onChange={this.selectColor}>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="indigo">Indigo</option>
          <option value="violet">Violet</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="brown">Brown</option>
        </select>
      </div>
      <table>
        {this.state.grid.map((row, rowIndex) => <tr key = {rowIndex}>
        {row.map((color, cellIndex) => <td key = {cellIndex} onClick={this.changeColor(rowIndex, cellIndex)} className = {color}></td>)}
        </tr>)}
      </table>
      </div>
    )
  }
}