import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div className='my-3'>

            <div className="card" style={{width: "18rem"}}>
            <img src={imageUrl || "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE="}  style={{ height: "200px", objectFit: "cover" }} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title"> {title}... </h5>
                <p className="card-text">{description}...</p>
                <a href= {newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>

      </div>
    )
  }
}

export default NewsItem
