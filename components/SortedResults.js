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
                      <i className={'fas fa-trophy'}></i>
                      <span>{ele.result}</span>
                      <button
                        className = {'button'}
                        onClick = {() => this.props.deleteSortedResultWithId(ele.id)}>
                            <i className={'fas fa-trash'}></i>
                        </button>
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
