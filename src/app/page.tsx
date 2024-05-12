import dynamic from 'next/dynamic'

const DynamicsHeader = dynamic(() => import('../component/landingPage/LandingPage'), { ssr: false })

const Home = () => {
  return (
    <div>
      <DynamicsHeader />
    </div>
  )
}

export default Home
