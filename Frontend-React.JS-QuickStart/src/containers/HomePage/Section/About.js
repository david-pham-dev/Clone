import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyen Thong Noi Gi Ve May Con Pho
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/Kbj2Zss-5GY"
              title="A$AP Rocky - Praise The Lord (Da Shine) (Official Video) ft. Skepta"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Get it Get it Chart climbin' on 'em I'm jumpin' out the window,
              how I got 'em open Line around the corner, line 'em up the block
              and over Sometimes I even stop the smotake what's mine, then take
              some more It rains, it pours, it rains, it pours I came, I saw, I
              came, I saw I praise the Lord, then break the law I take what's
              mine, then take some more It rains, it pours, it rains, it pours I
              came, I saw, I came, I saw I praise the Lord, then break the law I
              take what's mine, then take some more It rains, it pours, it
              rains, it pours Get it
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
