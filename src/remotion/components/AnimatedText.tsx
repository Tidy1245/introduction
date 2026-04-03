import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'

type Props = {
  text: string
  startFrame: number
  staggerFrames?: number
  style?: React.CSSProperties
  charStyle?: React.CSSProperties
}

export const AnimatedText: React.FC<Props> = ({
  text,
  startFrame,
  staggerFrames = 2,
  style,
  charStyle,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <span style={{ display: 'inline-block', ...style }}>
      {text.split('').map((char, i) => {
        const charFrame = frame - startFrame - i * staggerFrames
        const opacity = interpolate(charFrame, [0, fps * 0.3], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        const y = interpolate(charFrame, [0, fps * 0.3], [12, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity,
              transform: `translateY(${y}px)`,
              whiteSpace: char === ' ' ? 'pre' : 'normal',
              ...charStyle,
            }}
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}
