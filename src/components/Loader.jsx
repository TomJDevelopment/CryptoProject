const Loader = () => {
    return (
        <div className="flex justify-center items-center py-3"> {/* Loader isn't used, however, keeping it in for reference on how use animations */}
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
    )
}

export default Loader