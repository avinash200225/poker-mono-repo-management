import React, { Component } from "react";


import ReactPlayer from 'react-player'
import { VideoContainer } from "./style";

class VideoPlayer extends Component {
  state = {
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: true,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: true,
  };

  load = (url) => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };

  handleStop = () => {
    this.setState({ url: null, playing: false });
  };

  handlePlay = () => {
    console.log("onPlay");
    this.setState({ playing: true });
  };


  ref = (player) => {
    this.player = player;
  };

  render() {
    const {
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
      pip,
    } = this.state;

    const {
        url
    } = this.props

    const SEPARATOR = " · ";

    return (
      <VideoContainer>
        <ReactPlayer
          ref={this.ref}
          width={this.props.width || "125%"}
          height={this.props.height || "125%"}
          url={url}
          pip={pip}
          playing={playing}
          controls={controls}
          light={light}
          loop={loop}
          playbackRate={playbackRate}
          volume={volume}
          muted={muted}
          onReady={() => console.log("onReady")}
          onStart={() => console.log("onStart")}
          onPlay={this.handlePlay}
        />
      </VideoContainer>
    );
  }
}

export default VideoPlayer;
