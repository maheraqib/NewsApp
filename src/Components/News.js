import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import NewsSkeleton from './NewsSkeleton';

export class News extends Component {
 
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
    } 

    async componentDidMount() {
        this.setState({ loading: true });
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d1381dfa4e6c4b048f4fbdd9639ce349&page=1&pageSize=${this.props.pageSize}`;
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
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d1381dfa4e6c4b048f4fbdd9639ce349&page=${nextPage}&pageSize=${this.props.pageSize}`;
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
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d1381dfa4e6c4b048f4fbdd9639ce349&page=${prevPage}&pageSize=${this.props.pageSize}`;
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
          <h2 className="text-center">NewsMonkey - Top Headlines</h2>

          <div className="row">
            {this.state.loading
              ? Array.from({ length: this.props.pageSize }).map((_, index) => (
                  <NewsSkeleton key={index} />
                ))
              : (this.state.articles || []).map((element) => (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={(element.title || "").slice(0, 50)}
                      description={(element.description || "").slice(0, 90)}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
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
