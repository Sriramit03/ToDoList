import React, { Component } from "react";
import "./styles.css";
import img from "./DeleteIcon.png";
import img2 from"./CancelIcon.png";
class Header extends Component {
  constructor(props) {
    super(props);
    this.taskref = React.createRef();
    this.timeref = React.createRef();
    this.state = {
      isTaskEmpty: false,
      task: " ",
      time: "",
      list: [],
      completed: [],
    };
  }
  getDetails = (event) => {
    const { isTaskEmpty, task, time, list } = this.state;
    if (task == "" || task == " ") {
      this.setState({ isTaskEmpty: true }
      );
      event.preventDefault();
    } else {
      const newList = { task: task, time: time };
      this.setState({ list: [...list, newList], time: "", task: "" });
      event.preventDefault();
      this.taskref.current.focus();
    }
  };
  taskUpdater = (event) => {
    this.setState({ task: event.target.value });
  };
  timeUpdater = (event) => {
    this.setState({ time: event.target.value });
  };
  taskCompleted = (event) => {
    const { list, completed } = this.state;
    const Index = event.target.value;
    this.setState({ completed: [...completed, list[Index]] });
    this.setState({ list: list.filter((value, index) => index != Index) });
    console.log(list);
  };
  taskUncompleted = (event) => {
    const { list, completed } = this.state;
    const Index = event.target.value;
    this.setState({ list: [...list, completed[Index]] });
    this.setState({
      completed: completed.filter((value, index) => index != Index),
    });
  };
  deleteTask(Index) {
    const { list } = this.state;
    this.setState({ list: list.filter((value, index) => index != Index) });
  }
  deleteTaskCompleted = (Index) => {
    const { completed } = this.state;
    this.setState({
      completed: completed.filter((value, index) => index != Index),
    });
  };
  cancelError=(event)=>
  {
     this.setState({isTaskEmpty: false});
     this.taskref.current.focus();
  }
  render() {
    const { isTaskEmpty, task, time, list, completed } = this.state;
    return (
      <div className="complete-div">
        <h1>ToDo List</h1>
        <form className="form-elements" onSubmit={this.getDetails}>
          <div className="d-task">
            <label>Task Name:</label>
            <input
              type="text"
              value={task}
              onChange={this.taskUpdater}
              required
              ref={this.taskref}
            />
          </div>
          <div className="d-time">
            <label id="time-label"> Time:</label>
            <input
              type="time"
              value={time}
              onChange={this.timeUpdater}
              ref={this.timeref}
              
            />
          </div>
          <button type="submit" className="bt-add" onClick={this.getDetails}>
            Add Task
          </button>
        </form>
        <div id="result">
          <h4>ListItems:</h4>
          <ul>
            {list.map((value, index) => (
              <li key={index}>
                &nbsp;
                <input
                  type="checkbox"
                  name="forSelecting"
                  value={index}
                  checked
                  onChange={this.taskCompleted}
                />
                &nbsp;&nbsp;<span className="result-task">{value.task}</span>
                <span className="result-time"> {value.time}</span>
                <button
                  className="bt-del"
                  onClick={() => this.deleteTask(index)}
                >
                  <img src={img} alt="Delete" />
                </button>
              </li>
            ))}
          </ul>
          <br/>
          <h4>Completed:</h4>
          <ul>
            {completed.map((value, index) => (
              <li key={index}>
                &nbsp;
                <input
                  type="checkbox"
                  name="forUpdating"
                  value={index}
                  onChange={this.taskUncompleted}
                  checked
                />
                &nbsp;&nbsp;<span className="output-task">{value.task}</span>
                <span className="result-time"> {value.time}</span>
                <button
                  className="bt-del"
                  onClick={() => this.deleteTaskCompleted(index)}
                >
                  <img src={img} alt="Delete" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        {isTaskEmpty && (
          <div className="error">
            <div className="error-content">
              <button type ="button" className="bt-cancel" onClick={this.cancelError}><img src={img2} alt="Delete" /></button><br/><br/>
              <p>Task field can't be Empty!</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Header;
