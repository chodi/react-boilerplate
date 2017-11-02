/*
 * Todo Page
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
// ANTD
import { Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTodo } from './actions';
import mapStateToProps from './selectors';

export class Todo extends React.PureComponent { // eslint-disable-line react
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todos: props.allTodos || [],
    };
  }
  componentWillMount() {
    this.props.getTodo();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.allTodos !== this.props.allTodos) {
      this.setState({ todos: nextProps.allTodos });
    }
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
        <Input onChange={(value) => this.onChangeHandler('inputValue', value)} onPressEnter={this.onAddTodo} placeholder="Add new Task" size="large" value={inputValue} />
        <Button type="primary" onClick={this.onAddTodo} >Add</Button>
        <ul>{todos && todos.map((todo) => {
          return (
            <li style={{ display: 'flex', flexDirection: 'row' }}>
              <div>{todo.get('todo')}</div>
              <Button type="primary" icon="delete" size="small">Completed</Button>
            </li>
          );
        })
      }</ul>
      </div>
    );
  }
}

Todo.propTypes = {
  getTodo: PropTypes.func,
  allTodos: PropTypes.any,
};

function mapDispatchToProps(dispatch) {
  return {
    getTodo: () => dispatch(getTodo()),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Todo);
