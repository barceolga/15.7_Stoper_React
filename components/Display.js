class Display extends React.Component {
    constructor(props){
        super(props);
    }

    static propTypes ={
      time: React.PropTypes.string.isRequired,
      running: React.PropTypes.bool.isRequired
    }

    render = () => {
          return(
            <div className={'stopwatch-common'}>
                <div className={'decorative'}>
                      <i className={`fas fa-clock ${this.props.running===true?'on-run':'stopped'}`}></i>
                </div>
                <div className ={`stopwatch ${this.props.running===true?'on-run':'stopped'}`} > {this.props.time}</div>
                <div className={'decorative-mirror'}>
                      <i className={`fas fa-clock ${this.props.running===true?'on-run':'stopped'}`}></i>
                </div>
            </div>
        );
    }
}
