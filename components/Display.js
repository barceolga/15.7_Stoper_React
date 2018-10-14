class Display extends React.Component {
    constructor(props){
        super(props);
    }

    static propTypes ={
      running: React.PropTypes.bool.isRequired,
      showBestScore: React.PropTypes.bool.isRequired,
      time: React.PropTypes.string.isRequired,
      theBestResult: React.PropTypes.string.isRequired
    }

    render = () => {
          return(
            <div className={'stopwatch-common'}>
                <div className={'decorative'}>
                      <i className={`fas fa-clock ${this.props.running===true?'on-run':'stopped'}`}></i>
                </div>
                <div className ={`stopwatch ${this.props.running===true?'on-run':'stopped'}`} > {this.props.time}</div>
                <div className ={`screen ${this.props.showBestScore===true?'active':'stopped'}`}> {this.props.theBestResult} </div>
                <div className={'decorative-mirror'}>
                      <i className={`fas fa-clock ${this.props.running===true?'on-run':'stopped'}`}></i>
                </div>
            </div>
        );
    }
}
