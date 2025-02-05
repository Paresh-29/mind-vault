import type React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiWithoutAuth } from "../utils/axios"
import { Loader } from "./ui/Loader"
import { Card } from "./ui/Card"

interface ContentItem {
    _id: string
    type: string
    title: string
    link: string
    tags?: string[]
    createdAt: string
}

interface SharedContent {
    content: ContentItem[]
    username: string
}

export const SharedBrainView: React.FC = () => {
    const [sharedContent, setSharedContent] = useState<SharedContent | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const { shareLink } = useParams<{ shareLink: string }>()

    useEffect(() => {
        const fetchSharedContent = async () => {
            if (!shareLink) {
                setError("No shared link provided")
                setIsLoading(false)
                return
            }

            setIsLoading(true)
            setError(null)

            try {
                console.log("Fetching shared content for:", shareLink)

                const response = await apiWithoutAuth.get(`/brain/${shareLink}`)
                console.log("API Response:", response.data)

                const contentArray = Array.isArray(response.data.contents) ? response.data.contents : [response.data.contents]

                setSharedContent({
                    content: contentArray,
                    username: response.data.link?.username || "Unknown",
                })
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || error.message || "Failed to fetch shared brain"
                setError(errorMessage)
                console.error("API Error:", errorMessage)
            } finally {
                setIsLoading(false)
            }
        }

        fetchSharedContent()
    }, [shareLink])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader className="w-8 h-8 text-indigo-600" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
            </div>
        )
    }

    if (!sharedContent || sharedContent.content.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-600">No shared content found</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">{sharedContent.username}'s Shared Brain</h1>
            <p className="mb-4">Total items: {sharedContent.content.length}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {sharedContent.content.map((item) => (
                    <Card
                        key={item._id}
                        id={item._id}
                        type={item.type}
                        title={item.title}
                        link={item.link}
                        tags={item.tags}
                        createdAt={item.createdAt}
                    />
                ))}
            </div>
        </div>
    )
}
