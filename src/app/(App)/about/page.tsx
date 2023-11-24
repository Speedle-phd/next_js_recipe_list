import React, { ReactElement } from 'react'
import Layout from '../../components/Layouts/RootLayout'

const About = () => {
   return <div>About</div>
}

About.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>
}

export default About
