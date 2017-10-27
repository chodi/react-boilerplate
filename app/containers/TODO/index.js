/*
 * Todo Page
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
// ANTD
import { Input, Button } from 'antd';


export class Todo extends React.PureComponent { // eslint-disable-line react
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todos: [],
    };
  }

  onChangeHandler = (stateId, value) => {
    this.setState({ [stateId]: value.target.value });
  }
  onAddTodo = () => {
    this.state.todos.push(this.state.inputValue);
    this.setState({ inputValue: '' });
  }
  render() {
    const { inputValue, todos } = this.state;
    return (
      <div>
        <Input onChange={(value) => this.onChangeHandler('inputValue', value)} onPressEnter={this.onAddTodo} placeholder="Basic usage" size="large" value={inputValue} />
        <Button type="primary" onClick={this.onAddTodo} >Add</Button>
        <ul>{todos && todos.map((todo) => {
          return (
            <li style={{ display: 'flex', flexDirection: 'row' }}>
              <div>{todo}</div>
              <Button type="primary" icon="meh" size="large">Completed</Button>
            </li>
          );
        })
      }</ul>
      </div>
    );
  }
}


export default Todo;
