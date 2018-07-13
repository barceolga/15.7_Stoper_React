class Controls extends React.Component {
    constructor(props) {
      super();
    }

    render = () => {
        return (
              <div className={'controls'}>
                  <h1 className={'controls-title'}>Stopwatch</h1>
                  <div className={'controls_panel'}>
                      <a href="#" className={'button'} id={'start'} onClick = {() => this.props.start()}>Start</a>
                      <a href="#" className={'button'} id={'stop'} onClick = {() => this.props.stop()}>Stop</a>

                      <a href="#" className={'button'} id={'reset'} onClick = {() => this.props.resettimer()}>Reset</a>
                      <a href="#" className={'button'} id={'save'} onClick = {() => this.props.addResult()}>Save</a>

                      <a href="#" className={'button'} id={'clear'} onClick = {() => this.props.clearResults()}>Clear</a>
                      <a href="#" className={'button'} id={'sort'} onClick = {() => this.props.sortResults()}>Sort</a>
                  </div>
              </div>
        );
    }
}
