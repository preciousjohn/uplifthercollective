import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserAnswers, PathwayScore, Resource, CourseResult, VideoResult, PathwayId } from '../types';
import { calculatePathwayScores } from '../lib/matching';
import { fetchResourcesByPathways } from '../lib/queries';
import { fetchCourses } from '../lib/coursera';
import { fetchVideos } from '../lib/youtube';
import { pathwayMap } from '../data/pathways';
import TransitionScreen from '../components/dashboard/TransitionScreen';
import DashboardNav from '../components/dashboard/DashboardNav';
import PathwayCards from '../components/dashboard/PathwayCards';
import MatchedPrograms from '../components/dashboard/MatchedPrograms';
import CourseRow from '../components/dashboard/CourseRow';
import VideoGrid from '../components/dashboard/VideoGrid';
import BottomCTA from '../components/dashboard/BottomCTA';

function AnimatedSection({ children, delay, visible }: { children: React.ReactNode; delay: number; visible: boolean }) {
  return (
    <div style={{ opacity: 0, animation: visible ? `dashFadeInUp 0.55s ease ${delay}ms forwards` : 'none' }}>
      {children}
    </div>
  );
}

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { answers: UserAnswers; firstName?: string } | null;
  const answers = state?.answers;
  const firstName = state?.firstName ?? localStorage.getItem('uhc_first_name') ?? '';

  const alreadySeen = sessionStorage.getItem('uhc_transition_shown') === '1';
  const [showTransition, setShowTransition] = useState(!alreadySeen);
  const [visible, setVisible] = useState(alreadySeen);
  const [rankedPathways, setRankedPathways] = useState<PathwayScore[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [courses, setCourses] = useState<CourseResult[]>([]);
  const [videos, setVideos] = useState<VideoResult[]>([]);

  useEffect(() => {
    if (!answers) { navigate('/discover'); return; }

    const scores = calculatePathwayScores(answers);
    setRankedPathways(scores);

    const top3 = scores.slice(0, 3).map((s) => s.id) as PathwayId[];
    const top1 = scores[0]?.id as PathwayId | undefined;

    Promise.all([
      fetchResourcesByPathways(top3).catch(() => [] as Resource[]),
      top1 ? fetchCourses(top1).catch(() => [] as CourseResult[]) : Promise.resolve([] as CourseResult[]),
      top1 ? fetchVideos(top1).catch(() => [] as VideoResult[]) : Promise.resolve([] as VideoResult[]),
    ]).then(([res, c, v]) => {
      setResources(res);
      setCourses(c);
      setVideos(v);
    });
  }, [answers, navigate]);

  const handleTransitionDone = useCallback(() => {
    sessionStorage.setItem('uhc_transition_shown', '1');
    setShowTransition(false);
    setTimeout(() => setVisible(true), 60);
  }, []);

  if (!answers) return null;

  const top1Color = rankedPathways[0] ? (pathwayMap[rankedPathways[0].id]?.color ?? '#6C5CE7') : '#6C5CE7';
  const top3Ids = rankedPathways.slice(0, 3).map((s) => s.id) as PathwayId[];

  return (
    <>
      <style>{`
        @keyframes dashFadeInUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {showTransition && <TransitionScreen topPathwayColor={top1Color} onDone={handleTransitionDone} />}

      <div style={{ background: '#FAFAFA', minHeight: '100vh' }}>
        <DashboardNav firstName={firstName} accentColor={top1Color} />

        <div
          style={{
            padding: '52px 5vw 0',
            maxWidth: '900px',
            margin: '0 auto',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}
        >
          <AnimatedSection delay={0} visible={visible}>
            <PathwayCards rankedPathways={rankedPathways} firstName={firstName} />
          </AnimatedSection>

          <AnimatedSection delay={200} visible={visible}>
            <MatchedPrograms resources={resources} topPathways={top3Ids.length ? top3Ids : ['tech']} />
          </AnimatedSection>

          <AnimatedSection delay={400} visible={visible}>
            <CourseRow courses={courses} />
          </AnimatedSection>

          <AnimatedSection delay={600} visible={visible}>
            <VideoGrid videos={videos} />
          </AnimatedSection>

          <AnimatedSection delay={800} visible={visible}>
            <BottomCTA onRetake={() => navigate('/discover')} topPathways={top3Ids.length ? top3Ids : ['tech']} />
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}
