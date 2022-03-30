import React from 'react'
import './App.css'
import { AppTop, AppMiddle, AppBottom } from './components'

class App extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            dateMessage: 'Select date',
            date: null,
            initialMonth: null,
            initialDay: null,
            initialYear: null,
            isPriorDate: null,
            clearTopField: false,
            closeType: null,
            activeIconTopLeft: false,
            activeIconTopRight: false,
            activeIconMiddleLeft: false,
            activeIconMiddleRight: false
        }
    }

    checkForOutsideClicks = (e) => {
        const app = document.getElementById('date-picker')
        let targetElement = e.target

        do {
            if (targetElement === app) {
                //Do nothing, just return
                return
            }

            targetElement = targetElement.parentNode
        } while (targetElement)

        this.closeApp('cancel')
        this.clearDate()
    }

    invalidDateMessage = () => {
        this.setState({
            dateMessage: 'Invalid date'
        })
        setTimeout(() => {
            this.setState({
                dateMessage: 'Select date'
            })
        }, 1500)
    }

    closeApp = (type) => {
        if (!this.state.isPriorDate && type === 'done') {
            this.setState({
                closeType: 'done'
            })
        } else {
            this.setState({
                closeType: 'cancel'
            })
        }
    }

    clearDate = () => {

        let date = new Date()

        this.setState({
            date: date,
            clearTopField: true //Quickly switches from true and back to false so that fields clear from componentDidUpdate() in AppTop.js
        })

        setTimeout(() => {
            this.setState({clearTopField: false})
        }, 0)
    }

    isPriorDate = () => {
        let isPriorDate
        let month = this.state.date.getMonth() + 1
        let day = this.state.date.getDate()
        let year = this.state.date.getFullYear()

        if (year < this.state.initialYear) {
            isPriorDate = true
        } else if (year === this.state.initialYear) {
            if (month < this.state.initialMonth) {
                isPriorDate = true
            } else if (month === this.state.initialMonth) {
                if (day < this.state.initialDay) {
                    isPriorDate = true
                } else {
                    isPriorDate = false
                }
            } else {
                isPriorDate = false
            }
        } else {
            isPriorDate = false
        }

        this.setState({isPriorDate: isPriorDate})
    }

    calcFirstDay = () => {
        let dayOfMonth = this.state.date.getDate()
        let dayOfWeek = this.state.date.getDay()
        let firstDay = 7 - (dayOfMonth - dayOfWeek + 6) % 7
        return firstDay
    }

    changeDate = (type, value) => {
        let date
        if (type === 'day') {
            date = new Date(this.state.date.setDate(value))
        }
        if (type === 'month') {
            date = new Date(this.state.date.setMonth(value - 1))
        }
        if (type === 'year') {
            date = new Date(this.state.date.setYear(value))
        }

        this.setState({
            date: date
        })
    }



    componentDidUpdate() {
        this.calcFirstDay()
        this.isPriorDate()
    }

    componentDidMount() {

        document.addEventListener('click', (e) => {
            this.checkForOutsideClicks(e)
        })

        let date = new Date()

        this.setState({
            date: date,
            initialMonth: date.getMonth() + 1,
            initialDay: date.getDate(),
            initialYear: date.getFullYear()
        })
    }

    render() {

        return (

        this.state.date === null ? null :

          <div className='demo-container'>

              <div className='date-picker' id='date-picker' style={{opacity: this.state.closeType === null ? 1 : 0, transition: 'opacity .3s ease .5s'}}>

                  <AppTop downMouse={this.downMouse} upMouse={this.upMouse} changeDate={this.changeDate} closeApp={this.closeApp} clearTopField={this.state.clearTopField} clearDate={this.clearDate} closeType={this.state.closeType} dateMessage={this.state.dateMessage} dayOfMonth={this.state.date.getDate()} month={this.state.date.getMonth() + 1} year={this.state.date.getFullYear()} activeIconTopLeft={this.state.activeIconTopLeft} activeIconTopRight={this.state.activeIconTopRight}/>

                  <AppMiddle downMouse={this.downMouse} upMouse={this.upMouse} changeDate={this.changeDate} dayOfWeek={this.state.date.getDay()} dayOfMonth={this.state.date.getDate()} month={this.state.date.getMonth() + 1} year={this.state.date.getFullYear()} firstDay={this.calcFirstDay()} initialMonth={this.state.initialMonth} initialDay={this.state.initialDay} initialYear={this.state.initialYear} activeIconMiddleLeft={this.state.activeIconMiddleLeft} activeIconMiddleRight={this.state.activeIconMiddleRight}/>

                  <AppBottom clearDate={this.clearDate} closeApp={this.closeApp} invalidDateMessage={this.invalidDateMessage} isPriorDate={this.state.isPriorDate}/>

              </div>

          </div>
        )
    }
}

export default App
