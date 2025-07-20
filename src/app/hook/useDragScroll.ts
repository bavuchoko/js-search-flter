import { useEffect, RefObject } from 'react';

export default function useDragScroll(ref: RefObject<HTMLElement | null>) {
    useEffect(() => {
        if (!ref.current) return;

        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;
        let activeElement: HTMLElement | null = null;

        const onMouseDown = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) return;

            isDragging = true;
            startX = e.pageX;
            scrollLeft = ref.current.scrollLeft;
            activeElement = ref.current;

            document.body.style.cursor = 'grabbing';
            document.body.style.userSelect = 'none';
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging || !activeElement) return;

            const x = e.pageX;
            const walk = (x - startX) * 1.5;
            activeElement.scrollLeft = scrollLeft - walk;
        };

        const onMouseUp = () => {
            if (!isDragging) return;

            isDragging = false;
            activeElement = null;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        // ref 내부 mousedown만 감지, 나머지는 전역(document)
        const refEl = ref.current;
        refEl.addEventListener('mousedown', onMouseDown);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            refEl.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [ref]);
}
