import React from "react";


export const Error404 = () => {
  let alert = {
    visible: true,
    back: 'danger',
    text: 'Page not found'
  }


  return (
    <div className={`alert alert-${alert.back} ${alert.visible ? '' : 'd-none'}`} role="alert">
      {alert.text}
    </div>
  )
}