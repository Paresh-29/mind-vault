import type React from "react"
import { useState } from "react"
import { apiWithAuth } from "../utils/axios"

interface ShareBrainModalProps {
    isOpen: boolean
    onClose: () => void
    itemCount?: number
}

export const ShareBrainModal: React.FC<ShareBrainModalProps> = ({ isOpen, onClose, itemCount = 0 }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [shareUrl, setShareUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isSharing, setIsSharing] = useState(false)

    const handleShare = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const token = localStorage.getItem("token")
            const response = await apiWithAuth.post(
                "/brain/share",
                { share: true },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            setShareUrl(response.data.link)
            setIsSharing(true)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
            setError(errorMessage || "Failed to create share link")
        } finally {
            setIsLoading(false)
        }
    }

    const handleCopyLink = () => {
        if (shareUrl) {
            navigator.clipboard.writeText(shareUrl)
            alert("Link copied to clipboard")
        }
    }

    const handleToggleShare = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const token = localStorage.getItem("token")
            const response = await apiWithAuth.post(
                "/brain/share",
                { share: !isSharing },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )

            if (response.data.message === "Share link has been disabled.") {
                setShareUrl(null)
                setIsSharing(false)
            } else if (response.data.link) {
                setShareUrl(response.data.link)
                setIsSharing(true)
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
            setError(errorMessage || `Failed to ${isSharing ? "disable" : "enable"} sharing`)
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-6 space-y-4">
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-900">Share Your Second Brain</h2>
                    <p className="text-gray-600">
                        Share your entire collection of notes, documents, tweets, and videos with others. They'll be able to import
                        your content into their own Second Brain.
                    </p>
                </div>

                {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}

                {shareUrl && (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <input type="text" value={shareUrl} readOnly className="flex-1 text-sm bg-transparent" />
                        <button
                            onClick={handleCopyLink}
                            className="shrink-0 text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
                        >
                            Copy
                        </button>
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${isSharing ? "bg-red-600 hover:bg-red-700 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            }`}
                        onClick={isSharing ? handleToggleShare : handleShare}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        ) : (
                            <>
                                {!isSharing && (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                        />
                                    </svg>
                                )}
                                {isSharing ? "Disable Sharing" : "Share Brain"}
                            </>
                        )}
                    </button>
                    <p className="text-sm text-center text-gray-500">{itemCount} items will be shared</p>
                </div>
            </div>
        </div>
    )
}

