import React, { Component } from 'react'
import NewsItem from './NewsItem'
import 'react-loading-skeleton/dist/skeleton.css';
import NewsSkeleton from './NewsSkeleton';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
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
            totalResults: 0,
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
      
      fetchMoreData = async () => {
       
        setTimeout(() => {
          this.setState({
            page: this.state.page + 1,
          });

        });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d1381dfa4e6c4b048f4fbdd9639ce349&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults,
          loading: false
        });
      }
      


      render() {
        return (
          <>
            <h2 className="text-center">
              NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
            </h2>
      
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={null} // We'll handle loader manually
            >
              <div className="container">
                <div className="row">
                  {this.state.articles.map((element) => (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={(element.title || "").slice(0, 45)}
                        description={(element.description || "").slice(0, 88)}
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source}
                      />
                    </div>
                  ))}
      
                  {/* Skeleton loader: show only if loading AND has more data */}
                  {(this.state.loading || this.state.articles.length !== this.state.totalResults) &&
                    Array.from({ length: 3 }).map((_, index) => (
                      <NewsSkeleton key={`skeleton-${index}`} />
                    ))
                  }
                </div>
              </div>
            </InfiniteScroll>
          </>
        );
      }
      
  }
      
export default News
