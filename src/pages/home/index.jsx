import React from 'react'
import { Button } from 'antd-mobile'
import './index.less'

function Home() {
  const Video = React.createRef()
  const getUserMedia = constrains => {
    if (navigator.mediaDevices?.getUserMedia) {
      //最新标准API
      return navigator.mediaDevices.getUserMedia(constrains)
    } else if (navigator.webkitGetUserMedia) {
      //webkit内核浏览器
      return navigator.webkitGetUserMedia(constrains)
    } else if (navigator.mozGetUserMedia) {
      //Firefox浏览器
      return navigator.mozGetUserMedia(constrains)
    } else if (navigator.getUserMedia) {
      //旧版API
      return navigator.getUserMedia(constrains)
    }
  }
  const getUserMediaStream = () => {
    function success(stream) {
      return new Promise((resolve, reject) => {
        const { current } = Video
        current.srcObject = stream

        current.onloadedmetadata = function() {
          current.play()
          resolve()
        }
      })
    }
    getUserMedia({
      audio: false,
      video: { facingMode: { exact: 'environment' } }
      // video: true,
      // video: { facingMode: { exact: 'environment', width: 1280, height: 720 } },
    })
      .then(res => {
        console.log(111111)
        console.log(res)
        return success(res)
      })
      .catch(error => {
        console.log('访问用户媒体设备失败：', error.name, error.message)
        return Promise.reject()
      })
  }
  return (
    <div className="catch-image">
      <video
        ref={Video}
        autoPlay
        muted
        playsInline
        style={{
          width: '100%'
        }}
      ></video>
      <div className="catch-image-mask">
        <div className="card-box"></div>
      </div>
      <Button className="btn" onClick={getUserMediaStream}>
        下一步
      </Button>
    </div>
  )
}

export default Home
