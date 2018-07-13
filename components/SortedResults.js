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
