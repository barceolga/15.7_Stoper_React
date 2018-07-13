/*import styled from 'styled-components';
import { movingBall } from './KeyFrames.js';

    const Ball = styled.div`
      width: 40px;
      height: 40px;
      border: 2px solid #fff;
      border-radius: 30px;
      background-color: $deep-violet;
      margin-right: 10px;
      animation: ${movingBall} 2s linear infinite;
      `;
    render (
            <Ball / >
          );
*/

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
