class Animation extends React.Component {
    constructor(props) {
      super();
    }
    render = ()=> {
          return (
            <div className={'results-animation'}>
                <div className={`results-animation_head ${this.props.running===true?'on-run': 'stopped'}`}>
                </div>
                <div className={'results-animation_body'}>
                    <div className={`results-animation_left-arm ${this.props.running===true?'on-run': 'stopped'}`}>
                    </div>
                    <div className={`results-animation_torso ${this.props.running===true?'on-run': 'stopped'}`}>
                    </div>
                    <div className={`results-animation_right-arm ${this.props.running===true?'on-run': 'stopped'}`}>
                    </div>
                </div>
                <div className={'results-animation_legs'}>
                    <div className={`results-animation_left-leg ${this.props.running===true?'on-run': 'stopped'}`}>
                    </div>
                    <div className={`results-animation_right-leg ${this.props.running===true? 'on-run': 'stopped'}`}>
                    </div>
                </div>
            </div>
          );
    }
}
