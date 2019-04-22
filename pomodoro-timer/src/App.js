import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import BreakComponent from "./components/Break";
import SessionComponent from "./components/Session";
import Timer from "./components/Timer";
import StartReset from "./components/StartReset";
import Header from "./components/Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timer: 1500,
      timerState: "stopped",
      timerType: "Session",
      intervalId: "",
      warningColor: { color: "#bbb" }
    };
    this.clock = this.clock.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.phaseControl = this.phaseControl.bind(this);
    this.buzz = this.buzz.bind(this);
    this.warn = this.warn.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timer: 1500,
      timerState: "stopped",
      timerType: "Session",
      intervalId: "",

      warningColor: { color: "#bbb" }
    });

    clearInterval(this.state.intervalId);
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  breakIncrement() {
    const { breakLength } = this.state;
    this.increment(breakLength);
  }
  breakDecrement() {
    this.decrement(this.state.breakLength);
  }
  increment(num) {
    this.setState({
      breakLength: num <= 59 ? num + 1 : num
    });
  }
  decrement(num) {
    this.setState({
      breakLength: num === 1 ? num : num - 1
    });
  }
  sessionIncrement() {
    const { sessionLength } = this.state;
    this.sessLengthInc(sessionLength);
  }
  sessionDecrement() {
    const { sessionLength } = this.state;
    this.sessLengthDec(sessionLength);
  }
  sessLengthInc(num) {
    num <= 59
      ? this.setState({
          sessionLength: num + 1,
          timer: num * 60 + 60
        })
      : this.setState({
          sessionLength: num
        });
  }
  sessLengthDec(num) {
    num === 1
      ? this.setState({
          sessionLength: num
        })
      : this.setState({
          sessionLength: num - 1,
          timer: num * 60 - 60
        });
  }
  startCountdown() {
    this.setState({
      intervalId: setInterval(() => {
        this.decrementTimer();
        this.phaseControl();
      }, 1000)
    });
  }

  resumeTimer() {
    const { timer, timerState } = this.state;
    const render =
      timerState === "stopped" && timer === 1500
        ? "Start"
        : timerState === "stopped" && timer !== 1500
        ? "Start"
        : "Pause";

    return render;
  }
  timerControl() {
    const { timerState, intervalId } = this.state;
    const control =
      timerState === "stopped"
        ? (this.startCountdown(), this.setState({ timerState: "running" }))
        : (clearInterval(intervalId), this.setState({ timerState: "stopped" }));
    return control;
  }
  phaseControl() {
    const {
      timer,
      timerType,
      breakLength,
      sessionLength,
      intervalId
    } = this.state;
    this.warn(timer);
    this.buzz(timer);
    if (timer < 0) {
      const phase =
        timerType === "Session"
          ? (clearInterval(intervalId),
            this.switchTimer(breakLength * 60, "Break"),
            this.startCountdown())
          : (clearInterval(intervalId),
            this.switchTimer(sessionLength * 60, "Session"),
            this.startCountdown());
      return phase;
    }
  }

  warn(timer) {
    const timerStylesWarn = { color: "red" };
    const timerStylesNormal = { color: "#bbb" };
    const timerWarn =
      timer < 61
        ? this.setState({
            warningColor: timerStylesWarn
          })
        : this.setState({
            warningColor: timerStylesNormal
          });
    return timerWarn;
  }
  switchTimer(num, string) {
    this.setState({
      timer: num,
      timerType: string
    });
  }
  buzz() {
    if (this.state.timer === 0) {
      this.audioBeep.play();
    }
  }
  decrementTimer() {
    const { timer } = this.state;
    this.setState({
      timer: timer - 1
    });
  }
  clock() {
    const { timer } = this.state;
    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  }
  render() {
    const { timerType, breakLength, sessionLength, warningColor } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Header />
        </header>
        <div className="break-session">
          <BreakComponent
            breaklength={breakLength}
            incLength={this.breakIncrement}
            decLength={this.breakDecrement}
          />{" "}
          <SessionComponent
            sessionlength={sessionLength}
            sessInc={this.sessionIncrement}
            sessDec={this.sessionDecrement}
          />
        </div>
        <Timer
          timertype={timerType}
          clock={this.clock()}
          warncolor={warningColor}
        />
        <StartReset
          control={this.timerControl}
          render={this.resumeTimer()}
          reset={this.reset}
        />
        <audio
          id="beep"
          preload="auto"
          src="https://goo.gl/65cBl1"
          ref={audio => {
            this.audioBeep = audio;
          }}
        />
      </div>
    );
  }
}

export default App;
