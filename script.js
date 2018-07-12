class Stopwatch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        running: false,
        times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        },
        list: [],
        finalList: []
      };
    }
  static propTypes ={
      running: React.PropTypes.bool,
      times: React.PropTypes.number,
      list: React.PropTypes.array,
      finalList: React.PropTypes.array
  }

  reset = () => {
    this.setState({
        times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
          }
      });
  }


  pad0 = (value) => {
      let result = value.toString();
        if (result.length < 2) {
          result = '0' + result;
        }
      return result;
  }

  format = () => {
      let minutes = this.state.times.minutes;
      let seconds = this.state.times.seconds;
      let miliseconds = this.state.times.miliseconds;

      return `${this.pad0(minutes)}:${this.pad0(seconds)}:${this.pad0(Math.floor(miliseconds))}`;
  }

  start = () => {
      if (!this.state.running) {
        this.state.running = true;
        this.watch = setInterval(() => this.step(), 10);
      }
  }

  step = () => {
      if (!this.state.running) return;
      this.calculate();
  }

  calculate = () => {
      this.setState({
          times: {
                minutes: this.state.times.minutes,
                seconds: this.state.times.seconds,
                miliseconds: this.state.times.miliseconds + 1
            }
      });
      if (this.state.times.miliseconds >= 100) {
          this.setState({
              times: {
                    minutes: this.state.times.minutes,
                    seconds: this.state.times.seconds +1,
                    miliseconds: 0
                }
          });
      }
      if (this.state.times.seconds >= 60) {
          this.setState({
              times: {
                    minutes: this.state.times.minutes + 1,
                    seconds: 0,
                    miliseconds: this.state.times.miliseconds
                }
          });
      }
  }

  stop = () => {
        this.setState({
          running: false
        });
        clearInterval(this.watch);
  }

  resettimer = () => {
        this.stop();
        this.reset()
  }

  addResult = () => {

          let newResult= {
            id: (this.state.list.length),
            result: this.format(),
            myValue: (60000 *this.state.times.minutes) +(1000 * this.state.times.seconds)  + (10 * this.state.times.miliseconds),
          };
          this.setState({list:[...this.state.list, newResult], running: false});
        }

  clearResults = () => {
        this.setState({
          list: [],
          finalList: []
        });
    }


  sortResults = () => {
        const myList = [...this.state.list];
        let sortedList = myList.sort(function(a, b) {return (a.myValue > b.myValue) ? 1 : ((b.myValue > a.myValue) ? -1 : 0);});
        this.setState({
            finalList: sortedList
        });

  }

  deleteResultWithId = (id) => {
        this.setState({
            list: this.state.list.filter( ele => ele.id !== id)
        });
  }

  deleteSortedResultWithId = (id) => {
        this.setState({
            finalList: this.state.finalList.filter( ele => ele.id !== id)
        });
  }

  render = () => {
        return (
            <div>
                <div>
                    <Controls
                      start={this.start}
                      stop={this.stop}
                      resettimer={this.resettimer}
                      addResult={this.addResult}
                      clearResults={this.clearResults}
                      sortResults={this.sortResults}
                    />
                    <Display
                      time={this.format()}
                      running={this.state.running}/ >

              </div>
              <div className={'results-common'}>
                    <Animation
                      running={this.state.running} />
                    <div className={'results-common_list'}>
                          <h1 className={'table_results'}>Results</h1>
                          <Results
                            list={this.state.list}
                            running={this.state.running}
                            className = {'results'} deleteResultWithId={this.deleteResultWithId} />
                    </div>
                    <div className={'results-common_list'}>
                          <h1 className={'table_sorted-results'}>Classification</h1>
                          <SortedResults
                            finalList={this.state.finalList}
                            running={this.state.running}
                            className = {'sorted-results'}
                            deleteSortedResultWithId={this.deleteSortedResultWithId} />
                    </div>
              </div>
          </div>
        );

      }
}
class Controls extends React.Component {
    constructor(props){
      super(props)
    }

    render = () => {
          return (
            <nav className={'controls'}>
                <h1 className={'controls-title'}>Stopwatch</h1>
                <div className={'controls_panel'}>
                    <a href="#"
                      className= {'button'}
                      id={'start'}
                      onClick = {() => this.props.start()}>Start</a>
                    <a href="#"
                      className = {'button'}
                      id={'stop'}
                      onClick = {() => this.props.stop()}>Stop</a>
                </div>
                <div className={'controls_panel'}>
                    <a href="#"
                      className = {'button'}
                      id={'reset'}
                      onClick = {() => this.props.resettimer()}>Reset</a>
                    <a href="#"
                      className = {'button'}
                      id={'save'}
                      onClick = {() => this.props.addResult()}>Save</a>
                </div>
                <div className={'controls_panel'}>
                    <a href="#"
                      className = {'button'}
                      id={'clear'}
                      onClick = {() => this.props.clearResults()}>Remove</a>
                    <a href="#"
                      className = {'button'}
                      id={'none'}
                      onClick={() => this.props.sortResults()}>Classify</a>
                </div>
            </nav>
          );
    }
}

class Display extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          running: false
        }
    }

    static propTypes ={
      time: React.PropTypes.string.isRequired,
      running: React.PropTypes.bool.isRequired
    }

    render = () => {
          return(
            <div className={'stopwatch-common'}>
              <div className={'decorative'}></div>
              <div className ={`stopwatch ${this.state.running===true?'on-run':'stopped'}`} > {this.props.time}</div>
              <div className={'decorative'}></div>
            </div>
        );
    }
}

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          running: false,
          list: [],
        };
      }

    static propTypes = {
      list: React.PropTypes.array.isRequired,
      running: React.PropTypes.bool.isRequired
    }

    render () {
        let myresults = this.props.list.map( ele => {
            return (
                <li key={ele.id}>
                      Score: <span>{ele.result}</span>
                      <button className = {'button'} onClick = {() => this.props.deleteResultWithId(ele.id)}>x</button>
                </li>
            );

          });
        return (
              <ul className={'results'}>
                    {myresults}
              </ul>
        );
    }
}

class SortedResults extends React.Component {
    constructor(props) {
        super();
        this.state = {
          running: false,
          finalList: [],
        };
    }

    static propTypes = {
      finalList: React.PropTypes.array.isRequired,
      running: React.PropTypes.bool.isRequired
    }

    render () {
        let sortedResults = this.props.finalList.map( ele => {
            return (
                <li key={ele.id}>
                      Mark: <span>{ele.result}</span>
                      <button className = {'button'} onClick = {() => this.props.deleteSortedResultWithId(ele.id)}>X</button>
                </li>
            );

        });
        return (
              <ul className={'sorted-results'}>
                    {sortedResults}
              </ul>
        );
    }
}

class Animation extends React.Component {
    constructor(props) {
      super();
    }
    render = ()=> {
          return (
            <div className={'results-animation'}>
                <div className={'results-animation_head'}>
                </div>
                <div className={'results-animation_body'}>
                    <div className={'results-animation_left-arm'}>
                    </div>
                    <div className={'results-animation_torso'}>
                    </div>
                    <div className={'results-animation_right-arm'}>
                    </div>
                </div>
                <div className={'results-animation_legs'}>
                    <div className={'results-animation_left-leg'}>
                    </div>
                    <div className={'results-animation_right-leg'}>
                    </div>
                </div>
            </div>
          );
    }
}
var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));
