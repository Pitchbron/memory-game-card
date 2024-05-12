import dynamic from 'next/dynamic'

const DynamicsHeader = dynamic(() => import('../component/landingPage/landingPage'), { ssr: false })

const Home = () => {
  return (
    <div>
      <DynamicsHeader />
    </div>
  )
}

export default Home
