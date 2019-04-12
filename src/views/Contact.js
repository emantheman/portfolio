import React, { Component } from 'react'
import MaskedInput from 'react-text-mask'

import '../styles/Contact.scss'

export default class Contact extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      telNo: '',
      message: '',
    }
  }
  
  /**
   * Changes state
   * @param {Event} e - deconstructed event object in the form { name, value } = event.target
   */
  handleChange = ({ target: { name, value }}) => {
    this.setState({
      [name]: value
    })
  }

  // PHOLDER FOR ON FORM SUBMIT

  render() {
    return (
      <div className="Contact">
        <h1 className="header">Contact</h1>
        <p>Feel free to reach out with questions, thoughts, music recommendations..!</p>
        <form>
          {/* Name */}
          <label id="name" for="firstName">Name<span>*</span>:
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
              placeholder="First"/>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
              placeholder="Last"/>
          </label>
          {/* Tel */}
          <label for="telNo">Phone:
            <Masked
              value={this.state.value}
              onChange={this.handleChange}
              type="tel"
              mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              placeholder="(333) 333-4444"/>
          </label>
          {/* Email */}
          <label for="email">Email<span>*</span>:
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="elonmusk@unemployed.com"/>
          </label>
          {/* Content of Message */}
          <label for="message">Message<span>*</span>:
            <textarea
              id="message"
              name="message"
              value={this.state.message}
              onChange={this.handleChange}
              placeholder="What's on your mind?"/>
          </label>
          {/* Submit Button */}
          <label class="send" for="send">
            <input type="submit" id="send" name="send" value="Send"/>
          </label>
        </form>
      </div>
    )
  }
}


class Masked extends React.Component {
  onChange = event => this.props.onChange(event)
  render() {
    return (
      <MaskedInput
        type={this.props.type}
        mask={this.props.mask}
        value={this.props.value}
        onChange={this.onChange}
        placeholder={this.props.placeholder}
      />
    )
  }
}