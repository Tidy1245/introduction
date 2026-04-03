import { spring, useCurrentFrame, useVideoConfig } from 'remotion'

type Props = {
  startFrame: number
  color?: string
  height?: number
  durationInFrames?: number
}

export const GlowLine: React.FC<Props> = ({
  startFrame,
  color = '#00D9FF',
  height = 1,
  durationInFrames = 40,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const progress = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: { stiffness: 40, damping: 15 },
    durationInFrames,
  })

  return (
    <div
      style={{
        width: `${progress * 100}%`,
        height,
        background: color,
        borderRadius: height,
        boxShadow: `0 0 8px ${color}, 0 0 20px ${color}40`,
        transition: 'none',
      }}
    />
  )
}
