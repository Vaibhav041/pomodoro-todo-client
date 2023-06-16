"use client"
import React from 'react'
import { useRouter } from 'next/router';

const Test = ({params}) => {
    const router = useRouter();

  return (
    <div>{router.query.id}</div>
  )
}

export default Test