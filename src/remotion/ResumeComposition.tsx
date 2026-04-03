import { TransitionSeries } from '@remotion/transitions'
import { linearTiming, springTiming } from '@remotion/transitions'
import { fade } from '@remotion/transitions/fade'
import { slide } from '@remotion/transitions/slide'
import { wipe } from '@remotion/transitions/wipe'
import { SceneAbout } from './scenes/SceneAbout'
import { SceneEducation } from './scenes/SceneEducation'
import { SceneExperience } from './scenes/SceneExperience'
import { SceneHero } from './scenes/SceneHero'
import { SceneProjects } from './scenes/SceneProjects'
import { SceneSkills } from './scenes/SceneSkills'

const TRANSITION_FRAMES = 30

export const ResumeComposition: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Scene 1: Hero — 120 frames */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <SceneHero />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 2: About — 90 frames */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <SceneAbout />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 3: Education — 90 frames */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <SceneEducation />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={wipe({ direction: 'from-bottom' })}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 4: Experience — 90 frames */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <SceneExperience />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 5: Skills — 90 frames */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <SceneSkills />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 6: Projects — 120 frames */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <SceneProjects />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  )
}
