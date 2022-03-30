import React from 'react'
import '../App.css'
import utils from '../utils'

class AppMiddle extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            activeIconMiddleLeft: false,
            activeIconMiddleRight: false,
            calendar: [],
            mouseXDown: null,
            swiped: null
        }
        this._swipe = {}
    }

    touchStartComponent = (e) => {
        this._swipe = {x: e.touches[0].clientX}
        this.setState({
            swiped: false
        })
    }

    touchMoveComponent = (e) => {
        if (e.changedTouches && e.changedTouches.length) {
            //const touch = e.changedTouches[0]
            this._swipe.swiping = true
        }
    }

    touchEndComponent = (e) => {
        const xPos = e.changedTouches[0].clientX - this._swipe.x
            if (this._swipe.swiping && Math.abs(xPos) > 75) {
                this.props.onSwiped && this.props.onSwiped()

                if (xPos < 0) {
                    this.props.changeDate('month', this.props.month - 1)
                }
                if (xPos > 0) {
                    this.props.changeDate('month', this.props.month + 1)
                }
            }
        this._swipe = {}
    }

    mouseXPosition = (e, type) => {
        if (type === 'down') {
            this.setState({
                mouseXDown: e.pageX
            })
        }
        if (type === 'up') {
            if (e.pageX + 75 < this.state.mouseXDown) {
                this.props.changeDate('month', this.props.month - 1)
            }
            if (e.pageX - 75 > this.state.mouseXDown) {
                this.props.changeDate('month', this.props.month + 1)
            }
        }
    }

    upChevron = (type) => {
        this.setState({
            [type]: false
        })
    }

    downChevron = (type) => {
        this.setState({
            [type]: true
        })
    }

    render() {

        let i
        let firstDay = this.props.firstDay === 7 ? 0 : this.props.firstDay
        let priorMonth = (this.props.year < this.props.initialYear) || (this.props.year === this.props.initialYear && this.props.month < this.state.initialMonth)
        let currentMonth = this.props.month === this.props.initialMonth && this.props.year === this.props.initialYear
        let calendar = []
        let calClass
        let daysInCurrentMonth = utils.totalDaysInCurrentMonth(this.props.month, this.props.year)

        for (i=0; i<42; i++) {

                if (i < firstDay || i >= daysInCurrentMonth + firstDay) {
                    calClass = 'blank-day'
                } else if ((priorMonth) || (i <= this.props.initialDay + 1 && currentMonth)) {
                    calClass = 'past-date'
                } else {
                    calClass = 'cal-day'
                }
                let currentDay = this.props.firstDay === 7 ? i - this.props.firstDay + 8 : i - this.props.firstDay + 1

                if (this.props.dayOfMonth === currentDay) {
                    calClass = 'cal-day today'
                }

            calendar.push(<div onClick={calClass === 'blank-day' ? null : () => this.props.changeDate('day', currentDay)} className={calClass}>{calClass === 'blank-day' ? null : <p>{currentDay}</p>}</div>)
        }

        return(
            <div className='app-middle' onMouseDown={(e) => this.mouseXPosition(e, 'down')} onMouseUp={(e) => this.mouseXPosition(e, 'up')} onTouchStart={this.touchStartComponent} onTouchMove={this.touchMoveComponent} onTouchEnd={this.touchEndComponent}>

                <div className='month-year-container'>
                    <div className='toggle-month'>
                        <i className="icon ion-ios-arrow-back" style={{color: this.state.activeIconMiddleLeft ? 'rgb(255,0,0)' : null}} onMouseDown={() => this.downChevron('activeIconMiddleLeft')} onMouseUp={() => this.upChevron('activeIconMiddleLeft')} onTouchStart={() => this.downChevron('activeIconMiddleLeft')} onTouchEnd={() => this.upChevron('activeIconMiddleLeft')} onClick={(e) => {this.props.changeDate('month', this.props.month - 1)}}></i>
                    </div>
                    <div className='display-month-year'>
                        <p>{utils.convertMonth(this.props.month)} {this.props.year}</p>
                    </div>
                    <div className='toggle-month'>
                        <i className="icon ion-ios-arrow-forward" style={{color: this.state.activeIconMiddleRight ? 'rgb(255,0,0)' : null}} onMouseDown={() => this.downChevron('activeIconMiddleRight')} onMouseUp={() => this.upChevron('activeIconMiddleRight')} onTouchStart={() => this.downChevron('activeIconMiddleRight')} onTouchEnd={() => this.upChevron('activeIconMiddleRight')} onClick={() => this.props.changeDate('month', this.props.month + 1)}></i>
                    </div>
                </div>

                <div className='cal-head'>
                    <div className='day-name'><p>S</p></div>
                    <div className='day-name'><p>M</p></div>
                    <div className='day-name'><p>T</p></div>
                    <div className='day-name'><p>W</p></div>
                    <div className='day-name'><p>T</p></div>
                    <div className='day-name'><p>F</p></div>
                    <div className='day-name'><p>S</p></div>
                </div>

                <div className='cal-container'>
                    {calendar}
                </div>
            </div>
        )
    }
}

export default AppMiddle
