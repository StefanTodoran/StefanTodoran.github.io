import React, {Component} from "react";
import {TouchableOpacity} from "react-native-web";
import './IntroAnim.css';
import '../App.css';

export class IntroAnim extends Component {
  state = {
    started: false,
    countdown: 3,
  }

  startIntro = () => {
    this.setState({started: true});
    const effects = [
      '.filmSpots', '.background', '.grain', '.filmScratchInner', '.filmScratchOuter',
    ];

    for (let i = 0; i < effects.length; i++) {
      const effect = document.querySelector(effects[i]);
      effect.classList.add('active');
    }

    setTimeout(() => {
      this.setState({countdown: 2});
    }, 1000);
    setTimeout(() => {
      this.setState({countdown: 1});
    }, 2000);
    setTimeout(() => {
      this.props.endIntroCallback();
    }, 3000);
  }

  render() {
    return (
      <div>
        <div className={"filmSpots"}/>
        <div className={"filmScratchInner"}/>
        <div className={"filmScratchOuter"}/>
        <div className={"background"}/>
        <div className={"grain"}/>
        {!this.state.started && <div className={"fullScreenContainer"}>
          <TouchableOpacity onPress={this.startIntro}>
            <svg className={"playButton"} width="114" height="130" viewBox="0 0 57 65" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_0_1" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="57"
                    height="65">
                <g id="mask0_0_1">
                  <path id="Play" d="M57 29.7481L0.265424 64.5625L0.265427 0.0913939L57 29.7481Z" fill="#C4C4C4"/>
                </g>
              </mask>
              <g mask="url(#mask0_0_1)">
                <g id="Gradient Background">
                  <path id="Vector" d="M96.9744 -41H-62V117.974H96.9744V-41Z" fill="url(#paint0_linear_0_1)"/>
                </g>
              </g>
              <defs>
                <linearGradient id="paint0_linear_0_1" x1="17.4872" y1="-41" x2="17.4872" y2="117.974"
                                gradientUnits="userSpaceOnUse">
                  <stop offset="0.333333" stopColor="#FF8E47"/>
                  <stop offset="0.598958" stopColor="#FFC05C"/>
                </linearGradient>
              </defs>
            </svg>
          </TouchableOpacity>
        </div>}
        {this.state.started && <div className={"full"}>
          <div className={"wholeView active"}>
            <div className={"countdownNumber"}>{this.state.countdown}</div>
            <div className={"horizontalLine"}/>
            <div className={"verticalLine"}/>
            <div className={"outerCircle"}/>
            <div className={"innerCircle"}/>
            <svg className={"circleContainer"}>
              <circle className="spinner" cx="50vw" cy="50vh"/>
            </svg>
          </div>
        </div>}
      </div>
    )
  }
}