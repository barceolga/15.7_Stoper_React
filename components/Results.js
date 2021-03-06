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
                      <i className={'fas fa-stopwatch'}></i>
                      <span>{ele.result}</span>
                      <button
                        className = {'button'}
                        onClick = {() => this.props.deleteResultWithId(ele.id)}>
                            <i className={'fas fa-trash'}></i>
                        </button>
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
