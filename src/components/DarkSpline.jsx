import { lazy, Suspense } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function DarkSpline({ className }) {
  return (
    <div className={`spline-container ${className || ''} fade-in`}>
      <Suspense fallback={null}>
        <Spline scene="https://prod.spline.design/bQnyX-XuXJ9VHdIo/scene.splinecode?v=2" />
      </Suspense>
    </div>
  );
}
