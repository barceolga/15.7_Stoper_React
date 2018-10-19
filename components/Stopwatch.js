class Stopwatch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        running: false,
        showBestScore: false,
        times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        },
        list: [],
        finalList: [],
        theBestResult: ""
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
        this.state.showBestScore = false;
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
  pickTheBestTime = () => {
        if (this.state.list.length ==0) {
          return;
        }
        const myList = [...this.state.list];
        let sortedList = myList.sort(function(a, b) {return (a.myValue > b.myValue) ? 1 : ((b.myValue > a.myValue) ? -1 : 0);});
        const theBestTime = sortedList[0].result;
        this.setState({
            theBestResult: theBestTime,
            showBestScore: true
        });
  }

  formatTheBestTime = () => {
      let theBestScore = this.state.theBestResult;

      return "Your best score is " + theBestScore ;
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
                      pickTheBestTime={this.pickTheBestTime}
                    />
                    <Display
                      time={this.format()}
                      running={this.state.running}
                      showBestScore={this.state.showBestScore}
                      theBestResult={this.formatTheBestTime()}
                      />

              </div>
              <div className={'results-common'}>
                    <Animation
                      running={this.state.running}/>
                    <div className={'results-common_list'}>

                          <h1 className={'table_results'}>Results</h1>
                          <Results
                            list={this.state.list}
                            running={this.state.running}
                            className = {'results'} deleteResultWithId={this.deleteResultWithId}/>
                    </div>
                    <div className={'results-common_list'}>
                          <h1 className={'table_sorted-results'}>Scores</h1>
                          <SortedResults
                            finalList={this.state.finalList}
                            running={this.state.running}
                            className = {'sorted-results'}
                            deleteSortedResultWithId={this.deleteSortedResultWithId}/>
                    </div>
                    <Animation
                      running={this.state.running}/>
              </div>
          </div>
        );
    }
}
