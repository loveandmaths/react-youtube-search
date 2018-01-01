import _ from 'lodash';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_Key = 'AIzaSyA6bDtXkUMdsxjjOC2pawU45fcqdB6K__I';



class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
     };

     this.videoSearch('surfboards');

  }

  videoSearch(term){
    YTSearch({key: API_Key, term: term}, videos => {
      this.setState({
        videos : videos, //es6 syntax == videos: videos
        selectedVideo: videos[0]
      })
    });
  }

  render(){

    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
    //using lodash to wait 3 ms before searching, throttle user input
    //similar to google

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
          <div className="row">
            <VideoDetail video={this.state.selectedVideo} />
            <VideoList
            onVideoSelect={ selectedVideo => this.setState({selectedVideo})}
            videos={this.state.videos} />
          </div>
      </div>
    );
  }
}

ReactDom.render(<App/>,document.querySelector('.container'));
