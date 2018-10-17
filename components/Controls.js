class Controls extends React.Component {
    constructor(props) {
      super();
    }

    render = () => {
        return (
              <div className={'controls'}>
                  <h1 className={'controls-title'}>Timer</h1>
                  <div className={'controls_panel'}>
                     <div className={'controls-button_wrap'}>
                        <button
                          className={'controls-button'}
                          id={'start'}
                          onClick = {() => this.props.start()}>
                            <i className={'fas fa-play'}></i>
                          </button>
                          <p className={'controls-button_description'}>Start</p>
                      </div>
                      <div className={'controls-button_wrap'}>
                        <button
                          className={'controls-button'}
                          id={'stop'}
                          onClick = {() => this.props.stop()}>
                            <i className={'fas fa-stop'}></i>
                          </button>
                          <p className={'controls-button_description'}>Stop</p>
                      </div>
                      <div className={'controls-button_wrap'}>
                        <button
                          className={'controls-button'}
                          id={'save'}
                          onClick = {() => this.props.addResult()}>
                            <i className={'fas fa-save'}></i>
                          </button>
                          <p className={'controls-button_description'}>Save</p>
                      </div>
                      <div className={'controls-button_wrap'}>
                        <button
                          className={'controls-button'}
                          id={'reset'}
                          onClick = {() => this.props.resettimer()}>
                            <i className={'fas fa-undo'}></i>
                          </button>
                          <p className={'controls-button_description'}>Reset</p>
                      </div>
                      <div className={'controls-button_wrap'}>
                        <button
                          className={'controls-button'}
                          id={'clear'}
                          onClick = {() => this.props.clearResults()}>
                            <i className={'fas fa-trash'}></i>
                          </button>
                          <p className={'controls-button_description'}>Clear</p>
                      </div>
                      <div className={'controls-button_wrap'}>
                        <button
                          className={'controls-button'}
                          id={'sort'}
                          onClick = {() => this.props.sortResults()}>
                            <i className={'fas fa-sort-numeric-down'}></i>
                          </button>
                          <p className={'controls-button_description'}>Sort</p>
                        </div>
                        <div className={'controls-button_wrap'}>
                          <button
                            className={'controls-button'}
                            id={'pick'}
                            onClick = {() => this.props.pickTheBestTime()}>
                              <i className={'fas fa-trophy'}></i>
                            </button>
                            <p className={'controls-button_description'}>Best</p>
                          </div>
                  </div>
              </div>
        );
    }
}
