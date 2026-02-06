'use client'

import React from 'react'

import { FAQ } from './components/sections/FAQ'
import { Features } from './components/sections/Features'
import { FinalCTA } from './components/sections/FinalCTA'
import { Hero } from './components/sections/Hero'
import { HowItWorks } from './components/sections/ShipFast'
import { License } from './components/sections/License'
import { Pricing } from './components/sections/Pricing'
import { ProblemSolution } from './components/sections/ProblemSolution'
import { Proof } from './components/sections/Expansions'

const MarketingApp: React.FC = () => {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Proof />
      <HowItWorks />
      <Features />
      <License />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  )
}

export default MarketingApp
