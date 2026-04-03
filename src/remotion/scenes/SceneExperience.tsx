import { interpolate, useCurrentFrame } from 'remotion'
import { experiences } from '../../data/resume'
import { GlowLine } from '../components/GlowLine'
import { TimelineCard } from '../components/TimelineCard'

export const SceneExperience: React.FC = () => {
  const frame = useCurrentFrame()

  const headingOpacity = interpolate(frame, [30, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0D1117',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 80px',
      }}
    >
      {/* Grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(79,142,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div style={{ position: 'relative', width: '100%', maxWidth: 1000 }}>
        {/* Heading */}
        <div style={{ opacity: headingOpacity, marginBottom: 8 }}>
          <div
            style={{
              fontSize: 13,
              color: '#4F8EF7',
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            Experience
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#F0F6FC',
              fontFamily: '"Noto Sans TC", sans-serif',
            }}
          >
            工作經驗
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <GlowLine startFrame={34} color="#4F8EF7" durationInFrames={16} />
        </div>

        {/* Two-column cards */}
        <div style={{ display: 'flex', gap: 20 }}>
          <TimelineCard
            experience={experiences[0]}
            startFrame={36}
            direction="left"
          />
          <TimelineCard
            experience={experiences[1]}
            startFrame={42}
            direction="right"
          />
        </div>
      </div>
    </div>
  )
}
