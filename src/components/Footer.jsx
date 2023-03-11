import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col w-full justify-center items-center h-full text-center'>
        <h1>Music by <a className="underline" href="https://geoffreyburch.com/" target="_blank">Geoffrey Burch</a></h1>
        <h1 className='text-2xl'>Designed and developed by&nbsp;
            <a className="underline" href='https://lemonsqueasy.dev/' target='_blank'>LemonHayds</a>
            <br/>       
        🍋
        </h1>
        <p className='text-sm'>Version 0.0.1</p>
    </div>
  )
}

export default Footer
