import React from 'react'
import ReactGA from 'react-ga'

const Footer = ({ developer, email, website, disclaimer }) => {

  const trackEvent = (category, action, label) => {
    console.log('GA event:', category, ':', action, ':', label)
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    })
  }

  return (
    <footer>
      <address>
        <i>
          개발자: {developer}
          <br />
          이메일: {email}
          <br />
          <button
            className='btn website'
            onClick={trackEvent.bind(
              this,
              'Move to the main site',
              'Click footer address, Button'
            )}
          >
            <i>
              웹사이트: <a href={website}>{website}</a>
            </i>
          </button>
          <br />
          <b>Disclaimer: {disclaimer}</b>
        </i>
      </address>
    </footer>
  )
}

export default Footer
