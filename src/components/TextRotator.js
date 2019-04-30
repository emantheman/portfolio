import React, { Component } from 'react'

import { StyleSheet, css } from 'aphrodite/no-important'

class TextRotator extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      facetext: [],
      animation: 0,
      idx: 4
    }
  }

  componentWillMount() {
    // init keyframes
    this.spinKeyframes = this.initializeKeyframes()
    // init words
    this.setState({ facetext: this.props.words.slice(0, 4) })
  }

  componentWillUnmount() {
    // flag sentinel
    this._isMounted = false
  }

  /**
   * Uses props to initialize spin animation.
   */
  initializeKeyframes = () => {
    const { reverseRotation } = this.props
    const sign = reverseRotation ? -1 : 1
    const spin = {}
    let deg = 0
    for (let i = 0; i < 4; i++) {
      spin[i] = {}
      spin[i]['0%'] = { transform: `rotateX(${sign*deg}deg)` }
      deg += 90
      spin[i]['10%'] = { transform: `rotateX(${sign*deg}deg)` }
      spin[i]['100%'] = { transform: `rotateX(${sign*deg}deg)` }
    }
    return spin
  }

  componentDidMount() {
    // sentinel for halting asynchronous tasks
    this._isMounted = true
    // start rotating
    this.rotateText()
  }

  /**
   * Takes css value in the form '<Number><Units>' and returns ['<Number>', '<Units>'].
   * 
   * E.g., '100px' --> ['100', 'px']
   * @param {String} css - css value to be parsed.
   */
  parseCSSVal = css => {
    const cssVal = css.split('').filter(ch => isNaN(ch) === false).join(''), // filter: is a Number
          cssUnit = css.split('').filter(ch => isNaN(ch) === true).join('')  // filter: is Not a Number
    return [cssVal, cssUnit]
  }

  /**
   * Returns classes for inline styling!
   */
  styles = () => {
    const {
      fontSize,
      positionRight,
      positionBottom,
      positionLeft,
      positionTop,
      height,
      width,
      spinRate,
      prismBorder,
      prismBoxShadow,
      backgroundColor,
      fontColor
    } = this.props
    const {
      animation
    } = this.state

    // break val up into number and unit, e.g., [ '100', 'px' ]
    const [ heightValue, heightUnits ] = this.parseCSSVal(height)
    // halfs value and combines with units
    const halfHeight = heightValue / 2 + heightUnits

    // styles
    const styles = StyleSheet.create({
      Prism: {
        position: 'absolute',
        perspective: '800px',
        perspectiveOrigin: `50% ${halfHeight}`,
        right: positionRight,
        left: positionLeft,
        bottom: positionBottom,
        top: positionTop,
        fontSize
      },
      rectangle: {
        transformOrigin: `0 ${halfHeight}`,
        margin: '0 auto',
        position: 'relative',
        transformStyle: 'preserve-3d',
        width: width
      },
      spin: {
        animationName: [this.spinKeyframes[animation]],
        animationTimingFunction: 'ease',
        animationDuration: `${spinRate}s`,
        animationFillMode: 'forwards'
      },
      side: {
        position: 'absolute',
        border: `1px solid ${prismBorder}`,
        boxShadow: `inset 0 0 20px ${prismBoxShadow}`,
        lineHeight: '1.1em',
        paddingLeft: '7px',
        color: fontColor,
        backgroundColor,
        width,
        height
      },
      face1: {
        transform: `translateZ(${halfHeight})`
      },
      face2: {
        transform: `rotateX(-270deg) translateY(-${halfHeight})`,
        transformOrigin: 'top center'
      },
      face3: {
        transform: `translateZ(-${halfHeight}) rotateX(180deg)`
      },
      face4: {
        transform: `rotateX(-90deg) translateY(${halfHeight})`,
        transformOrigin: 'bottom center'
      }
    })
    return styles
  }

  /**
   * Rotates text and swaps a word
   */
  rotateText = () => {
    const { spinRate } = this.props
    // convert rate to ms
    const delay = spinRate * 1000
    // set delay
    setTimeout(() => {
      // rotate text
      this.setState(prevState => {
        const { facetext, animation, idx } = prevState
        const { words } = this.props
        const len = words.length
        // index of hidden face
        const h = (animation - 1) % len
        // copy facetext
        const newText = [...facetext]
        // set hidden 
        newText[h] = words[idx]
        return {
          facetext: newText, // 
          idx: (idx + 1) % len, // inc index
          animation: (animation + 1) % 4 // inc animation
        }
      })

      // if component is mounted, recurse
      if (this._isMounted) this.rotateText()
    }, delay)
  }

  render() {
    const { facetext } = this.state
    const { affixed } = this.props
    const styles = this.styles()
    const {
      Prism,
      rectangle,
      spin, 
      side
    } = styles

    // generate faces
    const Faces = facetext.map((ft, i) => {
      // if prop 'affixed' was passed, set face1 to affixed
      if (affixed && i === 0) ft = affixed
      return (
        <div
          key={i}
          className={css(side, styles[`face${i + 1}`])}>
            { ft }.
        </div>
      )
    })

    return (
      <div className={css(Prism)}>
        <div className={css(rectangle, spin)}>
          { Faces }
        </div>
      </div>
    )
  }
}

TextRotator.defaultProps = {
  affixed: '',
  reverseRotation: false,
  fontSize: '50px',
  fontColor: 'white',
  backgroundColor: 'salmon',
  positionRight: '-58px',
  positionTop: '6px',
  positionLeft: 'unset',
  positionBottom: 'unset',
  height: '64px',
  width: '370px',
  spinRate: 2.5,
  prismBorder: 'unset',
  prismBoxShadow: 'unset',
}

export default TextRotator