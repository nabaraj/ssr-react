import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAppsIfNeeded } from '../redux/actions'

import Card from './card'
class App extends Component {
  constructor(props) {
    super(props);

    this.increasePage = this.increasePage.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchAppsIfNeeded())
  }
  clickEvent(e) {
    console.log('click');

  }
  increasePage(e) {
    e.preventDefault();
    let currentPage = this.props.currentPage;
    window.location.search("/?page=" + currentPage++);
  }
  render() {
    const { isFetching, apps, currentPage } = this.props
    const totalapps = apps.length;

    return (
      <>
        {isFetching && totalapps === 0 && <h2>Loading...</h2>}
        {!isFetching && totalapps === 0 && <h2>Empty</h2>}
        <Card apps={apps} totalapps={totalapps} />
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a className="page-link" href="#" aria-disabled={`${currentPage === 1}`}>Previous</a>
            </li>

            <li className="page-item">
              <a className="page-link" href="#" onClick={this.increasePage}>Next</a>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

function mapStateToProps({ isFetching, apps, currentPage }) {
  return {
    isFetching,
    apps,
    currentPage
  }
}

export default connect(mapStateToProps)(App)
