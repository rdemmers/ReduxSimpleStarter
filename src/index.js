import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
import VideoList from './components/video_list';

const API_KEY = "AIzaSyD_iM6haxzLddRPYVXU6FNn5P51u0-6VTI";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('overwatch');
  }


  videoSearch(term){
    YTSearch({
      key: API_KEY,
      term: term
    }, (videos) => {
      this.setState({videos: videos, selectedVideo: videos[0]})

    });
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 400);

    return (<div>
      <SearchBar onSearchTermChange={videoSearch}/>
      <VideoDetail video={this.state.selectedVideo}/>
      <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos}/>
    </div>);
  }
}

ReactDOM.render(<App/>, document.querySelector('.container'));
