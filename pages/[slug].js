import React from 'react'
import { useRouter } from 'next/router'
import Desktop from 'molecules/desktop'
import Window from 'molecules/window'

function Slug() {
  const router = useRouter()
  const { slug } = router.query
  return (
    <>
      <Desktop />
      <Window slug={slug} />
    </>
  )
}

export default Slug
