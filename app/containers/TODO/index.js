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
import { getCredentials } from 'containers/Home/actions';
import LoadingIndicator from 'components/LoadingIndicator';
import { getTodo, addTodo } from './actions';
import mapStateToProps from './selectors';

export class Todo extends React.PureComponent { // eslint-disable-line react
  constructor(props) {
    super(props);
    this.state = {
      inputDescription: '',
      inputTodo: '',
      todos: props.allTodos || [],
    };
  }
  componentWillMount() {
    this.props.getTodo();
    this.props.getCredentials();
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
    const { inputDescription, inputTodo } = this.state;
    this.props.addTodo({ todo: inputTodo, description: inputDescription });
    this.setState({ inputDescription: '', inputTodo: '' });
  }
  render() {
    const { inputDescription, inputTodo, todos } = this.state;
    return (
      <div>
        <Input onChange={(value) => this.onChangeHandler('inputTodo', value)} onPressEnter={this.onAddTodo} placeholder="Add new Task" size="large" value={inputTodo} />
        <Input style={{ marginTop: '20px' }} onChange={(value) => this.onChangeHandler('inputDescription', value)} onPressEnter={this.onAddTodo} placeholder="DESCRIPTION" size="large" value={inputDescription} />
        <Button style={{ marginTop: '20px', marginBottom: '20px' }} type="primary" onClick={this.onAddTodo} >Add</Button>
        <div style={{ overflow: 'scroll', height: '300px', backgroundColor: '#f7f7f7' }} >
          {
            this.props.isLoading ?
              <LoadingIndicator /> :
                <ul>{todos && todos.map((todo) => {
                  return (
                    <li style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                      <div>{todo.get('todo')}</div>
                      <div><Button type="primary" icon="delete" size="small">Mark as Completed</Button></div>
                      <div><Button type="danger" icon="delete" size="small">DELETE</Button></div>
                    </li>
                  );
                })
              }</ul>
          }
        </div>
      </div>
    );
  }
}

Todo.propTypes = {
  getTodo: PropTypes.func,
  addTodo: PropTypes.func,
  getCredentials: PropTypes.func,
  allTodos: PropTypes.any,
  isLoading: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    getTodo: () => dispatch(getTodo()),
    addTodo: (payload) => dispatch(addTodo(payload)),
    getCredentials: () => dispatch(getCredentials()),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Todo);
