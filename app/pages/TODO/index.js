/*
 * Todo Page
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
// ANTD
import { Input, Button, Layout, Icon } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingIndicator from 'components/LoadingIndicator';
import { getTodo, addTodo, updateTodo, deleteTodo } from './actions';
import mapStateToProps from './selectors';
import LayOut from './LayOut';

const { Header, Content } = Layout;


export class Todo extends React.PureComponent { // eslint-disable-line react
  constructor(props) {
    super(props);
    this.state = {
      inputDescription: '',
      inputTodo: '',
      todos: props.todoByOwner || [],
    };
  }
  componentWillMount() {
    this.props.onGetTodo();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.todoByOwner !== this.props.todoByOwner) {
      this.setState({ todos: nextProps.todoByOwner });
    }
  }
  onChangeHandler = (stateId, value) => {
    this.setState({ [stateId]: value.target.value });
  }
  onAddTodo = () => {
    const { inputDescription, inputTodo } = this.state;
    this.props.onAddTodo({ todo: inputTodo, description: inputDescription });
    this.setState({ inputDescription: '', inputTodo: '' });
  }
  onUpdateTodo = (todo) => {
    const todoObj = todo.toJS();
    this.props.onUpdateTodo({ ...todoObj, isCompleted: !todoObj.isCompleted });
  }
  onDeleteTodo = (todo) => {
    const todoObj = todo.toJS();
    this.props.onDeleteTodo(todoObj);
  }
  render() {
    const { inputDescription, inputTodo, todos } = this.state;
    return (
      <div>
        <LayOut>
          <Header style={{ background: '#fff', padding: 0, height: '60px' }}>
            <Icon
              className="trigger"
            />
            <span style={{ fontSize: '20px', marginLeft: '20px' }}>home</span>
          </Header>
          <Content style={{ padding: 24, background: '#eee', minHeight: 280, overflowY: 'auto' }}>
            <Input
              onChange={(value) => this.onChangeHandler('inputTodo', value)}
              onPressEnter={this.onAddTodo}
              placeholder="Add new Task"
              size="large"
              value={inputTodo}
            />
            <Input
              style={{ marginTop: '20px' }}
              onChange={(value) => this.onChangeHandler('inputDescription', value)}
              onPressEnter={this.onAddTodo}
              placeholder="DESCRIPTION"
              size="large"
              value={inputDescription}
            />
            <Button
              style={{ marginTop: '20px', marginBottom: '20px' }}
              type="primary"
              onClick={this.onAddTodo}
            >Add
            </Button>
            <div style={{ overflow: 'scroll', height: '400px', backgroundColor: '#f7f7f7' }} >
              {
                this.props.isLoading ?
                  <LoadingIndicator /> :
                  <ul>{
                    todos && todos.map((todo) => (
                      <li key={todo.get('id')} style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                        <div>
                          <Button
                            type={todo.get('isCompleted') ? 'default' : 'primary'}
                            icon="check-circle-o"
                            size="small"
                            onClick={() => this.onUpdateTodo(todo)}
                          >{todo.get('isCompleted') ? 'Mark as not Completed' : 'Mark as Completed'}
                          </Button>
                        </div>
                        <div style={{ marginLeft: 5, marginRight: 5 }}>
                          <Button
                            type="danger"
                            icon="delete"
                            size="small"
                            onClick={() => this.onDeleteTodo(todo)}
                          >DELETE
                          </Button>
                        </div>
                        <div>{todo.get('todo')}</div>
                      </li>
                    ))
                  }</ul>
              }
            </div>
          </Content>
        </LayOut>
      </div>
    );
  }
}

Todo.propTypes = {
  onGetTodo: PropTypes.func,
  onAddTodo: PropTypes.func,
  onUpdateTodo: PropTypes.func,
  onDeleteTodo: PropTypes.func,
  todoByOwner: PropTypes.any,
  isLoading: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    onGetTodo: (id) => dispatch(getTodo(id)),
    onAddTodo: (payload) => dispatch(addTodo(payload)),
    onUpdateTodo: (payload) => dispatch(updateTodo(payload)),
    onDeleteTodo: (payload) => dispatch(deleteTodo(payload)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Todo);
