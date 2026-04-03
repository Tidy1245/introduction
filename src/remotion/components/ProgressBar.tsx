import { Easing, interpolate, useCurrentFrame } from 'remotion'
import type { Skill } from '../../data/resume'

type Props = {
  skill: Skill
  startFrame: number
  durationInFrames?: number
}

export const ProgressBar: React.FC<Props> = ({
  skill,
  startFrame,
  durationInFrames = 30,
}) => {
  const frame = useCurrentFrame()

  const width = interpolate(frame - startFrame, [0, durationInFrames], [0, skill.level], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  const opacity = interpolate(frame - startFrame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div style={{ width: '100%', opacity }}>
      {/* Track */}
      <div
        style={{
          width: '100%',
          height: 4,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Fill */}
        <div
          style={{
            width: `${width}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${skill.level > 80 ? '#00D9FF' : '#7C3AED'}, rgba(0,217,255,0.4))`,
            borderRadius: 2,
            boxShadow: `0 0 8px rgba(0,217,255,0.6)`,
            transition: 'none',
          }}
        />
        {/* Glow dot at leading edge */}
        {width > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: `${width}%`,
              transform: 'translate(-50%, -50%)',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#00D9FF',
              boxShadow: '0 0 12px #00D9FF',
            }}
          />
        )}
      </div>
      {/* Percentage label */}
      <div
        style={{
          marginTop: 4,
          fontSize: 11,
          color: '#8B949E',
          fontFamily: '"JetBrains Mono", monospace',
        }}
      >
        {Math.round(width)}%
      </div>
    </div>
  )
}
