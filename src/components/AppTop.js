import React from 'react'
import '../App.css'

class AppTop extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            month: '',
            day: '',
            year: '',
            activeIconTopLeft: false,
            activeIconTopRight: false
        }
    }

    focusedGenArea = (type) => {
        const border = document.getElementById('toggle-full-date')
        type === 'focus' ? border.style.border = '1px solid rgb(18,113,217)' : border.style.border = '1px solid rgb(228,228,228)'
    }

    upMouse = (type) => {
        this.setState({
            [type]: false
        })
    }

    downMouse = (type) => {
        this.setState({
            [type]: true
        })
    }

    clearField = () => {
        this.setState({
            month: '',
            day: '',
            year: ''
        })
    }

    setField = () => {
        this.setState({
            month: this.props.month.toString().padStart(2,'0'),
            day: this.props.dayOfMonth.toString().padStart(2,'0'),
            year: this.props.year.toString().slice(2,4)
        })
    }

    validateEntry = (name, value) => {

        if (name === 'month') {
            if (this.state.month.length <= 2) {
                if ((parseInt(value) < 0 || parseInt(value) > 12) || (value === '00')) { //While validating the month it will control typo's for you by resetting the field
                    this.setState({
                        month: ''
                    })
                } else if (this.state.month.length === 2) {
                    document.getElementById('day').focus()
                    this.props.changeDate('month', this.state.month)
                }
            }
        }

        if (name === 'day') {
            if (this.state.day.length <= 2) {
                if (parseInt(value) < 0 || parseInt(value) > 31 || (value === '00') || this.state.month.length < 2) { //While validating the day it will control typo's for you by resetting the field, but if you accidentally type 31 for a month with only 30 days, or 29 for February in a non leap year it will auto-correct for your convenience when you click "Done"
                    this.setState({
                        day: ''
                    })
                } else if (this.state.day.length === 2) {
                    document.getElementById('year').focus()
                    this.props.changeDate('day', this.state.day)
                }
            }
        }

        if (name === 'year') {
            if (this.state.year.length === 2) {
                if (parseInt(value) > 99 || parseInt(value) < 0  || this.state.day.length < 2) {
                    this.setState({
                        year: ''
                    })
                } else {
                    this.props.changeDate('year', `20${this.state.year}`) //I'd prefer to have all 4 digits here, but I'm following the design file in which case it's smoother to set first 2 digits as 20
                    document.getElementById('year').blur()
                }
            }
        }
    }

    handleChange = (e) => {

        let name = e.target.name
        let value = e.target.value

        if (!(isNaN(value)) && value.split('').reverse()[0] !== '.') {
            this.setState({
                [name]: value.replace(/\s+/g, '') //This regex simply removes whitespace
            })
        }

        setTimeout(() => { //Must break this into a setTimeout in order to get accurate state
            this.validateEntry(name, value)
        }, 0)
    }

    componentDidMount() {
        document.onkeydown = (e) => {
            e = e || window.event
            if (e.keyCode === 27) {
                this.clearField()
                this.props.clearDate()
                this.props.closeApp()
            }
            if (e.keyCode === 13) {
                this.props.closeApp('done')
            }
        }
    }

    componentDidUpdate() {
        if (this.props.clearTopField) {
            this.clearField()
            this.props.clearDate()
        }
        if (this.props.closeType === 'done') {
            this.setField()
        }
    }

    render() {

        let month = this.props.month.toString().padStart(2,'0')
        let day = this.props.dayOfMonth.toString().padStart(2,'0')
        let year = this.props.year.toString().slice(2,4)

        return(

            <div className='app-top'>

                <div className='top-left-container'>
                    {this.props.closeType === 'done' ? <p>{this.state.month}/{this.state.day}/{this.state.year}</p> : <p className={this.props.dateMessage === 'Select date' ? 'valid-date' : 'invalid-date'} >{this.props.dateMessage}</p>}
                </div>

                <div className='top-right-container'>
                    <div id='toggle-full-date' className='toggle-full-date'>
                        <input type='text' name='month' value={this.state.month} id='month' className='manual-enter enter-month' placeholder={month} onChange={this.handleChange} onBlur={() => this.focusedGenArea('blur')} onFocus={() => this.focusedGenArea('focus')}/>
                        <span className='date-slash' style={{color: this.state.month.length === 2 ? 'rgb(51,51,51)' : 'rgb(145,145,145)'}}>/</span>
                        <input type='text' name='day' value={this.state.day} id='day' className='manual-enter enter-day' placeholder={day} onChange={this.handleChange} onBlur={() => this.focusedGenArea('blur')} onFocus={() => this.focusedGenArea('focus')}/>
                        <span className='date-slash' style={{color: this.state.day.length === 2 ? 'rgb(51,51,51)' : 'rgb(145,145,145)'}}>/</span>
                        <input type='text' name='year' value={this.state.year} id='year' className='manual-enter enter-year' placeholder={year} onChange={this.handleChange} onBlur={() => this.focusedGenArea('blur')} onFocus={() => this.focusedGenArea('focus')}/>

                        <div className='toggle-day'>
                            <i className="icon ion-ios-arrow-back" style={{color: this.state.activeIconTopLeft ? 'rgb(255,0,0)' : null}} onMouseDown={() => this.downMouse('activeIconTopLeft')} onMouseUp={() => this.upMouse('activeIconTopLeft')} onClick={() => {this.props.changeDate('day', this.props.dayOfMonth - 1); this.clearField()}}></i>
                            <i className="icon ion-ios-arrow-forward" style={{color: this.state.activeIconTopRight ? 'rgb(255,0,0)' : null}} onMouseDown={() => this.downMouse('activeIconTopRight')} onMouseUp={() => this.upMouse('activeIconTopRight')} onClick={() => {this.props.changeDate('day', this.props.dayOfMonth + 1); this.clearField()}}></i>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default AppTop
