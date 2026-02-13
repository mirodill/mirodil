import React from 'react'
import LastPosts from '@/features/posts/components/LastPosts'
import InfoPosts from '@/features/posts/components/InfoPosts'

const Hero = () => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl mb-2">Dashboard</h1>
                <p className="text-gray-600">Blog admin panelga xush kelibsiz</p>
            </div>
            <InfoPosts/>
            <LastPosts/>
        </div>
    )
}

export default Hero