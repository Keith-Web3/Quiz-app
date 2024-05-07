import '@/sass/components/loader.scss'

interface LoaderProps {
  ringColor: string
  radii: number
  ringWidth: number
}

const Loader = function ({ ringColor, ringWidth, radii }: LoaderProps) {
  return (
    <div
      className="loader"
      style={{
        border: `${ringWidth}px solid ${ringColor}`,
        width: `${radii}px`,
      }}
    ></div>
  )
}

export default Loader
