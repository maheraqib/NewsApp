import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import NewsSkeleton from './NewsSkeleton';
import PropTypes from 'prop-types'
export class News extends Component {

  static defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
 
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title = `${this.capitalizeFirstLetter (this.props.category)} - NewsMonkey`;
    } 

    async componentDidMount() {
        this.setState({ loading: true });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d1381dfa4e6c4b048f4fbdd9639ce349&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading: false
        });
      }
      
      nextPage = async () => {
        const nextPage = this.state.page + 1;
        this.setState({ loading: true });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d1381dfa4e6c4b048f4fbdd9639ce349&page=${nextPage}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          page: nextPage,
          articles: parsedData.articles,
          loading: false
        });
      }
      
      priviousPage = async () => {
        const prevPage = this.state.page - 1;
        this.setState({ loading: true });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d1381dfa4e6c4b048f4fbdd9639ce349&page=${prevPage}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          page: prevPage,
          articles: parsedData.articles,
          loading: false
        });
      }
      


  render() {
    return (
      <div>
        <div className="container my-3 ">
          <h2 className="text-center">NewsMonkey - Top {this.capitalizeFirstLetter (this.props.category)} Headlines</h2>

          <div className="row">
            {this.state.loading
              ? Array.from({ length: this.props.pageSize }).map((_, index) => (
                  <NewsSkeleton key={index} />
                ))
              : (this.state.articles || []).map((element) => (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={(element.title || "").slice(0, 45)}
                      description={(element.description || "").slice(0, 88)}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url} author={element.author} date={element.publishedAt}
                      source={element.source}
                    />
                  </div>
                ))}
          </div>

          <div className="container d-flex justify-content-between">
            <button
              type="button"
              disabled={this.state.page <= 1}
              className=" btn btn-dark"
              onClick={this.priviousPage}
            >
              {" "}
              &larr; Privious
            </button>
            <button
              type="button"
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              className="btn btn-dark"
              onClick={this.nextPage}
            >
              {" "}
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News
