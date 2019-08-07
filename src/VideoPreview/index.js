import React from 'react';
import YouTube from 'react-youtube';

import './wrapper-style.scss';

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enablejsapi: 1,
      rel: 0,
      controls: 0,
      modestbranding: 0,
      showInfo: 0,
      showsearch: 0,
      iv_load_policy: 3,
      start: 0,
      end: 3,
      fs: 0,
      videoHandler: {
        playVideo: this.handlePlayVideo,
        pauseVideo: this.handlePauseVideo,
        playFull: this.handleFullVideo
      }
    };
  }

  player = React.createRef();

  handlePlayVideo = () => {
    this.player.current.internalPlayer.playVideo();
  }

  handlePauseVideo = () => {
    this.player.current.internalPlayer.pauseVideo();
  }

  handleFullVideo = () => {
    this.setState({
      controls: 1,
      end: this.player.current.internalPlayer.getDuration(),
      videoHandler: {
        playVideo: null,
        pauseVideo: null,
        playFull: null
      }
    });
    this.player.current.internalPlayer.playVideo();
  }

  render() {
    const opts = {
      height: '400',
      width: '760',
      playerVars: this.state
    };

    return (
      <div className='player-wrapper'
        onMouseOver = {this.state.videoHandler.playVideo} 
        onMouseLeave = {this.state.videoHandler.pauseVideo}
        onClick = {this.state.videoHandler.playFull}
      >
        <YouTube
          ref={this.player}
          id='player'
          videoId = '2g811Eo7K8U'
          opts = { opts }
          onStateChange = { this._repeatPreview }
        />
      </div>
    );
  }

  _repeatPreview(event) {
    if (event.data === 0) {
      event.target.playVideo();
    }
  }
}

export default Preview;
