import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, [])

  // async componentDidMount() {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.page - 1}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   // console.log(parsedData);
  //   this.setState({
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     loading: false
  //   })
  //   // this.updateNews(); //It is not working in my code..
  // }

  // const handlePrevClick = async () => {
    // console.log("previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pageSize=${props.pageSize}`;
    // let data = await fetch(url);

    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}
    // &pageSize=${props.pageSize}`;
    // setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // // console.log(parsedData);
    // setState({
    //   page: page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    // this.setState({page: this.state.page - 1}); //It is not working in my code..
  //   setPage(page-1)
  //   updateNews();
  // }

  // const handleNextClick = async () => {
    // console.log("Next")
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
      // let data = await fetch(url);

    // if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}
    //   &pageSize=${props.pageSize}`;
    //   props.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   props.setState({
    //     page: page + 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   })
    // }
    // // this.setState({page: this.state.page + 1})  //It is not working in my code..
  //   setPage(page+1)
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    // this.setState({ page: this.state.page + 1 })
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

    return (
      <>
        <h1 className='text-center' style={{ margin: '35px 0px', marginTop: '90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
        {/* <div className='row'>    Now we are not using this spinner code , we are making new code for scrolling infinite.
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className='col-md-4' key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} 
              imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div> */}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className='row'>
              {articles.map((element,index) => {
                return <div className='col-md-4' key={index}>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between' >   Now we are not using this next or previous click button......
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark"
            onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News